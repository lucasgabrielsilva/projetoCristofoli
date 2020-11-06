import React, { useRef, useState, useEffect } from 'react';
import Chart from "chart.js";
import Moment from "moment";
import { Container, DivGraph, Canvas} from './styles';
import { LinearGauge } from 'canvas-gauges';
import * as Zoom from "chartjs-plugin-zoom";


function Graphic(props) {

    const refCanvas = useRef(null);
    
	
    useEffect(() => {
        if(refCanvas.current){
            refCanvas.current = new Chart(refCanvas.current.getContext("2d"), {
                type: 'line',
                data: {
                    datasets: [{
                        label: "um",
                        borderColor: 'red',
                        fill: false,
                        showLine: true,
                        yAxisID: 'r',
                        data: [{
                                x: Moment().add(1000,'ms').toDate(),
                                y: 1
                            },
                        ]
                    },
                    {
                        label: "dois",
                        borderColor: 'blue',
                        fill: false,
                        showLine: true,
                        yAxisID: 'b',
                        data: [{
                                x:Moment().add(2000,'ms').toDate(),
                                y: 2
                            },
                        ]
                    },
                    {
                        label: "dois",
                        borderColor: 'green',
                        fill: false,
                        showLine: true,
                        yAxisID: 'g',
                        data: [{
                                x:Moment().add(3000,'ms').toDate(),
                                y: 3
                            },
                        ]
                    },
                ],
                },
                options:{
                    responsive: true,
                    title: {
                        display: true,
                        text: 'Chart.js Time'
                    },
                    plugins: {
                        zoom: {
                            zoom: {
                                enabled: true,
                                mode: 'xy',

                            }
                        }
                    },
                    scales: {
                        xAxes: [{
                            type: 'time',
                            display: true,
                            time: {
                                unit: 'millisecond',
                                displayFormats: {
                                    millisecond: "H:mm:ss"
                                },
                                stepSize: 1000,
                            },
                            ticks: {
                                maxRotation: 100,
                                source: 'auto',
                            },
						    scaleLabel: {
							    display: true,
                                labelString: 'Date',
                            },
                        }],
                        yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'value'
                            },
                            position: 'left',
                            gridLines: {
                                display: true,
                                color: 'black'
                            },
                            id:'r',
                        },
                        {
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'value2'
                            },
                            position: 'left',
                            gridLines: {
                                display: true,
                                color: 'blue'
                            },
                            id:'b',
                        },
                        {
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'value3'
                            },
                            position: 'right',
                            id: 'g',
                        },
                    ],
                    }
                }
            })
        }

        setInterval(() => {
            refCanvas.current.chart.data.datasets.forEach((dataset) => {
                dataset.data.push({
                    x: Moment().toDate(),
                    y: 3
                });
            });
            let a = Date.now();
            let b = new Date(a);
            console.log(refCanvas.current.chart);
        },500)


    }, []);

    const handleClick = (event) => {
        event.preventDefault();
            refCanvas.current.chart.update(0);
    }
    const handleClick2 = (event) => {
        event.preventDefault();
            refCanvas.current.chart.resetZoom();
            refCanvas.current.chart.update({
                easing: "linear"
            })
    }

  return (
      <>
    <button onClick={(e) => handleClick(e)}>teste</button>
    <button onClick={(e) => handleClick2(e)}>teste2</button>
<Container>
          <DivGraph >
              <canvas  ref={refCanvas}/>
          </DivGraph>
	  </Container>
      </>

  );
}

export default Graphic;