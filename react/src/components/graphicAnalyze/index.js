import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
import * as Zoom from 'chartjs-plugin-zoom';

function GraphicAnalyze(props) {
    const refCanvas = useRef(null);

    const handleSetData = () => {
        if (refCanvas.current.data.datasets.length > 0 && props.data) {
            refCanvas.current.chart.data.datasets.forEach((dataset) => {
                dataset.data = props.data[dataset.label].map((value, index) => {
                    return {
                        x: parseInt(props.data.timeStamp[index], 10),
                        y: value,
                    };
                });
            });
            refCanvas.current.chart.update(0);
        }
    };

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

    useEffect(() => {
        refCanvas.current = new Chart(refCanvas.current.getContext('2d'), {
            type: 'line',
            data: {
                datasets: [],
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
                            enabled: true,
                            mode: 'xy',
                            threshold: 0,
                            drag: false,
                        },
                        pan: {
                            enabled: true,
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
                    yAxes: [],
                },
            },
        });
    }, []);

    useEffect(async () => {
        if (refCanvas.current.chart && typeof props.data.modelo === 'object') {
            refCanvas.current.chart.options.scales.yAxes = props.data.modelo.scales.map(
                (scale) => {
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
                },
            );
            refCanvas.current.chart.data.datasets = props.data.modelo.parameters.map(
                (parameter) => {
                    return {
                        label: parameter.name,
                        showLine: true,
                        borderColor: parameter.color,
                        backgroundColor: parameter.color,
                        fill: false,
                        data: [],
                        yAxisID: parameter.idScales,
                    };
                },
            );
            refCanvas.current.chart.update(0);
            handleSetData();
        }
    }, [props.data]);

    useEffect(() => {
        if (refCanvas.current.chart.options.scales.yAxes.length > 0) {
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
        if (refCanvas.current.chart) {
            refCanvas.current.chart.resetZoom();
            refCanvas.current.chart.update(0);
        }
    }, [props.zoom]);

    return <canvas ref={refCanvas} />;
}

export default GraphicAnalyze;
