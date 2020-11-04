import React, { useState } from 'react';
import MenuBar from '../../components/menuBar';
import Graphic from '../../components/graphic';

import {
    Container,
    ButtonBar,
    Title,
    Button,
    Header,
    TextArea,
    DivTest,
    Main,
    DivResult,
    DivGraph,
} from './styles';

let dataToCsv = [
    [
        'tensão',
        'Temperatura da resistência',
        'temperatura do vaso',
        'pressão',
        'tempo de pressurização',
        'tempo de esterilização',
        'tempo de despressurização',
        'tempo de secagem',
        'tempo de resfriamento',
        'tempo total',
    ],
];

let result = false;

function Teste1() {
    const [data, setData] = useState({
        resistence: 0,
        vase: 0,
        pressure: 0,
        tension: 0,
    });

    const [statusButton, setStatusButton] = useState({
        start: false,
        stop: true,
        clean: true,
    });
    const [textAreaValue, setTextAreaValue] = useState('Aguardando...');
    const [isRunning, setIsRunning] = useState(false);
    const [clean, setClean] = useState(false);

    const handleDataA = (data) => {
        const temp = {
            resistence: data.resistence,
            vase: data.vase,
            pressure: data.pressure,
            tension: data.tension,
        };
        dataToCsv.push([
            temp.tension,
            temp.resistence,
            temp.vase,
            temp.pressure,
        ]);
        setData(temp);
    };

    function handleDataB(data) {
        if (data) {
            dataToCsv[1].push(data.presurization);
            dataToCsv[1].push(data.sterilization);
            dataToCsv[1].push(data.depresurization);
            dataToCsv[1].push(data.drying);
            dataToCsv[1].push(data.coulding);
            dataToCsv[1].push(data.total);
            result = true;
        }
        handleStop();
    }

    const handleDataC = (data) => {
        setTextAreaValue('finalizando teste...');
        if (data) {
            setTextAreaValue(
                textAreaValue.concat('\narquivo salvo.\nteste finalizado.'),
            );
        } else {
            setTextAreaValue(
                textAreaValue.concat(
                    '\narquivo não foi salvo.\nteste finalizado.',
                ),
            );
        }
        if (result) {
            setTextAreaValue(
                textAreaValue.concat(
                    `\nResultado.\ntempo de pressurização: ${dataToCsv[1][4]}\ntempo de esterilização: ${dataToCsv[1][5]}\ntempo de despressurização: ${dataToCsv[1][6]}\ntempo de secagem: ${dataToCsv[1][7]}\ntempo de resfriamento: ${dataToCsv[1][8]}\ntempo total: ${dataToCsv[1][9]}\n`,
                ),
            );
        }
        window.api.stop('C');
    };

    const handleStart = (event) => {
        event.preventDefault();
        window.api.receive('A', handleDataA);
        window.api.receive('B', handleDataB);
        window.api.receive('C', handleDataC);
        setIsRunning(true);
        setStatusButton({
            start: true,
            stop: false,
            clean: true,
        });
        setTextAreaValue(
            textAreaValue.concat('\nIniciando...\nrealizando testes...'),
        );
    };

    const handleClean = (event) => {
        event.preventDefault();
        setClean(true);
        setTimeout(() => {
            setClean(false);
        }, 100);
        dataToCsv = [dataToCsv[0]];
        result = false;
        setStatusButton({
            start: false,
            stop: true,
            clean: true,
        });
        setTextAreaValue('Aguardando...');
    };

    const handleStop = (event) => {
        if (event) {
            event.preventDefault();
        }
        setIsRunning(false);
        setStatusButton({
            start: true,
            stop: true,
            clean: false,
        });
        window.api.stop('A');
        window.api.stop('B');
        window.api.send('saveCSV', dataToCsv);
    };

    return (
        <Container>
            <MenuBar changeWindow={isRunning} />
            <DivTest>
                <Header>
                    <Title> Teste</Title>
                    <ButtonBar>
                        <Button
                            disabled={statusButton.start}
                            onClick={(e) => handleStart(e)}
                        >
                            {' '}
                            Iniciar{' '}
                        </Button>
                        <Button
                            disabled={statusButton.stop}
                            onClick={(e) => handleStop(e)}
                        >
                            {' '}
                            Parar{' '}
                        </Button>
                        <Button
                            disabled={statusButton.clean}
                            onClick={(e) => handleClean(e)}
                        >
                            {' '}
                            Limpar{' '}
                        </Button>
                    </ButtonBar>
                </Header>
                <Main>
                    <DivGraph>
                        <Graphic
                            datasets={[
                                {
                                    label: 'Resistência(ºC)',
                                    borderColor: 'blue',
                                    fill: false,
                                    showLine: true,
                                },
                                {
                                    label: 'Vaso(ºC)',
                                    borderColor: 'green',
                                    fill: false,
                                    showLine: true,
                                },
                                {
                                    label: 'Pressão(bar)',
                                    borderColor: 'orange',
                                    fill: false,
                                    showLine: true,
                                },
                                {
                                    label: 'Voltagem(V)',
                                    borderColor: 'red',
                                    fill: false,
                                    showLine: true,
                                },
                            ]}
                            data={data}
                            clean={clean}
                        />
                    </DivGraph>
                    <DivResult>
                        <TextArea disabled value={textAreaValue} />
                    </DivResult>
                </Main>
            </DivTest>
        </Container>
    );
}

export default Teste1;
