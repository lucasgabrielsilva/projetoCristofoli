import React from 'react';
import { Container, Item, ItemText, Title, Status } from './styles';

function StatesBar(props) {
    return (
        <Container>
            {props.categories.map((categorie) => {
                return (
                    <>
                        <Item key={categorie.name}>
                            <Title>{categorie.name}</Title>
                        </Item>
                        {categorie.options.map((option) => {
                            return (
                                <Item key={option.name}>
                                    <Status opa={option.opacity} />
                                    <ItemText>{option.name}</ItemText>
                                </Item>
                            );
                        })}
                    </>
                );
            })}
        </Container>
    );
}

export default StatesBar;
