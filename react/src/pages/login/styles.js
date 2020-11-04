import styled from "styled-components";

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    background-color: #fafafa;
`;

const DivLogin = styled.div`
    height: 70%;
    width: 35%;
    display: flex;
    flex-flow: column wrap;
    justify-content: space-around;
    align-items: center;
    background-color: white;
    border: 2px solid #214f62;
    border-radius: 20%;
`;

const DivOptions = styled.div`
    height: 20%;
    width: 100%;
    background-color: inherit;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
`;

const Image = styled.img`
    height: 28vh;
    width: 28vw;
    background-color: inherit;
`;

const Select = styled.select`
    color: #214f62;
    border: 2px solid #214f62;
    background-color: inherit;
    border-radius: 20%;
    cursor: pointer;
`;

const Button = styled.button`
    padding: 2%;
    border: 2px solid #214f62;
    border-radius: 20%;
    color: #214f62;
    background-color: white;
    cursor: pointer;
    &:hover{
        background-color: #214f62;
        color: white;
    }
`;

const DivPort = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    background-color: inherit;
`;

const ButtonRefresh = styled.button`
    max-height: 30%;
    max-width: 35%;
    padding: 1%;
    border: 2px solid #214f62;
    border-radius: 20%;
    color: white;
    background-color: #214f62;
    cursor: pointer;
    &:hover{
        background-color: white;
        color: #214f62;
    }
`;

export {Container, DivLogin, DivOptions, DivPort, ButtonRefresh, Image, Select, Button};