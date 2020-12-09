import styled from 'styled-components';

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    background-color: white;
`;

const DivLogin = styled.div`
    height: 65vh;
    width: 33vw;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    background-color: white;
    border: 2px solid #214f62;
    border-radius: 20%;
`;

const DivImage = styled.div`
    height: 30%;
    width: 90%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    border: 1px dotted orange;
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
    border: 1px dotted purple;
    background-color: inherit;
`;

const DivEntry = styled.div`
    height: 10%;
    width: 75%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    border: 1px dotted green;
    background-color: inherit;
`;

const Text = styled.h4`
    color: #214f62;
    background-color: inherit;
`;

const DivOptions = styled.div`
    height: 10vh;
    width: 99%;
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
    width: 95%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-items: center;
    background-color: inherit;
    border: 1px dotted red;
`;

const Image = styled.img`
    height: 100%;
    width: 100%;
    border-radius: 30% 30% 0% 0%;
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
    &:hover {
        background-color: #214f62;
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
    border: 2px solid #214f62;
    border-radius: 20%;
    color: white;
    background-color: #214f62;
    cursor: pointer;
    &:hover {
        background-color: white;
        color: #214f62;
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
