import React, { useRef, useEffect } from 'react';
import { LinearGauge } from 'canvas-gauges';
import { Container, DivCanvas, DivTitle, DivInfo } from './styles';

//valores base do mostrador
const canvasConfigBase = {
    minorTicks: 5,
    tickSide: 'left',
    numberSide: 'left',
    fontNumbersSize: 30,
    borderShadowWidth: 0,
    ticksWidth: 25,
    ticksWidthMinor: 15,
    colorPlate: 'white',
    borders: false,
    strokeStick: false,
    needleType: 'arrow',
    needleWidth: 7,
    colorNeedle: '#434343',
    colorNeedleEnd: false,
    needleSide: 'left',
    animation: false,
    animationRule: 'linear',
    barBeginCircle: false,
    barWidth: 0,
};

export default function Card(props) {
    const refCanvas = useRef(null);

//função responsavel por iniciar os valores corretos para o mostrador, e cria-lo
    useEffect(() => {
        if (refCanvas.current) {
            if (!refCanvas.current.options) {
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

// função resposavel pela renderização do mostrador em conjunto com o "resize" da tela
    useEffect(() => {
        if(refCanvas.current){
          const temp = new LinearGauge(canvasConfigBase);
          refCanvas.current.options.width = temp.options.width;
          refCanvas.current.options.height = temp.options.height;
          refCanvas.current.update(refCanvas);
        }
      },[props.resize]);

// função responsavel pela atualização dos valores do mostrador
    useEffect(() => {
        if (refCanvas.current) {
            refCanvas.current.value = props.value;
        }
    }, [props.value]);

    return (
        <Container>
            <DivTitle>
                <label style={{ fontSize: '14px', backgroundColor: 'white', fontWeight: 'bold' }}>
                    {props.title}
                </label>
            </DivTitle>
            <DivCanvas>
                <canvas ref={refCanvas} />
            </DivCanvas>
            <DivInfo>
                <label
                    style={{ fontSize: '16px', backgroundColor: 'white', fontWeight: 'bold' }}
                >{`${props.value}${props.unit}`}</label>
            </DivInfo>
        </Container>
    );
}
