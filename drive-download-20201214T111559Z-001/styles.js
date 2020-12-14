import styled from 'styled-components';

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-content: flex-start;
    background-color: inherit;
`;

const Header = styled.div`
    height: 10vh;
    width: 100vw;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    background-color: #214f62;
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
    border-bottom: 2px solid #214f62;
    background-color: inherit;
`;

const TextArea = styled.textarea`
    height: 70%;
    width: 80%;
    margin-top: 20px;
    font-size: 15px;
    resize: none;
    border: 2px solid #214f62;
    border-radius: 10px;
    background-color: inherit;
`;

const Image = styled.img`
    height: 100%;
    width: 10%;
    border-bottom: 1px solid #214f62;
    background-color: white;
`;

const Button = styled.button`
    height: 100%;
    width: 10%;
    background-color: inherit;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: ease background-color 0.3s ;
    &:hover{
        color: #214f62;
        background-color: white;
    }
`;

export {
    Container,
    Header,
    Image,
    Button,
    Main,
    Input,
    TextArea,
    Form,
    FormLeft,
    FormRigth
};
