import React, { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import MenuBar from '../../components/menuBar';
import Dropizone from '../../components/dropzone';

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
    Select,
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
        serie: yup.number().min(30, 'Número inválido').required(),
        code: yup.number().min(6, 'Código inválido').required(),
        description: yup.string().min(20, 'min').required(),
        file: yup
            .mixed()
            .test('Formado do arquivo invalido', (value) => handleTest(value)),
    });

    const schemaFile = yup.mixed().test('teste', (value) => handleTest(value));

    const { register, handleSubmit, getValues, errors } = useForm({
        resolver: yupResolver(schema),
    });

    const [colorName, setColorName] = useState('#003B4D');
    const [colorSerie, setColorSerie] = useState('#003B4D');
    const [colorCode, setColorCode] = useState('#003B4D');
    const [colorFile, setColorFile] = useState('#003B4D');
    const [colorModel, setCololorModel] = useState('#003B4D');
    const [colorCycle, setColorCycle] = useState('#003B4D');
    const [colorDescription, setColorDescription] = useState('#003B4D');

    const onSubmit = (data) => {
        setColorName('green');
        setColorSerie('green');
        setColorCode('green');
        setColorFile('green');
        setColorDescription('green');
        window.api.send('Report', data);
    };

    useEffect(() => {
        if (errors) {
            if (errors.name) {
                setColorName('red');
            }
            if (errors.serie) {
                setColorSerie('red');
            }
            if (errors.code) {
                setColorCode('red');
            }
            if (errors.description) {
                setColorDescription('red');
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

    const handleFile = (data) => {
        data.preventDefault();
        schemaFile
            .isValid(getValues().file)
            .then((value) => {
                console.log(value);
            })
            .catch((error) => {
                console.log(error);
            });
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
                                name="serie"
                                ref={register}
                                placeholder="Número de serie:"
                                lineColor={colorSerie}
                            />
                            <Input
                                type="text"
                                name="code"
                                ref={register}
                                placeholder="Código da assistência:"
                                lineColor={colorCode}
                            />
                            <Select lineColor={colorModel}>
                                <option value="vdr300"> VDR 3.00 </option>
                                <option value="Modelo"> Modelo 2 </option>
                                <option value="Modelo"> Modelo 3 </option>
                                <option value="Modelo"> Modelo 4 </option>
                            </Select>
                            <Select lineColor={colorCycle}>
                                <option value="vdr300"> Ciclo 10min </option>
                                <option value="Modelo"> Ciclo 20min </option>
                                <option value="Modelo"> Ciclo 30min </option>
                                <option value="Modelo"> Modelo 4 </option>
                            </Select>
                            <InputFile lineColor={colorFile}>
                                Anexos:
                                <input
                                    style={{ display: 'none' }}
                                    name="file"
                                    ref={register}
                                    type="file"
                                    multiple
                                    onChange={(e) => handleFile(e)}
                                />
                            </InputFile>
                        </FormLeft>
                        <FormRigth>
                            <TextArea
                                name="description"
                                ref={register}
                                placeholder="Descrição:"
                                lineColor={colorDescription}
                            />
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
