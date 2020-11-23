import React, { useEffect, useState } from 'react';
import MenuBar from '../../components/menuBar';
import GraphicCompare from '../../components/graphicCompare';
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

function Teste1() {
    const [data1, setData1] = useState({
        resistence: [],
        vase: [],
        pressure: [],
        tension: [],
        label: 'dados 1',
    });

    const [data2, setData2] = useState({
        resistence: [],
        vase: [],
        pressure: [],
        tension: [],
        label: 'dados 2',
    });

    const [show, setShow] = useState(false);
    const [type, setType] = useState('Resistência(ºC)');
    const [clean, setClean] = useState(false);
    const [zoom, setZoom] = useState(false);
    const [unit, setUnit] = useState('temperature');
    const [model, setModel] = useState(false);
    const [textArea1, setTextArea1] = useState('Aguardando dados...');
    const [textArea2, setTextArea2] = useState('Aguardando dados...');

    const handleLoad1 = (data) => {
        const temp = {
            resistence: [],
            vase: [],
            pressure: [],
            tension: [],
            label: data.label,
        };
        for (let i = 0; i < data.date.length; i += 1) {
            temp.resistence.push({
                x: parseInt(data.date[i], 10),
                y: data.resistence[i],
            });
            temp.vase.push({
                x: parseInt(data.date[i], 10),
                y: data.vase[i],
            });
            temp.pressure.push({
                x: parseInt(data.date[i], 10),
                y: data.pressure[i],
            });
            temp.tension.push({
                x: parseInt(data.date[i], 10),
                y: data.tension[i],
            });
        }
        data.resistence = temp.resistence;
        data.vase = temp.vase;
        data.pressure = temp.pressure;
        data.tension = temp.tension;
        setData1(data);
        window.api.stop('dataCSV');
    };

    const handleLoad2 = (data) => {
        const temp = {
            resistence: [],
            vase: [],
            pressure: [],
            tension: [],
            label: data.label,
        };
        for (let i = 0; i < data.date.length; i += 1) {
            temp.resistence.push({
                x: parseInt(data.date[i], 10),
                y: data.resistence[i],
            });
            temp.vase.push({
                x: parseInt(data.date[i], 10),
                y: data.vase[i],
            });
            temp.pressure.push({
                x: parseInt(data.date[i], 10),
                y: data.pressure[i],
            });
            temp.tension.push({
                x: parseInt(data.date[i], 10),
                y: data.tension[i],
            });
        }
        data.resistence = temp.resistence;
        data.vase = temp.vase;
        data.pressure = temp.pressure;
        data.tension = temp.tension;
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
            setUnit('temperature');
            setShow([data1.resistence, data2.resistence]);
        } else if (type === 'Vaso de Pressão(ºC)') {
            setUnit('temperature');
            setShow([data1.vase, data2.vase]);
        } else if (type === 'Pressão(Kgf/cm²)') {
            setUnit('pressure');
            setShow([data1.pressure, data2.pressure]);
        } else {
            setUnit('tension');
            setShow([data1.tension, data2.tension]);
        }
        if (data1.avgRe) {
            setTextArea1(
                `${data1.label}\nResistência -> máxima: ${data1.maxRe}ºC média: ${data1.avgRe}ºC\n`
                    .concat(
                        `Vaso -> máxima: ${data1.maxVa}ºC média: ${data1.avgVa}ºC\n`,
                    )
                    .concat(
                        `Pressão -> máxima: ${data1.maxPe}Kgf/cm² média: ${data1.avgPe}Kgf/cm²\n`,
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
                        `Pressão -> máxima: ${data2.maxPe}Kgf/cm² média: ${data2.avgPe}Kgf/cm²\n`,
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
        setData1({
            resistence: [],
            vase: [],
            pressure: [],
            tension: [],
            label: 'dados 1',
        });
        setData2({
            resistence: [],
            vase: [],
            pressure: [],
            tension: [],
            label: 'dados 2',
        });
        setTextArea1('Aguardando dados...');
        setTextArea2('Aguardando dados...');
    };

    const handleChangeType = (event) => {
        event.preventDefault();
        setType(event.target.value);
    };

    const handleResetZoom = (event) => {
        event.preventDefault();
        setZoom(true);
        setInterval(() => {
            setZoom(false);
        }, 10);
    };

    useEffect(async () => {
        setModel(ModelData[`${await window.api.get('model')}`]);
    }, []);

    return (
        <Container>
            <MenuBar changeWindow={false} />
            <DivTest>
                <Header>
                    <Title> Comparar</Title>
                    <ButtonBar>
                        <Button
                            onClick={(e) => handleStart1(e)}
                            title="Carregar primeiro conjunto de dados"
                        >
                            {' '}
                            Carregar dados1{' '}
                        </Button>
                        <Button
                            onClick={(e) => handleStart2(e)}
                            title="Carregar segundo conjunto de dados"
                        >
                            {' '}
                            Carregar dados2{' '}
                        </Button>
                        <Select
                            value={type}
                            onChange={(e) => handleChangeType(e)}
                            title="Selecionar parâmetro para visualização"
                        >
                            {model
                                ? model.parameters.map((parameter) => {
                                      return (
                                          <option
                                              title={parameter.title}
                                              value={parameter.name}
                                          >
                                              {parameter.name}
                                          </option>
                                      );
                                  })
                                : null}
                        </Select>
                        <Button
                            onClick={(e) => handleClean(e)}
                            title="Limpar gráfico"
                        >
                            {' '}
                            Limpar{' '}
                        </Button>
                        <Button
                            onClick={(e) => handleResetZoom(e)}
                            title="Voltar o nivel do zoom ao valor inicial"
                        >
                            {' '}
                            Reset Zoom{' '}
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
                            zoom={zoom}
                            unit={unit}
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
