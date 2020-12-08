import React, { useState, useEffect } from 'react';
import MenuBar from '../../components/menuBar';
import Card from '../../components/card';
import CardInvalid from '../../components/cardInvalid';
import { Container, DivCards, Header, Title } from './styles';
import ModelData from '../../configs';

function Monitor() {
    const [resize, setResize] = useState(true);
    const [data, setData] = useState(false);
    const [model, setModel] = useState(false);

    const handleCard = (event) => {
        return model.parameters.map((parameter) => {
            return (
                <Card
                    title={parameter.name}
                    value={data[parameter.name]}
                    majorTicks={parameter.majorTicks}
                    highlights={parameter.highLights}
                    minValue={parameter.min}
                    maxValue={parameter.max}
                    unit={parameter.unit}
                />
            );
        });
    };

    const handleCardInvalid = (event) => {
        const temp = [];
        for (let i = 0; i < 8 - model.parameters.length; i += 1) {
            temp.push(0);
        }
        return temp.map(() => {
            return <CardInvalid />;
        });
    };

    const handleDataA = (value) => {
        const temp = {};
        Object.keys(value).forEach((parameter) => {
            temp[parameter] = value[parameter];
        });
        setData(temp);
    };

    useEffect(async () => {
        setModel(ModelData[`${await window.api.get('model')}`]);
        window.api.receive('A', handleDataA);
    }, []);

    useEffect(() => {
        return () => window.api.stop('A');
    }, []);

    return (
        <Container>
            <MenuBar changeWindow={false} />
            <DivCards>
                <Header>
                    <Title> {model.name} </Title>
                </Header>
                {model ? handleCard() : null}
                {model ? handleCardInvalid() : null}
            </DivCards>
        </Container>
    );
}

export default Monitor;
