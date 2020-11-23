import styled from 'styled-components';

const Container = styled.div`
    height: 100%;
    width: 120px;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: space-between;
    border-right: 2px solid gray;
    background-color: #fafafa;

    @media (max-width: 800px) {
        justify-content: flex-start;
    }
`;

const DivOptions = styled.div`
    max-height: 80%;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    background-color: inherit;
`;

const DivExit = styled.div`
    height: 5%;
    width: 100%;
    align-self: flex-end;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    background-color: #fafafa;
`;

const DivImg = styled.div`
    height: 35%;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    background-color: white;
`;

const Image = styled.img`
    height: 90;
    width: 80%;
    background-color: white;
`;

const Title = styled.label`
    padding-top: 5%;
    padding-bottom: 5%;
    width: 100%;
    border-bottom: 1px solid gray;
    font-size: 90%;
    font-style: italic;
    color: white;
    background-color: #214f62;
    align-self: auto;
`;

const Item = styled.button`
    height: 15%;
    width: 100%;
    background-color: white;
    color: black;
    border: none;
    border-bottom: 1px solid darkgray;
    font-size: 100%;
    cursor: pointer;
    &:disabled {
        opacity: 0.2;
        cursor: default;
    }
    &:hover {
        background-color: #214f62;
        color: white;
    }
`;

const ButtonExit = styled.button`
    height: 100%;
    width: 100%;
    background-color: #214f62;
    color: white;
    border: none;
    border-bottom: 1px solid darkgray;
    border-top: 1px solid darkgray;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    &:hover {
        background-color: white;
        color: #214f62;
    }
`;

export {
    Container,
    Image,
    DivImg,
    DivOptions,
    DivExit,
    Title,
    Item,
    ButtonExit,
};
