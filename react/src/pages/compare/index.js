import React, { useEffect, useState } from 'react';
import MenuBar from '../../components/menuBar';
import GraphicCompare from '../../components/graphicCompare';

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

function Teste1() {
    const [data1, setData1] = useState({
        resistence: [0],
        vase: [0],
        pressure: [0],
        tension: [0],
        label: 'dados 1',
    });

    const [data2, setData2] = useState({
        resistence: [0],
        vase: [0],
        pressure: [0],
        tension: [0],
        label: 'dados 2',
    });

    const [show, setShow] = useState([data1.resistence, data2.resistence]);
    const [type, setType] = useState('Resistência(ºC)');
    const [clean, setClean] = useState(false);
    const [textArea1, setTextArea1] = useState('Aguardando dados...');
    const [textArea2, setTextArea2] = useState('Aguardando dados...');

    const handleLoad1 = (data) => {
        setData1(data);
        window.api.stop('dataCSV');
    };

    const handleLoad2 = (data) => {
        setData2(data);
        window.api.stop('dataCSV');
    };

    const handleStart1 = (event) => {
        event.preventDefault();
        window.api.send('loadCSV', true);
        window.api.receive('dataCSV', handleLoad1);
    };

    const handleStart2 = (event) => {
        event.preventDefault();
        window.api.send('loadCSV', true);
        window.api.receive('dataCSV', handleLoad2);
    };

    useEffect(() => {
        if (type === 'Resistência(ºC)') {
            setShow([data1.resistence, data2.resistence]);
        } else if (type === 'Vaso(ºC)') {
            setShow([data1.vase, data2.vase]);
        } else if (type === 'Pressão') {
            setShow([data1.pressure, data2.pressure]);
        } else {
            setShow([data1.tension, data2.tension]);
        }
        if (data1.avgRe) {
            setTextArea1(
                `${data1.label}\nResistência -> máxima: ${data1.maxRe}ºC média: ${data1.avgRe}ºC\n`
                    .concat(
                        `Vaso -> máxima: ${data1.maxVa}ºC média: ${data1.avgVa}ºC\n`,
                    )
                    .concat(
                        `Pressão -> máxima: ${data1.maxPe}bar média: ${data1.avgPe}bar\n`,
                    )
                    .concat(
                        `Tensão -> máxima: ${data1.maxTe}V média: ${data1.avgTe}V\n`,
                    )
                    .concat(`Tempo de Pressurização: ${data1.tempPre}\n`)
                    .concat(`Tempo de Esterilização: ${data1.tempEst}\n`)
                    .concat(`Tempo de Despressurização: ${data1.tempDes}\n`)
                    .concat(`Tempo de Secagem: ${data1.tempSec}\n`)
                    .concat(`Tempo de Resfriamento: ${data1.tempRes}\n`)
                    .concat(`Total: ${data1.tempTot}`),
            );
        }
        if (data2.avgRe) {
            setTextArea2(
                `${data2.label}\nResistência -> máxima: ${data2.maxRe}ºC média: ${data2.avgRe}ºC\n`
                    .concat(
                        `Vaso -> máxima: ${data2.maxVa}ºC média: ${data2.avgVa}ºC\n`,
                    )
                    .concat(
                        `Pressão -> máxima: ${data2.maxPe}bar média: ${data2.avgPe}bar\n`,
                    )
                    .concat(
                        `Tensão -> máxima: ${data2.maxTe}V média: ${data2.avgTe}V\n`,
                    )
                    .concat(`Tempo de Pressurização: ${data2.tempPre}\n`)
                    .concat(`Tempo de Esterilização: ${data2.tempEst}\n`)
                    .concat(`Tempo de Despressurização: ${data2.tempDes}\n`)
                    .concat(`Tempo de Secagem: ${data2.tempSec}\n`)
                    .concat(`Tempo de Resfriamento: ${data2.tempRes}\n`)
                    .concat(`Total: ${data2.tempTot}`),
            );
        }
    }, [type, data1, data2]);

    const handleClean = (event) => {
        event.preventDefault();
        setClean(true);
        setTimeout(() => {
            setClean(false);
        }, 100);
        setTextArea1('Aguardando dados...');
        setTextArea2('Aguardando dados...');
    };

    const handleChangeType = (event) => {
        event.preventDefault();
        setType(event.target.value);
    };

    return (
        <Container>
            <MenuBar changeWindow={false} />
            <DivTest>
                <Header>
                    <Title> Comparar</Title>
                    <ButtonBar>
                        <Button onClick={(e) => handleStart1(e)}>
                            {' '}
                            Carregar dados1{' '}
                        </Button>
                        <Button onClick={(e) => handleStart2(e)}>
                            {' '}
                            Carregar dados2{' '}
                        </Button>
                        <Select
                            value={type}
                            onChange={(e) => handleChangeType(e)}
                        >
                            <option value="Resistência(ºC)">
                                {' '}
                                resistência{' '}
                            </option>
                            <option value="Vaso(ºC)"> vaso </option>
                            <option value="Pressão(Libras)"> pressão </option>
                            <option value="Tensão(V)"> tensão </option>
                        </Select>
                        <Button onClick={(e) => handleClean(e)}>
                            {' '}
                            Limpar{' '}
                        </Button>
                    </ButtonBar>
                </Header>
                <Main>
                    <DivGraph>
                        <GraphicCompare
                            value={show}
                            title={type}
                            labels={[data1.label, data2.label]}
                            clean={clean}
                        />
                    </DivGraph>
                    <DivResult>
                        <TextArea disabled value={textArea1} />
                        <TextArea disabled value={textArea2} />
                    </DivResult>
                </Main>
            </DivTest>
        </Container>
    );
}

export default Teste1;
