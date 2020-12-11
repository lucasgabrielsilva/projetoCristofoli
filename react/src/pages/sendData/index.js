import React, { useEffect, useState } from 'react';
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
    Button,
    Element,
    Form,
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

    return (
        <Container>
            <MenuBar changeWindow={false} />
            <DivTest>
                <Header>
                    <Title> Reportar </Title>
                </Header>
                <Main>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            type="text"
                            name="name"
                            ref={register}
                            placeholder="Nome"
                            buttonColor={colorName}
                        />
                        {errors.name?.message}
                        <Input
                            type="text"
                            name="email"
                            ref={register}
                            placeholder="E-Mail"
                            buttonColor={colorEmail}
                        />
                        <Input
                            type="file"
                            name="file"
                            ref={register}
                            placeholder="Arquivos"
                            buttonColor={colorFile}
                        />
                        {errors.file?.message}
                        <TextArea
                            placeholder="Descrição"
                            buttonColor={colorName}
                        />
                        <Button type="reset" />
                        <Button type="submit" />
                    </Form>
                </Main>
            </DivTest>
        </Container>
    );
}

export default SendData;
