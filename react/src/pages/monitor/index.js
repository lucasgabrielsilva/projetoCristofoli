import React, { useState, useEffect } from 'react';
import MenuBar from '../../components/menuBar';
import Card from '../../components/card';
import CardInvalid from '../../components/cardInvalid';
import { Container, DivCards, Header, Title } from './styles';
import ModelData from '../../configs';

function Monitor() {
    const [resize, setResize] = useState(false);
    const [data, setData] = useState(false);
    const [model, setModel] = useState(false);

// função responsavel por
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
                    resize={resize}
                />
            );
        });
    };

// função responsavel por definir o numero de card invalidos a serem renderizados
    const handleCardInvalid = (event) => {
        const temp = [];
        for (let i = 0; i < 8 - model.parameters.length; i += 1) {
            temp.push(0);
        }
        return temp.map(() => {
            return <CardInvalid resize={resize}/>;
        });
    };

// função responsavel por processar os dados recebidos da autoclave
    const handleDataA = (value) => {
        const temp = {};
        Object.keys(value).forEach((parameter) => {
            temp[parameter] = value[parameter];
        });
        setData(temp);
    };

// função responsavel por atualizar a pagina sempre que haver um resize
    window.onresize = (event) => {
        setResize(!resize);
    }

// função responsavel por receber os dados da autoclave
    useEffect(async () => {
        setModel(ModelData[`${await window.api.get('model')}`]);
        window.api.receive('A', handleDataA);
    }, []);

// função responsavel por encerrar o listener quando a janela é trocada
    useEffect(() => {
        return () => window.api.stop('A');
    }, []);

    return (
        <Container>
            <MenuBar changeWindow={false} />
            <DivCards>

                {model ? handleCard() : null}
                {model ? handleCardInvalid() : null}
            </DivCards>
        </Container>
    );
}

export default Monitor;
