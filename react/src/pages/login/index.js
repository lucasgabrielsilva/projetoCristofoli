import React, { useEffect, useState } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import { Redirect } from 'react-router-dom';
import Logo from '../../assets/LogoCristofoli.svg';
import ModelData from '../../configs';

import {
    Container,
    DivLogin,
    DivOptions,
    DivAlerts,
    DivPort,
    ButtonRefresh,
    Image,
    Select,
    Button,
    DivConfig,
    DivImage,
    DivEntry,
    Text,
} from './styles';

function Login() {
    const [port, setPort] = useState('');
    const [listPorts, setListPorts] = useState([]);
    const [portsSignal, setPortsSignal] = useState(false);
    const [error, setError] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [model, setModel] = useState(Object.keys(ModelData)[0]);
    const [mode, setMode] = useState(false);
    const [destiny, setDestiny] = useState('/analise');
    const [progress, setProgess] = useState('Verificando atualizações...');
    const [showButton, setShowButton] = useState(false);

    const handleConnect = (data) => {
        if (data) {
            window.api.send('Model', model);
            setRedirect(true);
        } else {
            setError(true);
        }
    };

    const handlePort = (event) => {
        event.preventDefault();
        setPort(event.target.value);
        setError(false);
    };

    const handleUpdatePorts = (event) => {
        event.preventDefault();
        setPortsSignal(true);
        setTimeout(() => {
            setPortsSignal(false);
        }, 1500);
        window.api.send('listPorts');
    };

    const handleUpdateListPort = (data) => {
        setListPorts(data);
        setPort(`${data[0]}`);
    };

    const handleTryConnect = async (event) => {
        event.preventDefault();
        if (!mode) {
            setRedirect(true);
        }
        window.api.send('portConnect', port);
    };

    const handleChangeModel = (event) => {
        event.preventDefault();
        setModel(event.target.value);
        window.api.send('model', event.target.value);
        setError(false);
    };

    const handleChangeMode = (event) => {
        if (!mode) {
            setDestiny('/monitor');
            window.api.send('Mode', true);
        } else {
            setDestiny('/analise');
            window.api.send('Mode', false);
        }
        setMode(!mode);
    };

    const handleProgress = (data) => {
        if (!data) {
            setShowButton(true);
            setProgess(data);
        } else {
            setProgess(data);
        }
    };

    useEffect(() => {
        window.api.send('Update');
        window.api.send('Mode', false);
        window.api.receive('connectionPort', handleConnect);
        window.api.receive('listPort', handleUpdateListPort);
        window.api.receive('progress', handleProgress);
        window.api.send('listPorts');
        window.api.send('model', Object.keys(ModelData)[0]);
    }, []);

    useEffect(() => {
        return () => {
            window.api.stop('listPorts');
            window.api.stop('connectionPort');
        };
    }, []);

    return (
        <Container>
            <DivLogin>
                <DivImage>
                    <Image src={Logo} alt="logo da cristofoli" />
                </DivImage>
                <DivConfig>
                    {!progress ? (
                        <Text>
                            Conectar autoclave:{' '}
                            <input
                                type="checkbox"
                                checked={mode}
                                onChange={(e) => handleChangeMode(e)}
                            />
                        </Text>
                    ) : null}
                    <DivOptions>
                        {mode ? (
                            <>
                                <Text>
                                    modelo:
                                    <Select
                                        title="Selecione o modelo da autoclave"
                                        value={model}
                                        onChange={handleChangeModel}
                                    >
                                        {Object.keys(ModelData).map((value) => {
                                            return (
                                                <option value={value}>
                                                    {ModelData[value].name}
                                                </option>
                                            );
                                        })}
                                    </Select>
                                </Text>
                                <DivPort>
                                    <Text>
                                        porta:
                                        <Select
                                            title="Selecione a porta a qual a autoclave está conectada"
                                            value={port}
                                            onChange={handlePort}
                                        >
                                            {listPorts.map((portName) => {
                                                return (
                                                    <option
                                                        value={`${portName}`}
                                                    >
                                                        {' '}
                                                        {portName}{' '}
                                                    </option>
                                                );
                                            })}
                                        </Select>
                                    </Text>
                                    <ButtonRefresh
                                        title="Atulizar lista das portas COM"
                                        onClick={handleUpdatePorts}
                                    >
                                        <FiRefreshCcw
                                            size={16}
                                            style={{
                                                backgroundColor: 'inherit',
                                            }}
                                        />
                                    </ButtonRefresh>
                                </DivPort>
                            </>
                        ) : null}
                    </DivOptions>
                    <DivAlerts>
                        {progress || null}
                        {portsSignal ? (
                            <Text>Portas COM atualizadas</Text>
                        ) : null}
                        {error ? (
                            <h4
                                style={{
                                    color: 'red',
                                    backgroundColor: 'inherit',
                                }}
                            >
                                Erro na conexão com a porta COM
                            </h4>
                        ) : null}
                    </DivAlerts>
                </DivConfig>
                <DivEntry>
                    <Button disabled={progress} onClick={handleTryConnect}>
                        Entrar
                    </Button>
                </DivEntry>
                {redirect ? <Redirect to={destiny} /> : null}
            </DivLogin>
        </Container>
    );
}

export default Login;
