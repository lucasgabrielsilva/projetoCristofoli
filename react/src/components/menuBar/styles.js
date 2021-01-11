import styled from 'styled-components';

const Container = styled.div`
    height: 100vh;
    width: 140px;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: space-between;
    border-right: 1px solid lightgray;
    background-color: #003b4d;
    border-radius: 0px 5px 5px 0px;

    @media (max-width: 800px) {
        justify-content: flex-start;
    }
`;

const DivOptions = styled.div`
    max-height: 95%;
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
    max-height: 40%;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    background-color: #003b4d;
`;

const Image = styled.img`
    height: 90%;
    width: 90%;
    background-color: inherit;
`;

const Title = styled.label`
    padding-top: 5%;
    padding-bottom: 5%;
    width: 100%;
    font-size: 90%;
    font-style: italic;
    color: white;
    background-color: #0083c1;
    align-self: auto;
`;

const Item = styled.button`
    height: 15%;
    width: 100%;
    background-color: inherit;
    color: white;
    border: none;
    padding: 15px;
    font-size: 16px;
    cursor: pointer;
    &:disabled {
        opacity: 0.2;
        cursor: default;
    }
    &:hover {
        background-color: white;
        color: #0083c1;
    }
`;

const ButtonExit = styled.button`
    height: 100%;
    width: 100%;
    background-color: #003b4d;
    color: white;
    border: none;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    &:hover {
        background-color: white;
        color: #003b4d;
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
