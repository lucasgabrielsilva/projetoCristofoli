import React, { useRef, useEffect } from 'react';
import { LinearGauge } from 'canvas-gauges';
import { Container, DivCanvas, DivTitle, DivInfo } from './styles';

const canvasConfigBase = {
    minorTicks: 5,
    tickSide: 'left',
    numberSide: 'left',
    fontNumbersSize: 30,
    borderShadowWidth: 0,
    ticksWidth: 25,
    ticksWidthMinor: 15,
    colorPlate: '#fafafa',
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

    useEffect(() => {
        if (refCanvas.current) {
            refCanvas.current.value = props.value;
        }
    }, [props.value]);

    return (
        <Container>
            <DivTitle>
                <label style={{ fontSize: '16px', fontWeight: 'bold' }}>
                    {props.title}
                </label>
            </DivTitle>
            <DivCanvas>
                <canvas ref={refCanvas} />
            </DivCanvas>
            <DivInfo>
                <label
                    style={{ fontSize: '18px', fontWeight: 'bold' }}
                >{`${props.value}${props.unit}`}</label>
            </DivInfo>
        </Container>
    );
}
