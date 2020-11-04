import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';

import { Container, Canvas } from './styles';

function GraphicCompare(props) {
    const refCanvas = useRef(null);

    useEffect(() => {
        refCanvas.current = new Chart(refCanvas.current.getContext('2d'), {
            type: 'line',
            data: {
                labels: [0],
                datasets: [
                    {
                        label: props.labels[0],
                        borderColor: 'red',
                        fill: false,
                        data: [0],
                    },
                    {
                        label: props.labels[1],
                        borderColor: 'blue',
                        fill: false,
                        data: [0],
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
                animation: {
                    duration: 0,
                },
                elements: {
                    line: {
                        tension: 0,
                    },
                    point: {
                        radius: 0,
                    },
                },
                responsiveAnimationDuration: 0,
                responsive: true,
                scales: {
                    yAxes: [
                        {
                            gridLines: {
                                display: true,
                                color: 'gray',
                            },
                        },
                    ],
                    xAxes: [
                        {
                            gridLines: {
                                display: true,
                                color: 'gray',
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Nº de Leituras',
                                fontSize: 18,
                                color: 'black',
                            },
                        },
                    ],
                },
            },
        });
    }, []);

    useEffect(() => {
        if (props.value) {
            refCanvas.current.chart.reset();
            refCanvas.current.chart.data.labels = [0];
            if (props.value[0].length > props.value[1].length) {
                for (let i = 1; i < props.value[0].length; i += 1) {
                    refCanvas.current.chart.data.labels.push(i);
                }
            } else {
                for (let i = 1; i < props.value[1].length; i += 1) {
                    refCanvas.current.chart.data.labels.push(i);
                }
            }
            refCanvas.current.chart.data.datasets[0].data = props.value[0];
            refCanvas.current.chart.data.datasets[1].data = props.value[1];
            refCanvas.current.chart.data.datasets[0].label = props.labels[0];
            refCanvas.current.chart.data.datasets[1].label = props.labels[1];
        }
        refCanvas.current.chart.update(0);
    }, [props.value]);

    useEffect(() => {
        refCanvas.current.chart.options.title.text = props.title;
        refCanvas.current.chart.update(0);
    }, [props.title]);

    useEffect(() => {
        if (props.clean) {
            refCanvas.current.chart.reset();
            refCanvas.current.chart.data.labels = [0];
            refCanvas.current.chart.data.datasets[0].data = [0];
            refCanvas.current.chart.data.datasets[1].data = [0];
            refCanvas.current.chart.data.datasets[0].label = 'dados 1';
            refCanvas.current.chart.data.datasets[1].label = 'dados 2';
            refCanvas.current.chart.update(0);
        }
    }, [props.clean]);

    return (
        <Container>
            <canvas height="100%" ref={refCanvas} />
        </Container>
    );
}

export default GraphicCompare;
