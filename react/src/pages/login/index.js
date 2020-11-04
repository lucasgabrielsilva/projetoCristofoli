import React, { useEffect, useState } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import { Redirect } from 'react-router-dom';
import Logo from '../../assets/cristofoli.png';

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

    const handleConnect = (data) => {
        if (data) {
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
        window.api.send('portConnect', port);
    };

    useEffect(() => {
        window.api.receive('connectionPort', handleConnect);
        window.api.receive('listPort', handleUpdateListPort);
        window.api.send('listPorts');
    }, []);

    return (
        <Container>
            <DivLogin>
                <Image src={Logo} alt="logo da cristofoli" />
                <DivOptions>
                    <label style={{ backgroundColor: 'inherit' }}>
                        modelo:
                        <Select value="VDR 3.00">
                            <option value="VDR 3.00"> VDR 3.00 </option>
                            <option value="Modelo 2"> Modelo 2 </option>
                            <option value="Modelo 3"> Modelo 3 </option>
                            <option value="Modelo 4"> Modelo 4 </option>
                        </Select>
                    </label>
                    <DivPort>
                        <label style={{ backgroundColor: 'inherit' }}>
                            porta:
                            <Select value={port} onChange={handlePort}>
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
                </DivOptions>
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
                <Button onClick={handleTryConnect}> Conectar </Button>
                {redirect ? <Redirect to="/monitor" /> : null}
            </DivLogin>
        </Container>
    );
}

export default Login;
