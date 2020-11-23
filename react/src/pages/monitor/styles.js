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
    width: calc(100vw - 120px);
    background-color: gray;
    align-self: auto;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-content: flex-start;

    @media (max-width: 800px) {
        flex-flow: column nowrap;
        justify-content: flex-start;
    }
`;

const Header = styled.div`
    height: 10%;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    background-color: #214f62;
`;

const Title = styled.label`
    align-self: auto;
    margin-left: 3%;
    font-size: 200%;
    color: white;
    background-color: inherit;
`;

export { Container, DivCards, Header, Title };
