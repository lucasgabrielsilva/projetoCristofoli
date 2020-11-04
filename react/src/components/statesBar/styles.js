import styled from "styled-components";

const Container = styled.div`
    height: 100%;
    width: 15%;
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    background-color: #fafafa;

    @media(max-width: 800px){
        width: 20%;
    }

`;

const Status = styled.label`
    height: 2vh;
    width: 1vw;
    border-radius: 100%;
    background-color: green;
    opacity: ${props => props.opa};
    margin-right: 3%;
`;

const Item = styled.div`
    height: 3%;
    align-self: auto;
    display: flex;
    flex-flow: row nowrap;
    border-bottom: 1px solid gray;
    justify-content: flex-start;
    align-content: center;
    background-color: inherit;
`;

const ItemText = styled.label`
    font-size: 85%;
    background-color: inherit;
`;

const Title = styled.h5`
    background-color: inherit;
`;

export {Container, Item, ItemText, Title, Status};