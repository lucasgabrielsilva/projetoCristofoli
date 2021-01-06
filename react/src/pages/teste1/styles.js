import styled from 'styled-components';

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-flow: column wrap;
    justify-content: flex-start;
    align-content: flex-start;
    background-color: white;
`;

const DivTest = styled.div`
    height: 100%;
    width: calc(100% - 140px);
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
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
    background-color: inherit;
`;

const Title = styled.label`
    align-self: auto;
    margin-left: 3%;
    font-size: 200%;
    color: #0f5aa1;
    background-color: inherit;
`;

const Button = styled.button`
    align-self: auto;
    height: 80%;
    color: white;
    margin: 2px;
    border: none;
    padding: 3px;
    border: 1px solid #0f5aa1;
    background-color: #0f5aa1;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: white;
        color: #0f5aa1;
    }
`;

const ButtonBar = styled.div`
    height: 80%;
    align-self: auto;
    display: flex;
    margin-right: 5px;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
    background-color: inherit;
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
    border-top: 1px dotted black;
`;

const TextArea = styled.textarea`
    height: 100%;
    width: 100%;
    padding-left: 5px;
    background-color: lightgray;
    color: black;
    font-size: 15px;
    resize: none;
`;

const Select = styled.select`
    align-self: auto;
    height: 80%;
    color: white;
    margin: 2px;
    padding: 3px;
    border: 1px solid #0f5aa1;
    background-color: #0f5aa1;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: white;
        color: #0f5aa1;
    }
`;

export {
    Container,
    Button,
    ButtonBar,
    Title,
    DivGraph,
    DivTest,
    TextArea,
    Main,
    Header,
    DivResult,
    Select,
};
