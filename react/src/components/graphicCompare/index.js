import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
import * as Zoom from 'chartjs-plugin-zoom';
import ModelData from '../../configs';
import { Container, Canvas } from './styles';

function GraphicCompare(props) {
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
                    datasets: [
                        {
                            label: props.labels[0],
                            borderColor: 'red',
                            backgroundColor: 'red',
                            fill: false,
                            yAxisID: model.scales[0].id,
                            data: [],
                        },
                        {
                            label: props.labels[1],
                            borderColor: 'blue',
                            backgroundColor: 'blue',
                            fill: false,
                            yAxisID: model.scales[0].id,
                            data: [],
                        },
                    ],
                },
                options: {
                    title: {
                        display: true,
                        text: props.title,
                        fontSize: 30,
                        fontColor: '#214f62',
                    },
                    tooltips: {
                        enabled: true,
                        mode: 'nearest',
                        intersect: false,
                        position: 'average',
                    },
                    plugins: {
                        zoom: {
                            zoom: {
                                enabled: true,
                                mode: 'xy',
                                drag: false,
                                threshold: 0,
                            },
                            pan: {
                                enabled: true,
                                mode: 'xy',
                                threshold: 0,
                            },
                        },
                    },
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
                    responsiveAnimationDuration: 0,
                    maintainAspectRatio: false,
                    responsive: true,
                    scales: {
                        xAxes: [
                            {
                                type: 'time',
                                display: true,
                                time: {
                                    unit: 'second',
                                    displayFormats: {
                                        second: 'HH:mm:ss.SSS',
                                    },
                                    tooltipFormat: 'HH:mm:ss.SSS',
                                },
                                distribution: 'series',
                                gridLines: {
                                    display: true,
                                    color: '#d3d3d3',
                                },
                                ticks: {
                                    display: true,
                                    fontColor: 'black',
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Tempo Decorrido',
                                    fontColor: 'black',
                                    fontSize: 18,
                                },
                            },
                        ],
                        yAxes: model.scales.map((scale) => {
                            return {
                                display: props.unit === scale.id,
                                scaleLabel: {
                                    display: true,
                                    labelString: scale.name,
                                    fontColor: 'black',
                                    fontSize: 18,
                                },
                                position: scale.position,
                                gridLines: {
                                    display: true,
                                    color: '#d3d3d3',
                                    drawOnChartArea: props.unit === scale.id,
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
        if (props.value && model) {
            refCanvas.current.chart.reset();
            refCanvas.current.chart.data.datasets[0].data = props.value[0];
            refCanvas.current.chart.data.datasets[1].data = props.value[1];
            refCanvas.current.chart.data.datasets[0].label = props.labels[0];
            refCanvas.current.chart.data.datasets[1].label = props.labels[1];
            refCanvas.current.chart.update(0);
        }
    }, [props.value]);

    useEffect(() => {
        if (model) {
            let id;
            refCanvas.current.chart.options.title.text = props.title;
            if (
                props.title === 'Resistência(ºC)' ||
                props.title === 'Vaso de Pressão(ºC)'
            ) {
                id = 'temperature';
            } else if (props.title === 'Pressão(Kgf/cm²)') {
                id = 'pressure';
            } else {
                id = 'tension';
            }
            refCanvas.current.chart.data.datasets.forEach((dataset) => {
                dataset.yAxisID = id;
            });
            refCanvas.current.chart.options.scales.yAxes.forEach((scale) => {
                if (scale.id === id) {
                    scale.gridLines.drawOnChartArea = true;
                    scale.display = true;
                } else {
                    scale.gridLines.drawOnChartArea = false;
                    scale.display = false;
                }
            });
            refCanvas.current.chart.update(0);
        }
    }, [props.title]);

    useEffect(() => {
        if (props.clean && model) {
            refCanvas.current.chart.reset();
            refCanvas.current.chart.data.datasets[0].data = [];
            refCanvas.current.chart.data.datasets[1].data = [];
            refCanvas.current.chart.data.datasets[0].label = 'dados 1';
            refCanvas.current.chart.data.datasets[1].label = 'dados 2';
            refCanvas.current.chart.update(0);
        }
    }, [props.clean]);

    useEffect(() => {
        if (model) {
            refCanvas.current.chart.resetZoom();
            refCanvas.current.chart.update(0);
        }
    }, [props.zoom]);

    return <canvas ref={refCanvas} />;
}

export default GraphicCompare;
