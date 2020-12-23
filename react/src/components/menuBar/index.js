import React, { useState, useEffect } from 'react';
import { BiExit } from 'react-icons/bi';
import { Redirect } from 'react-router-dom';
import Logo from '../../assets/LogoCristofoli3.svg';
import {
    Container,
    DivOptions,
    DivImg,
    DivExit,
    Image,
    Title,
    Item,
    ButtonExit,
} from './styles.js';

function MenuBar(props) {
    const [redirect, setRedirect] = useState(false);
    const [goTo, setGoTo] = useState('#');
    const [mode, setMode] = useState(false);

    const handleChangeWindow = (data) => {
        if (data) {
            window.api.stop('A');
            window.api.stop('B');
            window.api.stop('changeWindow');
            window.api.stop('listPort');
            window.api.stop('connectionPort');
            setRedirect(true);
        } else {
            setGoTo('#');
        }
    };

    useEffect(async () => {
        window.api.receive('changeWindow', handleChangeWindow);
        setMode(await window.api.get('mode'));
    }, []);

    const handleTryChangeWindow = (data) => {
        if (props.changeWindow) {
            const index = window.location.href.indexOf('#/');
            if (
                window.location.href.substring(
                    index + 1,
                    window.location.href.length,
                ) !== data
            ) {
                setGoTo(data);
                window.api.send('openModal', data);
            }
        } else if (data === '/') {
            setGoTo(data);
            window.api.send('Exit');
        } else {
            setGoTo(data);
            setRedirect(true);
        }
    };

    return (
        <Container>
            <DivOptions>
                <DivImg>
                    <Image src={Logo} alt="logo da cristofoli" />
                </DivImg>
                <Title />
                <Item
                    title="Analisar dados salvos previamente"
                    onClick={() => handleTryChangeWindow('/analise')}
                >
                    {' '}
                    Analisar{' '}
                </Item>
                <Item
                    title="Comparar dados salvos previamente"
                    onClick={() => handleTryChangeWindow('/compare')}
                >
                    {' '}
                    Comparar{' '}
                </Item>
                <Item
                    title="Monitorar dados da autoclave"
                    onClick={() => handleTryChangeWindow('/monitor')}
                    disabled={!mode}
                >
                    {' '}
                    Monitorar{' '}
                </Item>
                <Item
                    title="Obter dados via datalog"
                    onClick={() => handleTryChangeWindow('/teste1')}
                    disabled={!mode}
                >
                    {' '}
                    DataLog{' '}
                </Item>
                <Item
                    title="Enviar Relatório"
                    onClick={() => handleTryChangeWindow('/sendData')}
                    disabled={false}
                >
                    {' '}
                    Reportar{' '}
                </Item>
            </DivOptions>
            <DivExit>
                <ButtonExit
                    title="Sair"
                    onClick={() => handleTryChangeWindow('/')}
                >
                    <BiExit size={24} style={{ backgroundColor: 'inherit' }} />
                </ButtonExit>
            </DivExit>
            {redirect ? <Redirect to={goTo} /> : null}
        </Container>
    );
}

export default MenuBar;
