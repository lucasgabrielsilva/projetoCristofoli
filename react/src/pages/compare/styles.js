import styled from 'styled-components';

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-flow: column wrap;
    justify-content: flex-start;
    align-content: flex-start;
    background-color: #fafafa;
`;

const DivTest = styled.div`
    height: 100%;
    width: calc(100% - 120px);
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: flex-start;
    background-color: inherit;
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

const Button = styled.button`
    align-self: auto;
    height: 70%;
    color: white;
    margin: 2px;
    padding: 2px;
    border: 2px solid white;
    background-color: inherit;
    border-radius: 20%;
    cursor: pointer;
    &:hover {
        background-color: white;
        color: black;
    }
`;

const ButtonBar = styled.div`
    height: 80%;
    align-self: auto;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
    background-color: inherit;
`;

const DivZoom = styled.div`
    height: 70%;
    display: grid;
    grid-template-columns: 20% 60% 20%;
    grid-template-rows: 32% 36% 32%;
    gap: 2px;
    border: 2px solid white;
    border-radius: 20%;
    background-color: inherit;
`;

const ButtonLeft = styled.button`
    border: none;
    grid-column: 1 / 2;
    grid-row: 2 / 3;
    justify-self: auto;
    align-self: auto;
    background-color: inherit;
    color: white;
    border-radius: 20%;
    cursor: pointer;
    &:hover {
        background-color: white;
        color: black;
    }
`;

const ButtonRight = styled.button`
    border: none;
    grid-column: 3 / 4;
    grid-row: 2 / 3;
    justify-self: auto;
    align-self: auto;
    background-color: inherit;
    color: white;
    border-radius: 20%;
    cursor: pointer;
    &:hover {
        background-color: white;
        color: black;
    }
`;

const ButtonUp = styled.button`
    border: none;
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    justify-self: auto;
    align-self: auto;
    color: white;
    background-color: inherit;
    border-radius: 20%;
    cursor: pointer;
    &:hover {
        background-color: white;
        color: black;
    }
`;

const ButtonDown = styled.button`
    border: none;
    grid-column: 2 / 3;
    grid-row: 3 / 4;
    justify-self: auto;
    align-self: auto;
    background-color: inherit;
    color: white;
    cursor: pointer;
    &:hover {
        background-color: white;
        color: black;
    }
`;

const ButtonText = styled.button`
    border: none;
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    justify-self: auto;
    align-self: auto;
    color: white;
    background-color: inherit;
    border-radius: 20%;
    cursor: pointer;
    &:hover {
        background-color: white;
        color: black;
    }
`;

const Main = styled.div`
    height: 90%;
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: flex-start;
    background-color: inherit;
`;

const DivGraph = styled.div`
    height: 85%;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    background-color: inherit;
`;

const DivResult = styled.div`
    height: 15%;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    border-top: 1px solid black;
    background-color: lightgray;
`;

const TextArea = styled.textarea`
    height: 100%;
    width: 50%;
    background-color: inherit;
    color: black;
    font-size: 15px;
    overflow-y: scroll;
    resize: none;
`;

const Select = styled.select`
    align-self: auto;
    height: 70%;
    color: white;
    margin: 2px;
    padding: 2px;
    border: 2px solid white;
    background-color: inherit;
    border-radius: 20%;
    cursor: pointer;
    &:hover {
        background-color: white;
        color: black;
    }
`;

export {
    Container,
    Button,
    ButtonBar,
    DivZoom,
    ButtonLeft,
    ButtonRight,
    ButtonUp,
    ButtonDown,
    ButtonText,
    Title,
    DivGraph,
    Select,
    DivTest,
    TextArea,
    Main,
    Header,
    DivResult,
};
