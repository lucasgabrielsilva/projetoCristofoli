import React, { useEffect, useState } from 'react';
import { BsClockHistory } from 'react-icons/bs';
import MenuBar from '../../components/menuBar';
import ModelData from '../../configs';

import {
    Container,
    ButtonBar,
    Title,
    Button,
    Header,
    Select,
    TextArea,
    DivTest,
    Main,
    DivResult,
    DivGraph,
} from './styles';
import GraphicAnalyze from '../../components/graphicAnalyze';

function Analyze() {
    const [value, setValue] = useState(false);
    const [clean, setClean] = useState(false);
    const [textArea, setTextArea] = useState('Aguardando dados...');
    const [lines, setLines] = useState('temperature');
    const [zoom, setZoom] = useState(false);
    const [model, setModel] = useState(false);
    const [load, setLoad] = useState(false);

    const handleCalc = (data) => {
        let max = parseFloat(data[0]);
        let avg = 0;
        data.forEach((element) => {
            if (parseFloat(element) > max) {
                max = parseFloat(element);
            }
            avg += parseFloat(element);
        });
        return {
            max,
            avg: (avg / data.length).toFixed(2),
        };
    };

    const handleLoad = (data) => {
        setLoad(true);
        setTextArea(
            Object.keys(data).map((parameter) => {
                if (parameter !== 'timeStamp') {
                    if (parameter.split(' ').length > 1) {
                        return `\n${parameter}: ${data[parameter][0]}`;
                    }
                    const aux = handleCalc(data[parameter]);
                    return `\n${parameter} -> Máximo: ${aux.max} Média: ${aux.avg}`;
                }
                return '\n';
            }),
        );
        data.modelo = ModelData[data.modelo[0]];
        setValue(data);
        window.api.stop('dataCSV');
    };

    const handleButtonLoad = (event) => {
        event.preventDefault();
        window.api.send('loadCSV', true);
        window.api.receive('dataCSV', handleLoad);
    };

    const handleChangeLines = (event) => {
        event.preventDefault();
        setLines(event.target.value);
    };

    const handleResetZoom = (event) => {
        event.preventDefault();
        setZoom(true);
        setTimeout(() => {
            setZoom(false);
        }, 10);
    };

    const handleRenderGraph = (event) => {
        return (
            <GraphicAnalyze
                data={value}
                lines={lines}
                zoom={zoom}
                model={model}
            />
        );
    };

    return (
        <Container>
            <MenuBar changeWindow={false} />
            <DivTest>
                <Header>
                    <Title> Analisar</Title>
                    <ButtonBar>
                        <Button
                            title="Carregar conjunto de dados"
                            onClick={(e) => handleButtonLoad(e)}
                        >
                            {' '}
                            Carregar dados{' '}
                        </Button>
                        {model ? (
                            <Select
                                title="Selecionar linhas do gráfico"
                                value={lines}
                                onChange={(e) => handleChangeLines(e)}
                            >
                                {model.scales.map((scale) => {
                                    return (
                                        <option
                                            title={scale.title}
                                            value={scale.id}
                                        >
                                            {scale.name}
                                        </option>
                                    );
                                })}
                            </Select>
                        ) : null}
                        <Button
                            title="Voltar o nivel do zoom ao valor inicial"
                            onClick={(e) => handleResetZoom(e)}
                        >
                            {' '}
                            Reset Zoom{' '}
                        </Button>
                    </ButtonBar>
                </Header>
                <Main>
                    <DivGraph>
                        {load ? (
                            handleRenderGraph()
                        ) : (
                            <BsClockHistory
                                size={48}
                                style={{
                                    color: '#214f62',
                                    backgroundColor: 'inherit',
                                }}
                            />
                        )}
                    </DivGraph>
                    <DivResult>
                        <TextArea disabled value={textArea} />
                    </DivResult>
                </Main>
            </DivTest>
        </Container>
    );
}

export default Analyze;
