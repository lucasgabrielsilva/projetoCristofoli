import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
import * as Zoom from 'chartjs-plugin-zoom';
import ModelData from '../../configs';
import { Container } from './styles';

function Graphic(props) {
    const refCanvas = useRef(null);
    const [model, setModel] = useState(false);

    useEffect(async () => {
        setModel(ModelData[`${await window.api.get('model')}`]);
    }, []);

    useEffect(() => {
        if (model) {
            refCanvas.current = new Chart(refCanvas.current.getContext('2d'), {
                type: 'line',
                data: {
                    datasets: model.parameters.map((parameter) => {
                        return {
                            label: parameter.name,
                            showLine: true,
                            borderColor: parameter.color,
                            backgroundColor: parameter.color,
                            hidden: false,
                            fill: false,
                            data: [],
                            yAxisID: parameter.idScales,
                        };
                    }),
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 0,
                    },
                    elements: {
                        line: {
                            tension: 0,
                            borderWidth: 0.5,
                        },
                        point: {
                            radius: 0,
                        },
                    },
                    tooltips: {
                        enabled: true,
                        mode: 'nearest',
                        intersect: false,
                        position: 'average',
                    },
                    title: {
                        display: false,
                    },
                    legend: {
                        display: true,
                        labels: {
                            fontColor: 'black',
                        },
                        onClick: handleClickLegend,
                    },
                    plugins: {
                        zoom: {
                            zoom: {
                                enabled: false,
                                mode: 'xy',
                                threshold: 0,
                                drag: false,
                            },
                            pan: {
                                enabled: false,
                                mode: 'xy',
                                threshold: 0,
                            },
                        },
                    },
                    scales: {
                        xAxes: [
                            {
                                type: 'time',
                                display: true,
                                time: {
                                    unit: 'second',
                                    displayFormats: {
                                        second: 'HH:mm:ss',
                                    },
                                    tooltipFormat: 'HH:mm:ss.SSS',
                                },
                                distribution: 'series',
                                gridLines: {
                                    display: true,
                                    color: '#D3D3D3',
                                },
                                ticks: {
                                    display: true,
                                    fontColor: 'black',
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Tempo Decorrido',
                                    fontSize: 18,
                                    fontColor: 'black',
                                },
                            },
                        ],
                        yAxes: model.scales.map((scale) => {
                            return {
                                display: true,
                                scaleLabel: {
                                    display: true,
                                    labelString: scale.name,
                                    fontColor: 'black',
                                    fontSize: 14,
                                },
                                position: scale.position,
                                gridLines: {
                                    display: true,
                                    color: '#d3d3d3',
                                    drawOnChartArea: props.lines === scale.id,
                                },
                                ticks: {
                                    display: true,
                                    maxTicksLimit: 20,
                                    min: scale.min,
                                    suggestedMax: scale.max,
                                    fontColor: 'black',
                                },
                                id: scale.id,
                            };
                        }),
                    },
                },
            });
        }
    }, [model]);

    useEffect(() => {
        if (props.data && model) {
            refCanvas.current.chart.data.datasets.forEach((dataset) => {
                dataset.data.push({
                    x: props.data.timeStamp,
                    y: props.data[dataset.label],
                });
            });
            if (
                refCanvas.current.chart.options.scales.xAxes[0].ticks.hasOwnProperty(
                    'max',
                )
            ) {
                delete refCanvas.current.chart.options.scales.xAxes[0].ticks
                    .max;
            }
            if (props.mode === 'realTime') {
                refCanvas.current.chart.update(0);
            }
        }
    }, [props.data]);

    useEffect(() => {
        if (props.clean && model) {
            refCanvas.current.chart.reset();
            refCanvas.current.chart.data.datasets.forEach((dataset) => {
                if (dataset.label === 'Resistência(ºC)') {
                    dataset.data = [];
                } else if (dataset.label === 'Vaso de Pressão(ºC)') {
                    dataset.data = [];
                } else if (dataset.label === 'Pressão(Kgf/cm²)') {
                    dataset.data = [];
                } else {
                    dataset.data = [];
                }
            });
            refCanvas.current.chart.update(0);
        }
    }, [props.clean]);

    useEffect(() => {
        if (model) {
            refCanvas.current.chart.options.scales.yAxes.forEach((scale) => {
                if (scale.id === props.lines) {
                    scale.gridLines.drawOnChartArea = true;
                } else {
                    scale.gridLines.drawOnChartArea = false;
                }
            });
            refCanvas.current.chart.update(0);
        }
    }, [props.lines]);

    useEffect(() => {
        if (model) {
            if (props.mode === 'analyze') {
                refCanvas.current.chart.options.plugins.zoom.zoom.enabled = true;
                refCanvas.current.chart.options.plugins.zoom.pan.enabled = true;
            } else {
                refCanvas.current.chart.resetZoom();
                refCanvas.current.chart.options.scales.xAxes[0].ticks.max = Date.now();
                refCanvas.current.chart.options.plugins.zoom.zoom.enabled = false;
                refCanvas.current.chart.options.plugins.zoom.pan.enabled = false;
            }
            refCanvas.current.chart.update(0);
        }
    }, [props.mode]);

    const handleClickLegend = (...data) => {
        const id = refCanvas.current.getDatasetMeta(data[1].datasetIndex)
            .yAxisID;
        refCanvas.current.chart.data.datasets[
            data[1].datasetIndex
        ].hidden = !refCanvas.current.chart.data.datasets[data[1].datasetIndex]
            .hidden;
        if (
            refCanvas.current.chart.data.datasets[data[1].datasetIndex].hidden
        ) {
            const aux = Object.keys(refCanvas.current.chart.data.datasets).map(
                (dataset) => {
                    if (
                        refCanvas.current.chart.data.datasets[dataset]
                            .yAxisID === id &&
                        refCanvas.current.chart.data.datasets[dataset].hidden
                    ) {
                        return true;
                    }
                    if (
                        refCanvas.current.chart.data.datasets[dataset]
                            .yAxisID === id &&
                        !refCanvas.current.chart.data.datasets[dataset].hidden
                    ) {
                        return false;
                    }
                },
            );
            if (
                aux.every((element) => {
                    return element !== false;
                })
            ) {
                refCanvas.current.chart.options.scales.yAxes.forEach(
                    (scale) => {
                        if (scale.id === id) {
                            scale.display = false;
                        }
                    },
                );
            }
        } else {
            refCanvas.current.chart.options.scales.yAxes.forEach((scale) => {
                if (scale.id === id) {
                    scale.display = true;
                }
            });
        }
        refCanvas.current.chart.update(0);
    };

    return <canvas style={{ backgroundColor: 'white' }} ref={refCanvas} />;
}

export default Graphic;
