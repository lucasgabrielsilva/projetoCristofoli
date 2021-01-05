import styled from 'styled-components';

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    background-color: #0f5aa1;
`;

const DivLogin = styled.div`
    height: 55vh;
    width: 28vw;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 10px;
`;

const DivImage = styled.div`
    height: 28%;
    width: 85%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    border-radius: 30% 30% 0% 0%;
    background-color: inherit;
`;

const DivConfig = styled.div`
    height: 35%;
    width: 95%;
    margin-top: 15%;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    background-color: inherit;
`;

const DivEntry = styled.div`
    height: 10%;
    width: 75%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    background-color: inherit;
`;

const Text = styled.h4`
    color: #003b4d;
    background-color: inherit;
`;

const DivOptions = styled.div`
    height: 10vh;
    width: 100%;
    background-color: inherit;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: center;
`;

const DivPort = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    background-color: inherit;
`;

const DivAlerts = styled.div`
    height: 10vh;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    background-color: inherit;
`;

const Image = styled.img`
    height: 100%;
    width: 100%;
    border-radius: 30% 30% 0% 0%;
    background-color: inherit;
`;

const Select = styled.select`
    color: #003b4d;
    border: 2px solid #003b4d;
    background-color: inherit;
    border-radius: 20%;
    cursor: pointer;
`;

const Button = styled.button`
    padding: 2%;
    border: none;
    border-radius: 5px;
    color: white;
    background-color: #0f5aa1;
    cursor: pointer;
    &:hover {
        background-color: #0083c1;
        color: white;
    }
    &:disabled {
        opacity: 0.2;
        cursor: default;
    }
`;

const ButtonRefresh = styled.button`
    max-height: 35%;
    max-width: 40%;
    border: 2px solid #003b4d;
    border-radius: 20%;
    color: white;
    background-color: #003b4d;
    cursor: pointer;
    &:hover {
        background-color: white;
        color: #003b4d;
    }
`;

export {
    Container,
    DivLogin,
    DivOptions,
    DivPort,
    DivAlerts,
    DivImage,
    DivConfig,
    DivEntry,
    Text,
    ButtonRefresh,
    Image,
    Select,
    Button,
};
