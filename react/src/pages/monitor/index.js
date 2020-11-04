import React, { useState, useEffect } from 'react';
import MenuBar from '../../components/menuBar';
import Card from '../../components/card';
import StatesBar from '../../components/statesBar';
import { Container, DivCards } from './styles';
import ConfigStatesBar from '../../configs';

function Monitor() {
    const [resize, setResize] = useState(true);
    const [data, setData] = useState({
        vase: 0,
        resistence: 0,
        tension: 0,
        pressure: 0,
    });

    window.onresize = (event) => {
        setResize(!resize);
    };

    const handleDataA = (value) => {
        setData(value);
    };

    useEffect(() => {
        window.api.receive('A', handleDataA);
    }, []);

    useEffect(() => {
        return () => window.api.stop('A');
    }, []);

    return (
        <Container>
            <MenuBar changeWindow={false} />
            <DivCards>
                <Card
                    title="Resistência"
                    value={data.resistence}
                    majorTicks={['0', '10', '20', '30', '40', '50', '60']}
                    highlights={[
                        { from: '0', to: '40', color: 'lightgreen' },
                        { from: '40', to: '50', color: 'yellow' },
                        { from: '50', to: '60', color: 'coral' },
                    ]}
                    minValue={0}
                    maxValue={60}
                    unit="ºC"
                    resize={resize}
                />
                <Card
                    title="Vaso"
                    value={data.vase}
                    majorTicks={['0', '10', '20', '30', '40', '50', '60']}
                    highlights={[
                        { from: '0', to: '40', color: 'lightgreen' },
                        { from: '40', to: '50', color: 'yellow' },
                        { from: '50', to: '60', color: 'coral' },
                    ]}
                    minValue={0}
                    maxValue={60}
                    unit="ºC"
                    resize={resize}
                />
                <Card
                    title="Pressão"
                    value={data.pressure}
                    majorTicks={['0', '10', '20', '30', '40', '50', '60']}
                    highlights={[
                        { from: '0', to: '40', color: 'lightgreen' },
                        { from: '40', to: '50', color: 'yellow' },
                        { from: '50', to: '60', color: 'coral' },
                    ]}
                    minValue={0}
                    maxValue={60}
                    unit="bar"
                    resize={resize}
                />
                <Card
                    title="Tensão"
                    value={data.tension}
                    majorTicks={['0', '1', '2', '3', '4', '5']}
                    highlights={[
                        { from: '0', to: '3', color: 'lightgreen' },
                        { from: '3', to: '4', color: 'yellow' },
                        { from: '4', to: '5', color: 'coral' },
                    ]}
                    minValue={0}
                    maxValue={5}
                    unit="V"
                    resize={resize}
                />
            </DivCards>
            <StatesBar categories={ConfigStatesBar} />
        </Container>
    );
}

export default Monitor;
