import styled from "styled-components";

const Container = styled.div`
    height: 100%;
    width: 99%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: #fafafa;
    overflow-x: scroll;
`;

const Canvas = styled.canvas`
    background-color: #fafafa;
`;


export {Container, Canvas};