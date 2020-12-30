import styled from 'styled-components';

const Container = styled.div`
    height: 25%;
    width: 50%;
    background-color: white;
    display: flex;
    flex-flow: column wrap;
    justify-content: space-evenly;
    align-items: center;
    border: 2px solid gray;

    @media (max-width: 800px) {
        width: 100%;
    }
`;

export { Container };
