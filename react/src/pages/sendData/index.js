import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import MenuBar from '../../components/menuBar';

import {
    Container,
    Title,
    Header,
    DivTest,
    Main,
    TextArea,
    Input,
    InputFile,
    Drop,
    Form,
    FormLeft,
    FormRigth,
    Button,
} from './styles';

function SendData() {
    const handleTest = (data) => {
        let result = true;
        Object.keys(data).forEach((element) => {
            if (data[element].type !== 'text/csv') {
                result = false;
            }
        });
        return result;
    };

    const schema = yup.object().shape({
        name: yup.string().min(3, 'Minimo 3 caracteres').required(),
        email: yup.string().email().required(),
        file: yup
            .mixed()
            .test('Formado do arquivo invalido', (value) => handleTest(value)),
    });

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    });

    const [colorName, setColorName] = useState('#214f62');
    const [colorEmail, setColorEmail] = useState('#214f62');
    const [colorFile, setColorFile] = useState('#214f62');

    const onSubmit = (data) => {
        setColorName('green');
        setColorEmail('green');
        setColorFile('green');
        console.log(data);
        window.api.send('Report', data);
    };

    useEffect(() => {
        if (errors) {
            if (errors.name) {
                setColorName('red');
            }
            if (errors.email) {
                setColorEmail('red');
            }
            if (errors.file) {
                setColorFile('red');
            }
        }
    }, [errors]);

    const handleTeste = (data) => {
        data.preventDefault();
        console.log(getInputProps());
    };

    return (
        <Container>
            <MenuBar changeWindow={false} />
            <DivTest>
                <Header>
                    <Title> Reportar </Title>
                </Header>
                <Main>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormLeft>
                            <Input
                                type="text"
                                name="name"
                                ref={register}
                                placeholder="Nome:"
                                lineColor={colorName}
                            />
                            <Input
                                type="text"
                                name="email"
                                ref={register}
                                placeholder="E-Mail:"
                                lineColor={colorEmail}
                            />
                            <TextArea placeholder="Descrição:" />
                        </FormLeft>
                        <FormRigth>
                            <label>
                                Anexos: <InputFile type="file" />
                            </label>
                            <Button type="reset" placeholder="Limpar" />
                            <Button type="submit" placeholder="Enviar" />
                        </FormRigth>
                    </Form>
                </Main>
            </DivTest>
        </Container>
    );
}

export default SendData;
