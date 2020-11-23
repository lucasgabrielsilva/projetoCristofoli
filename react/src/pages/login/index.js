import React, { useEffect, useState } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import { Redirect } from 'react-router-dom';
import Logo from '../../assets/cristofoli.png';
import ModelData from '../../configs';

import {
    Container,
    DivLogin,
    DivOptions,
    DivPort,
    ButtonRefresh,
    Image,
    Select,
    Button,
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
        window.api.send('listPorts');
    };

    const handleUpdateListPort = (data) => {
        setListPorts(data);
        setPort(`${data[0]}`);
        setPortsSignal(true);
        setTimeout(() => {
            setPortsSignal(false);
        }, 1500);
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
        // window.api.send('Model', event.target.value);
        setError(false);
    };

    const handleSelects = (event) => {
        return (
            <>
                <label style={{ backgroundColor: 'inherit' }}>
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
                </label>
                <DivPort>
                    <label style={{ backgroundColor: 'inherit' }}>
                        porta:
                        <Select
                            title="Selecione a porta a qual a autoclave está conectada"
                            value={port}
                            onChange={handlePort}
                        >
                            {listPorts.map((portName) => {
                                return (
                                    <option value={`${portName}`}>
                                        {' '}
                                        {portName}{' '}
                                    </option>
                                );
                            })}
                        </Select>
                    </label>
                    <ButtonRefresh
                        title="Atulizar lista das portas COM"
                        onClick={handleUpdatePorts}
                    >
                        <FiRefreshCcw
                            size={20}
                            style={{ backgroundColor: 'inherit' }}
                        />
                    </ButtonRefresh>
                </DivPort>
            </>
        );
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

    useEffect(() => {
        window.api.send('Mode', false);
        window.api.receive('connectionPort', handleConnect);
        window.api.receive('listPort', handleUpdateListPort);
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
                <Image src={Logo} alt="logo da cristofoli" />
                <label style={{ color: '#214f62', backgroundColor: 'inherit' }}>
                    Conectar autoclave:
                    <input
                        type="checkbox"
                        checked={mode}
                        onChange={(e) => handleChangeMode(e)}
                    />
                </label>
                <DivOptions>{mode ? handleSelects() : null}</DivOptions>
                {portsSignal ? (
                    <label
                        style={{ color: '#214f62', backgroundColor: 'inherit' }}
                    >
                        Portas COM atualizadas
                    </label>
                ) : null}
                {error ? (
                    <label style={{ color: 'red', backgroundColor: 'inherit' }}>
                        Erro na conexão com a porta COM
                    </label>
                ) : null}
                <Button onClick={handleTryConnect}> Entrar </Button>
                {redirect ? <Redirect to={destiny} /> : null}
            </DivLogin>
        </Container>
    );
}

export default Login;
