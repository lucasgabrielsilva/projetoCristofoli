import React, { useRef, useState, useEffect } from 'react';
import Chart from "chart.js";
import Moment from "moment";
import { Container, DivGraph, Canvas} from './styles';
import * as Zoom from "chartjs-plugin-zoom";
import { Redirect } from 'react-router-dom';

let updating = true;

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
                        backgroundColor: 'red',
                        fill: false,
                        hidden: false,
                        showLine: true,
                        yAxisID: 'temp',
                        data: [{
                                x: Date.now(),
                                y: 1
                            },
                        ]
                    },
                    {
                        label: "dois",
                        borderColor: 'orange',
                        backgroundColor: 'orange',
                        fill: false,
                        hidden: false,
                        showLine: true,
                        yAxisID: 'temp',
                        data: [{
                                x: Date.now(),
                                y: 2
                            },
                        ]
                    },
                    {
                        label: "tres",
                        borderColor: 'blue',
                        backgroundColor: 'blue',
                        fill: false,
                        hidden: false,
                        showLine: true,
                        yAxisID: 'pres',
                        data: [{
                                x: Date.now(),
                                y: 3
                            },
                        ]
                    },
                    {
                        label: "quatro",
                        borderColor: 'green',
                        backgroundColor: 'green',
                        fill: false,
                        hidden: false,
                        showLine: true,
                        yAxisID: 'ten',
                        data: [{
                                x: Date.now(),
                                y: 4
                            },
                        ]
                    },
                ],
                },
                options:{
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: {
                        duration: 0,
                    },
                    elements: {
                        line: {
                            tension: 0
                        },
                        point: {
                            radius: 0
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
                            fontColor: 'black'
                        },
                        onClick: handleClick,
                    },
                    plugins: {
                        zoom: {
                            zoom: {
                                enabled: true,
                                mode: 'xy',
                                threshold: 10,
                                drag: false,
                                onZoomComplete: handleZoomComplete,
                            },
                            pan:{
                                enabled: true,
                                mode: 'xy',
                                threshold: 0,
                            }
                        },
                    },
                    scales: {
                        xAxes: [{
                            type: 'time',
                            display: true,
                            time: {
                                unit: "millisecond",
                                displayFormats: {
                                    millisecond: "D/M/y-HH:mm:ss",
                                },
                                tooltipFormat: "D/M/y-HH:mm:ss.SSS",
                            },
                            distribution: 'series',
                            gridLines: {
                                display: true,
                                color: 'black'
                            },
                            ticks: {
                                display: true,
                                fontColor: 'black',
                                maxTicksLimit: 30,
                                min: Date.now(),
                            },
						    scaleLabel: {
                                display: true,
                            },
                        }],
                        yAxes: [{
                            display: true,
                            type: 'linear',
                            scaleLabel: {
                                display: true,
                                labelString: 'temperatura',
                                fontColor: 'black'
                            },
                            position: 'right',
                            gridLines: {
                                display: true,
                                color: 'black',
                                drawOnChartArea: props.lines.temp,
                                
                            },
                            ticks: {
                                display: true,
                                maxTicksLimit: 20,
                                min: 0,
                                suggestedMax: 300,
                                fontColor: "black"
                            },
                            id:'temp',
                        },
                        {
                            display: true,
                            type: 'linear',
                            scaleLabel: {
                                display: true,
                                labelString: 'pressao',
                                fontColor: 'black'
                            },
                            position: 'left',
                            gridLines: {
                                display: true,
                                color: 'black',
                                drawOnChartArea: props.lines.pres,
                            },
                            ticks: {
                                display: true,
                                maxTicksLimit: 20,
                                min: 0,
                                suggestedMax: 2.8,
                                fontColor: 'black'
                            },
                            id:'pres',
                        },
                        {
                            display: true,
                            type: 'linear',
                            scaleLabel: {
                                display: true,
                                labelString: 'tensao',
                                fontColor: 'black'
                            },
                            position: 'left',
                            gridLines: {
                                display: true,
                                color: 'black',
                                drawOnChartArea: props.lines.ten,
                            },
                            ticks: {
                                display: true,
                                maxTicksLimit: 20,
                               min: 80,
                                suggestedMax: 250,
                                fontColor: 'black'
                            },
                            id: 'ten',
                        },
                    ],
                    }
                }
            })
        }
    },[]);

    useEffect(() => {
        refCanvas.current.chart.options.scales.yAxes.forEach((scale) => {
            if(scale.id == 'temp'){
                scale.gridLines.drawOnChartArea = props.lines.temp;
            }
            else if(scale.id == 'pres'){
                scale.gridLines.drawOnChartArea = props.lines.pres;
            }
            else{
                scale.gridLines.drawOnChartArea = props.lines.ten;
            }
        })
        refCanvas.current.chart.update(0);
    },[props.test]);

    useEffect(() => {
        refCanvas.current.chart.data.datasets.forEach((dataset) => {
            dataset.data.push({x: Date.now(), y:90});
        });
        if(refCanvas.current.chart.options.scales.xAxes[0].ticks.hasOwnProperty('max')){
            delete refCanvas.current.chart.options.scales.xAxes[0].ticks.max;
        }
        if(props.mode === 'realTime'){
            refCanvas.current.chart.update(0);
        };
    },[props.data]);

    useEffect(() => {
        if(props.mode === 'analyze'){
            refCanvas.current.chart.options.plugins.zoom.zoom.enabled = true;
            refCanvas.current.chart.options.plugins.zoom.pan.enabled = true;
        }
        else{
            refCanvas.current.chart.resetZoom();
            refCanvas.current.chart.options.scales.xAxes[0].ticks.max = Date.now();
            refCanvas.current.chart.options.plugins.zoom.zoom.enabled = false;
            refCanvas.current.chart.options.plugins.zoom.pan.enabled = false;
        }
        refCanvas.current.chart.update(0);
    },[props.mode]);

    const handleClick = (...um) => {
        const id = refCanvas.current.getDatasetMeta(um[1].datasetIndex).yAxisID;
        refCanvas.current.chart.data.datasets[um[1].datasetIndex].hidden = !refCanvas.current.chart.data.datasets[um[1].datasetIndex].hidden;
        if(refCanvas.current.chart.data.datasets[um[1].datasetIndex].hidden){
            const aux = Object.keys(refCanvas.current.chart.data.datasets).map((dataset) => {
                if((refCanvas.current.chart.data.datasets[dataset].yAxisID === id) && (refCanvas.current.chart.data.datasets[dataset].hidden)){
                    return true;
                }
                else if((refCanvas.current.chart.data.datasets[dataset].yAxisID === id) && (!refCanvas.current.chart.data.datasets[dataset].hidden)){
                    return false;
                }
            });
            if(aux.every((element) => {return element != false;})){
                refCanvas.current.chart.options.scales.yAxes.forEach((scale) => {
                    if(scale.id === id){
                        scale.display = false;
                    }
                })
            }
        }
        else{
            refCanvas.current.chart.options.scales.yAxes.forEach((scale) => {
                if(scale.id === id){
                    scale.display = true;
                }
            })            
        }
    };

    const handleZoomComplete = (...event) => {
        updating = false;
        props.funZoom();
    };

    return (
        <canvas ref={refCanvas}/>
  );
}

export default Graphic;