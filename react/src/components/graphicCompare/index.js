import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';
import * as Zoom from 'chartjs-plugin-zoom';

function GraphicCompare(props) {
    const refCanvas = useRef(null);


    useEffect(() => {
        if (props.model) {
            refCanvas.current = new Chart(refCanvas.current.getContext('2d'), {
                type: 'line',
                data: {
                    datasets: [
                        {
                            label: props.labels[0],
                            borderColor: 'red',
                            backgroundColor: 'red',
                            fill: false,
                            yAxisID: props.model.scales[0].id,
                            data: [],
                        },
                        {
                            label: props.labels[1],
                            borderColor: 'blue',
                            backgroundColor: 'blue',
                            fill: false,
                            yAxisID: props.model.scales[0].id,
                            data: [],
                        },
                    ],
                },
                options: {
                    title: {
                        display: true,
                        text: '',
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
                        yAxes: props.model.scales.map((scale) => {
                            return {
                                display: true,
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
                                    drawOnChartArea: true,
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
    }, [props.model]);

    useEffect(() => {
        if (
            refCanvas.current.chart &&
            props.title &&
            props.unit &&
            props.data
        ) {
            refCanvas.current.chart.data.datasets[0].yAxisID = props.unit;
            refCanvas.current.chart.options.title.text = props.title;
            refCanvas.current.chart.options.scales.yAxes.forEach((scale) => {
                if (scale.id === props.unit) {
                    scale.display = true;
                } else {
                    scale.display = false;
                }
            });
            refCanvas.current.chart.data.datasets[0].label =
                props.data[0].label;
            refCanvas.current.chart.data.datasets[0].data = props.data[0].data.map(
                (value, index) => {
                    return {
                        x: parseInt(props.data[0].timeStamp[index], 10),
                        y: value,
                    };
                },
            );
            if (props.data[1].data) {
                refCanvas.current.chart.data.datasets[1].yAxisID = props.unit;
                refCanvas.current.chart.data.datasets[1].label =
                    props.data[1].label;
                refCanvas.current.chart.data.datasets[1].data = props.data[1].data.map(
                    (value, index) => {
                        return {
                            x: parseInt(props.data[1].timeStamp[index], 10),
                            y: value,
                        };
                    },
                );
            }
            refCanvas.current.chart.update(0);
        }
    }, [props.data]);

    useEffect(() => {
        if (refCanvas.current.chart && props.zoom) {
            refCanvas.current.chart.resetZoom();
            refCanvas.current.chart.update(0);
        }
    }, [props.zoom]);

    return <canvas style={{"backgroundColor":"white"}} ref={refCanvas} />;
}

export default GraphicCompare;
