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
    justify-content: flex-start;
    align-items: flex-start;
    background-color: white;
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

const Button = styled.input`
    border: 2px solid #214f62;
    border-radius: 20%;
    color: #214f62;
    background-color: white;
    cursor: pointer;
    &:hover {
        background-color: #214f62;
        color: white;
    }
`;

const Form = styled.form`
    height: 80%;
    width: 70%;
    background-color: inherit;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: flex-start;
`;

const Element = styled.div`
    height: 20%;
    width: 80%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    background-color: white;
    border: 1px dotted red;
`;

const Main = styled.div`
    height: 90%;
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    background-color: white;
`;

const Input = styled.input`
    height: 10%;
    width: 100%;
    font-size: 20px;
    background-color: inherit;
    border: none;
    border-bottom: 1px solid ${(props) => props.buttonColor};
    &:focus {
        border-bottom: 1px solid lightblue;
    }
`;

const TextArea = styled.textarea`
    height: 30%;
    width: 60vw;
    background-color: #fafafa;
    color: black;
    font-size: 20px;
    resize: none;
    border: none;
    border-bottom: 1px solid ${(props) => props.buttonColor};
`;

export {
    Container,
    Button,
    Title,
    Input,
    DivTest,
    TextArea,
    Main,
    Header,
    Element,
    Form,
};
