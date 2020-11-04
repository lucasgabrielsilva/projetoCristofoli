import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';

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
        if (refCanvas.current.chart.data.labels.length % 100 === 0) {
            const size =
                parseInt(
                    refCanvas.current.canvas.style.width.split('px')[0],
                    10,
                ) + 100;
            refCanvas.current.canvas.style.width = `${size}px`;
            refCanvas.current.canvas.width += 100;
            refCanvas.current.chart.width += 100;
            document.getElementById('container').scrollLeft += 100;
            refCanvas.current.chart.update();
        }
    }, [props.data]);

    useEffect(() => {
        refCanvas.current.chart.reset();
        refCanvas.current.chart.data.labels = [0];
        refCanvas.current.chart.data.datasets.forEach((dataset) => {
            dataset.data = [0];
        });
        refCanvas.current.chart.update(0);
    }, [props.clean]);

    return (
        <Container id="container">
            <Canvas ref={refCanvas} />
        </Container>
    );
}

export default Graphic;
