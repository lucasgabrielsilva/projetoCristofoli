import React, { useEffect, useState } from 'react';
import { BsClockHistory } from 'react-icons/bs';
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
    const [data1, setData1] = useState(false);
    const [data2, setData2] = useState(false);
    const [show, setShow] = useState(false);
    const [type, setType] = useState(false);
    const [zoom, setZoom] = useState(false);
    const [unit, setUnit] = useState(false);
    const [model, setModel] = useState(false);
    const [textArea1, setTextArea1] = useState('Aguardando dados...');
    const [textArea2, setTextArea2] = useState('Aguardando dados...');

// função responsavel por receber os dados do csv 1
    const handleLoad1 = (data) => {
        setData1(data);
        window.api.stop('dataCSV');
    };

// função responsavel por definir o modelo de autoclave apartir dos dados do csv 1
    useEffect(() => {
        if (data1) {
            setModel(ModelData[data1.modelo[0]]);
        }
    }, [data1]);

// função responsavel por processar os dados do csv 2
    const handleLoad2 = (data) => {
        if (ModelData[data.modelo[0]].name === model.name) {
            setData2(data);
        } else {
            window.api.send('modelErro');
        }
        window.api.stop('dataCSV');
    };

// função responsavel por iniciar a leitura do csv 1
    const handleStart1 = (event) => {
        event.preventDefault();
        window.api.send('loadCSV', true);
        window.api.receive('dataCSV', handleLoad1);
    };

// função responsavel por iniciar a leitura do csv 2
    const handleStart2 = (event) => {
        event.preventDefault();
        window.api.send('loadCSV', true);
        window.api.receive('dataCSV', handleLoad2);
    };

// função responsavel por calcular a media e a maxima dos valores lidos
    const handleCalc = (value) => {
        let max = parseFloat(value[0]);
        let avg = 0;
        value.forEach((element) => {
            if (parseFloat(element) > max) {
                max = parseFloat(element);
            }
            avg += parseFloat(element);
        });
        return {
            max,
            avg: (avg / value.length).toFixed(2),
        };
    };

    useEffect(() => {
        if (model) {
            model.parameters.forEach((parameter) => {
                if (parameter.name === type) {
                    setUnit(parameter.idScales);
                }
            });
            setShow([
                {
                    data: data1[type],
                    timeStamp: data1.timeStamp,
                    label: data1.label,
                },
                {
                    data: data2[type],
                    timeStamp: data2.timeStamp,
                    label: data2.label,
                },
            ]);
            setTextArea1(
                data1.label
                    .concat(
                        Object.keys(data1)
                            .map((parameter, index) => {
                                if (
                                    parameter !== 'timeStamp' &&
                                    parameter !== 'label'
                                ) {
                                    if (
                                        parameter !== 'Vaso de Pressão(ºC)' &&
                                        (parameter.split(' ').length > 1 ||
                                            index === 0)
                                    ) {
                                        return `\n${parameter}: ${data1[parameter][0]}`;
                                    }
                                    const aux = handleCalc(data1[parameter]);
                                    return `\n${parameter} -> Máximo: ${aux.max} Média: ${aux.avg}`;
                                }
                                return null;
                            })
                            .join(','),
                    )
                    .replace(',', ''),
            );
            if (data2) {
                setTextArea2(
                    data2.label
                        .concat(
                            Object.keys(data2)
                                .map((parameter, index) => {
                                    if (
                                        parameter !== 'timeStamp' &&
                                        parameter !== 'label'
                                    ) {
                                        if (
                                            parameter !==
                                                'Vaso de Pressão(ºC)' &&
                                            (parameter.split(' ').length > 1 ||
                                                index === 0)
                                        ) {
                                            return `\n${parameter}: ${data2[parameter][0]}`;
                                        }
                                        const aux = handleCalc(
                                            data2[parameter],
                                        );
                                        return `\n${parameter} -> Máximo: ${aux.max} Média: ${aux.avg}`;
                                    }
                                    return null;
                                })
                                .join(','),
                        )
                        .replace(',', ''),
                );
            }
        }
    }, [type, data1, data2]);

// função responsavel por alterar parametros do grafico apartir do modelo de autoclavw
    useEffect(() => {
        if (model) {
            setType(model.parameters[0].name);
            setUnit(model.parameters[0].idScales);
        }
    }, [model]);

// função responsavel por alterar o parametro a ser comparado
    const handleChangeType = (event) => {
        event.preventDefault();
        setType(event.target.value);
    };

// função responsavel por reiniciar os valores iniciais do zoom
    const handleResetZoom = (event) => {
        event.preventDefault();
        setZoom(true);
        setInterval(() => {
            setZoom(false);
        }, 10);
    };

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
                        {model ? (
                            <>
                                <Select
                                    value={type}
                                    onChange={(e) => handleChangeType(e)}
                                    title="Selecionar parâmetro para visualização"
                                >
                                    {model.parameters.map((parameter) => {
                                        return (
                                            <option
                                                title={parameter.title}
                                                value={parameter.name}
                                            >
                                                {parameter.name}
                                            </option>
                                        );
                                    })}
                                </Select>
                                <Button
                                    onClick={(e) => handleResetZoom(e)}
                                    title="Voltar o nivel do zoom ao valor inicial"
                                >
                                    {' '}
                                    Reset Zoom{' '}
                                </Button>
                            </>
                        ) : null}
                    </ButtonBar>
                </Header>
                <Main>
                    <DivGraph>
                        {model ? (
                            <GraphicCompare
                                data={show}
                                model={model}
                                title={type}
                                labels={[data1.label, data2.label]}
                                zoom={zoom}
                                unit={unit}
                            />
                        ) : (
                            <BsClockHistory
                                size={48}
                                style={{
                                    color: '#003b4d',
                                    backgroundColor: 'inherit',
                                }}
                            />
                        )}
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
