import styled from 'styled-components';

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-flow: column wrap;
    justify-content: flex-start;
    align-content: flex-start;
`;

const DivCards = styled.div`
    height: 100%;
    width: 75%;
    background-color: gray;
    align-self: auto;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-content: flex-start;

    @media (max-width: 800px) {
        flex-flow: column nowrap;
        justify-content: flex-start;
        width: 70%;
    }
`;

export { Container, DivCards };
