import React, { useRef, useEffect } from 'react'
import { LinearGauge } from 'canvas-gauges'
import {Container, DivCanvas, DivTitle, DivInfo} from './styles';

let canvasConfigBase = {
  
  minorTicks: 5,
  tickSide: "left",
  numberSide: "left",
  fontNumbersSize: 30,
  borderShadowWidth: 0,
  ticksWidth: 25,
  ticksWidthMinor: 15,
  colorPlate: "#fafafa",
  borders: false,
  strokeStick: false,
  needleType: "arrow",
  needleWidth: 7,
  colorNeedle: "#214f62",
  colorNeedleEnd: false,
  needleSide: "left",
  animationDuration: 10,
  animationRule: "linear",
  barBeginCircle: false,
  barWidth: 0
};

export default function Card(props){

  let refCanvas = useRef(null);

  useEffect(() => {
    if(refCanvas.current){
      if(!refCanvas.current.options){
      canvasConfigBase.renderTo = refCanvas.current;
      canvasConfigBase.minValue = props.minValue;
      canvasConfigBase.maxValue = props.maxValue;
      canvasConfigBase.majorTicks = props.majorTicks;
      canvasConfigBase.highlights = props.highlights;
      canvasConfigBase.value = props.value;
      refCanvas.current = new LinearGauge(canvasConfigBase).draw();
      }
    }
  }, []);

  useEffect(() => {
    if(refCanvas.current){
      const temp = new LinearGauge(canvasConfigBase);
      refCanvas.current.options.width = temp.options.width;
      refCanvas.current.options.height = temp.options.height;
      refCanvas.current.update(refCanvas);
    }
  },[props.resize]);

  useEffect(() => {
    if(refCanvas.current){
      refCanvas.current.value = props.value;
      refCanvas.current.update(refCanvas);
    }
  },[props.value]);

  useEffect(() => {
    return () => refCanvas.current.destroy();
  },[])

  
  return (
    <Container>
      <DivTitle>
        <label tyle={{"fontSize": "18px", "fontWeight": "bold"}}>{props.title}</label>
      </DivTitle>
      <DivCanvas>
        <canvas ref={refCanvas}></canvas>
      </DivCanvas>
      <DivInfo>
        <label style={{"fontSize": "20px", "fontWeight": "bold"}}>{`${props.value}${props.unit}`}</label>
      </DivInfo>
    </Container>
  );
}