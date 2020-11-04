import React, { useState, useEffect } from 'react';
import { BiExit } from 'react-icons/bi';
import { Redirect } from 'react-router-dom';
import Logo from '../../assets/cristofoli.png';
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

    useEffect(() => {
        window.api.receive('changeWindow', handleChangeWindow);
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
                <Title>Monitorar</Title>
                <Item onClick={() => handleTryChangeWindow('/monitor')}>
                    {' '}
                    Status{' '}
                </Item>
                <Title>Testes</Title>
                <Item onClick={() => handleTryChangeWindow('/compare')}>
                    {' '}
                    Comparar{' '}
                </Item>
                <Item onClick={() => handleTryChangeWindow('/teste1')}>
                    {' '}
                    Teste 1{' '}
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
