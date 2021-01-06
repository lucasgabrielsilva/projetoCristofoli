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
    background-color: white;
`;

const Header = styled.div`
    height: 10%;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    background-color: #003b4d;
`;

const Title = styled.label`
    align-self: auto;
    margin-left: 3%;
    font-size: 200%;
    color: white;
    background-color: inherit;
`;

const Button = styled.input`
    min-height: 40%;
    min-width: 10%;
    border: 1px solid #0f5aa1;
    border-radius: 5px;
    margin: 10px;
    color: white;
    padding: 3px;
    background-color: #0f5aa1;
    cursor: pointer;
    &:hover {
        background-color: white;
        color: #0f5aa1;
    }
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
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    background-color: white;
    opacity: ${(props) => props.opacity};
`;

const Form = styled.form`
    height: 80%;
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    background-color: inherit;
`;

const Fields = styled.form`
    height: 80%;
    width: 100%;
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    background-color: inherit;
`;

const FormLeft = styled.div`
    height: 70%;
    width: 40%;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    background-color: inherit;
`;

const FormRigth = styled.div`
    height: 70%;
    width: 60%;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
    background-color: inherit;
`;

const Input = styled.input`
    height: 10%;
    width: 80%;
    margin-bottom: 2px;
    font-size: 100%;
    border: none;
    border-bottom: 2px solid ${(props) => props.lineColor};
    &:focus {
        border-bottom: 2px solid #0083c1;
    }
    background-color: inherit;
`;

const Select = styled.select`
    height: 10%;
    width: 80%;
    margin-bottom: 2px;
    font-size: 100%;
    border: none;
    border-bottom: 2px solid ${(props) => props.lineColor};
    &:focus {
        border-bottom: 2px solid #0083c1;
    }
    background-color: inherit;
`;

const InputFile = styled.label`
    height: 10%;
    width: 80%;
    margin-bottom: 2px;
    font-size: 100%;
    border: none;
    border-bottom: 2px solid ${(props) => props.lineColor};
    &:focus {
        border-bottom: 2px solid #0083c1;
    }
    background-color: inherit;
`;

const TextArea = styled.textarea`
    height: 90%;
    width: 90%;
    padding: 5px;
    font-size: 15px;
    resize: none;
    border: 2px solid ${(props) => props.lineColor};
    &:focus {
        border: 2px solid #0083c1;
    }
    border-radius: 10px;
    background-color: inherit;
`;

const DivFiles = styled.div`
    height: 10%;
    width: 80%;
    padding: 10px;
    color: #0f5aa1;
`;

const DivButton = styled.div`
    height: 20%;
    width: 20%;
    margin: 5px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    background-color: inherit;
`;

export {
    Container,
    Header,
    Button,
    Select,
    Element,
    Title,
    DivTest,
    Main,
    Input,
    InputFile,
    TextArea,
    Form,
    FormLeft,
    FormRigth,
    Fields,
    DivFiles,
    DivButton,
};
