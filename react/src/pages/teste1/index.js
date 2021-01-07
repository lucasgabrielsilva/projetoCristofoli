import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import MenuBar from '../../components/menuBar';
import Graphic from '../../components/graphic';
import ModelData from '../../configs';
import {
    Container,
    ButtonBar,
    Title,
    Button,
    Header,
    TextArea,
    DivTest,
    Main,
    Select,
    DivResult,
    DivGraph,
} from './styles';

let dataToCsv = [];

let result = false;
let timeInitial = Date.now();

function Teste1() {
    const [value, setValue] = useState(false);

    const [statusButton, setStatusButton] = useState({
        start: false,
        stop: true,
        clean: true,
    });
    const [textAreaValue, setTextAreaValue] = useState('Aguardando...');
    const [isRunning, setIsRunning] = useState(false);
    const [clean, setClean] = useState(false);
    const [mode, setMode] = useState('realTime');
    const [lines, setLines] = useState('temperature');
    const [model, setModel] = useState(false);

    const handleTime = (now) => {
        return Moment(now - timeInitial)
            .add('-21', 'h')
            .toDate();
    };

    // função responsavel por tratar os dados recebidos e encaminhalos para o grafico e para o arquivo csv ainda não salvo
    const handleDataA = (data) => {
        data.timeStamp = handleTime(data.timeStamp);
        const temp = Object.keys(data).map((parameter) => {
            return data[parameter];
        });
        temp[0] = temp[0].getTime();
        dataToCsv.push(temp);
        setValue(data);
    };

    // função responsavel por receber os dados e finalizar a contabilidade dos testes
    function handleDataB(data) {
        if (data) {
            data.forEach((value) => {
                dataToCsv[1].push(value);
            });
            result = true;
        }
        handleStop();
    }

    // função responsavel por receber os dados referentes ao salvamento do arquivo csv
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
                    `\nResultado.\ntempo de pressurização: ${dataToCsv[1][5]}\ntempo de esterilização: ${dataToCsv[1][6]}\ntempo de despressurização: ${dataToCsv[1][7]}\ntempo de secagem: ${dataToCsv[1][8]}\ntempo de resfriamento: ${dataToCsv[1][9]}\ntempo total: ${dataToCsv[1][10]}\n`,
                ),
            );
        }
        window.api.stop('C');
    };

    // função resposanvel por iniciar o processamento do teste
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
        timeInitial = Date.now();
    };

    // função responsavel por limpar o grafico
    const handleClean = (event) => {
        event.preventDefault();
        setClean(true);
        setTimeout(() => {
            setClean(false);
        }, 100);
        dataToCsv = model.csvHead;
        result = false;
        setStatusButton({
            start: false,
            stop: true,
            clean: true,
        });
        setTextAreaValue('Aguardando...');
    };

    // função responsavel por terminar o teste forçadamente antes do termino total do processo
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
        dataToCsv.forEach((line, index) => {
            if (index === 1) {
                line.unshift(`${window.api.get('model')}`);
            } else if (index !== 0) {
                line.unshift(null);
            }
        });
        window.api.stop('A');
        window.api.stop('B');
        window.api.send('saveCSV', dataToCsv);
    };

    // função responsavel por determinar qual linha está amostra no grafico
    const handleChangeLines = (event) => {
        event.preventDefault();
        setLines(event.target.value);
    };

    // função responvavel por alterar o mode de visialização do grafico(tempo real ou analise)
    const handleChangeMode = (event) => {
        event.preventDefault();
        setMode(event.target.value);
    };

    // função responsavel por obter o modelo da autoclave conectada
    useEffect(async () => {
        setModel(ModelData[`${await window.api.get('model')}`]);
    }, []);

    // função responsavel por atribuir o modelo da autoclave ao arquivo csv
    useEffect(() => {
        if (model) {
            dataToCsv = [model.csvHead];
        }
    }, [model]);

    // função responsavel por encerrar os listenings quando a janela é trocada
    useEffect(() => {
        return () => {
            dataToCsv = [];
            result = false;
            window.api.stop('A');
            window.api.stop('B');
            window.api.stop('C');
        };
    }, []);

    return (
        <Container>
             <MenuBar changeWindow={isRunning} />
            <DivTest>
                <Header>
                    <Title>DataLogger</Title>
                    <ButtonBar>
                        <Button
                            disabled={statusButton.start}
                            onClick={(e) => handleStart(e)}
                            title="Iniciar ciclo"
                        >
                            {' '}
                            Iniciar{' '}
                        </Button>
                        <Button
                            disabled={statusButton.stop}
                            onClick={(e) => handleStop(e)}
                            title="Interromper ciclo"
                        >
                            {' '}
                            Parar{' '}
                        </Button>
                        <Button
                            disabled={statusButton.clean}
                            onClick={(e) => handleClean(e)}
                            title="Limpar gráfico"
                        >
                            {' '}
                            Limpar{' '}
                        </Button>
                        <Select
                            value={lines}
                            onChange={(e) => handleChangeLines(e)}
                            title="Selecionar linhas do gráfico"
                        >
                            {model
                                ? model.scales.map((scale) => {
                                      return (
                                          <option
                                              title={scale.title}
                                              value={scale.id}
                                          >
                                              {scale.name}
                                          </option>
                                      );
                                  })
                                : null}
                        </Select>
                        <Select
                            value={mode}
                            onChange={(e) => handleChangeMode(e)}
                            title="Selecionar mode de visualização"
                        >
                            <option
                                title="Visualizar dados em tempo real"
                                value="realTime"
                            >
                                Tempo Real{' '}
                            </option>
                            <option
                                title="Analisar dados obtidos"
                                value="analyze"
                            >
                                {' '}
                                Analisar{' '}
                            </option>
                        </Select>
                    </ButtonBar>
                </Header>
                <Main>
                    <DivGraph>
                        <Graphic
                            data={value}
                            clean={clean}
                            mode={mode}
                            lines={lines}
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
