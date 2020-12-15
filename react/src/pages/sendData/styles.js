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
    height: calc(100% - 10vh);
    width: 100vw;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    background-color: #fafafa;
`;

const Form = styled.form`
    height: 100%;
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
    height: 100%;
    width: 60%;
    display: flex;
    flex-flow: column wrap;
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
    height: 50%;
    width: 80%;
    padding: 5px;
    margin-top: 20px;
    font-size: 15px;
    resize: none;
    border: 2px solid ${(props) => props.lineColor};
    &:focus {
        border: 2px solid #0083c1;
    }
    border-radius: 10px;
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
};
