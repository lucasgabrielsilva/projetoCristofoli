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

function SendData() {
    return (
        <Container>
            <MenuBar changeWindow={isRunning} />
            <DivTest>
                <Header>
                    <Title> DataLogger </Title>
                </Header>
                <Main>
                    <form>
                        <label>nome:</label>
                        <input />
                        <label> email: </label>
                        <input />
                        <label> descrição </label>
                        <textarea />
                    </form>
                </Main>
            </DivTest>
        </Container>
    );
}

export default SendData;
