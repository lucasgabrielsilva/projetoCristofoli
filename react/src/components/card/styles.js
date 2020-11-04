import styled from 'styled-components';

const Container = styled.div`
    height: 25%;
    width: 50%;
    background-color: #fafafa;
    display: flex;
    flex-flow: column wrap;
    justify-content: space-around;
    align-items: center;
    border: 2px solid gray;

    @media(max-width: 800px){
        width: 100%;
    }
`;

const DivTitle = styled.div`
    height: 15%;
    align-self: auto;
    display: flex;
    background-color: #214f62;
    flex-flow: row nowrap;
`;

const DivCanvas = styled.div`
    align-self: auto;
    height: 65%;
    width: 95%;
`;

const DivInfo = styled.div`
    height: 15%;
    align-self: auto;
    display: flex;
    flex-flow: row nowrap;
`;

export {Container, DivTitle, DivCanvas, DivInfo};