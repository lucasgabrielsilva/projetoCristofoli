import React from 'react';
import { VscError } from 'react-icons/vsc';
import { Container } from './styles';

export default function Card() {
    return (
        <Container>
            <label style={{ fontSize: '14px', fontWeight: 'bold' }}>
                Parâmetro inválido nesse modelo
            </label>
            <VscError
                size={48}
                style={{ color: 'coral', backgroundColor: 'inherit' }}
            />
        </Container>
    );
}
