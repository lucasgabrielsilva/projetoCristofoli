import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';
import * as Zoom from 'chartjs-plugin-zoom';
import { Container, Canvas } from './styles';

function Graphic(props) {
    const refCanvas = useRef(null);

    useEffect(() => {
        refCanvas.current = new Chart(refCanvas.current.getContext('2d'), {
            type: 'line',
            data: {
                labels: [0],
                datasets: props.datasets,
            },
            options: {
                title: {
                    display: false,
                    text: props.title,
                    fontSize: 2,
                    fontColor: 'gray',
                },
                plugins: {
                    zoom: {
                        zoom: {
                            enabled: true,
                            mode: 'y',
                            drag: {
                                borderColor: 'rgba(225,225,225,0.3)',
                                borderWidth: 5,
                                backgroundColor: 'rgb(225,225,225)',
                                animationDuration: 0,
                            },
                            rangeMin: {
                                x: 0,
                                y: 0,
                            },
                            rangeMax: {
                                x: 0,
                                y: 50,
                            },
                        },
                        pan: {
                            enabled: true,
                            mode: 'y',
                            rangeMin: {
                                x: 0,
                                y: 0,
                            },
                            rangeMax: {
                                x: 0,
                                y: 50,
                            },
                        },
                    },
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
                maintainAspectRatio: false,
                responsive: true,
                legend: {
                    display: false,
                },
                tooltips: {
                    enabled: false,
                },
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                max: 40,
                                min: 0,
                            },
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
                        },
                    ],
                },
            },
        });
    }, []);

    useEffect(() => {
        refCanvas.current.chart.data.labels.push(
            refCanvas.current.chart.data.labels.length + 1,
        );
        refCanvas.current.chart.data.datasets.forEach((dataset) => {
            if (dataset.label === 'Resistência(ºC)') {
                dataset.data.push(props.data.resistence);
            } else if (dataset.label === 'Vaso(ºC)') {
                dataset.data.push(props.data.vase);
            } else if (dataset.label === 'Pressão(bar)') {
                dataset.data.push(props.data.pressure);
            } else {
                dataset.data.push(props.data.tension);
            }
        });
        if (refCanvas.current.chart.data.labels.length % 20 === 0) {
            const size =
                parseInt(
                    refCanvas.current.canvas.style.width.split('px')[0],
                    10,
                ) + 100;
            refCanvas.current.canvas.style.width = `${size}px`;
            refCanvas.current.canvas.width += 20;
            refCanvas.current.chart.width += 20;
            document.getElementById('container').scrollLeft += 100;
        }
        refCanvas.current.chart.update(0);
    }, [props.data]);

    useEffect(() => {
        refCanvas.current.chart.reset();
        refCanvas.current.chart.data.labels = [0];
        refCanvas.current.chart.data.datasets.forEach((dataset) => {
            dataset.data = [0];
        });
        refCanvas.current.chart.update(0);
    }, [props.clean]);

    const handleOnClick = (event) => {
        console.log(refCanvas.current.chart.options.scales.yAxes[0].ticks);
        refCanvas.current.chart.options.scales.yAxes[0].ticks.min += 5;
        refCanvas.current.chart.options.scales.yAxes[0].ticks.max -= 5;
        refCanvas.current.chart.update(0);
    };

    return (
        <>
            <button onClick={(e) => handleOnClick(e)}> teste </button>
            <Container id="container">
                <Canvas ref={refCanvas} />
            </Container>
        </>
    );
}

export default Graphic;
