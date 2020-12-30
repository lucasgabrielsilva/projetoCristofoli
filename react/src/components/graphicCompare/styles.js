import styled from 'styled-components';

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    background-color: white;
`;

const Canvas = styled.canvas`
    background-color: #fafafa;
`;

export { Container, Canvas };
