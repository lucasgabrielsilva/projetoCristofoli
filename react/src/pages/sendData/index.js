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
    DivFiles,
    DivButton,
} from './styles';

function SendData() {
    const handleTest = (data) => {
        let result = true;
        Object.keys(data).forEach((element) => {
            console.log(data[element].size);
            if (data[element].size > 3000000) {
                result = false;
            }
        });
        return result;
    };

    const schema = yup.object().shape({
        name: yup.string().min(3, 'Minimo 3 caracteres').required(),
        serie: yup.string().min(30, 'Número inválido').required(),
        code: yup.number().min(6, 'Código inválido').required(),
        model: yup.string().required(),
        cycle: yup.string().required(),
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
    const [colorModel, setColorModel] = useState('#003B4D');
    const [colorCycle, setColorCycle] = useState('#003B4D');
    const [colorDescription, setColorDescription] = useState('#003B4D');
    const [files, setFiles] = useState([]);
    const [values, setValues] = useState({
        name: null,
        serie: null,
        code: null,
        model: null,
        cycle: null,
        files: null,
        description: null,
    });

    const onSubmit = (data) => {
        setColorName('green');
        setColorSerie('green');
        setColorCode('green');
        setColorFile('green');
        setColorDescription('green');
        setColorModel('green');
        setColorCycle('green');
        data.file = files;
        console.log(data);
        window.api.send('Report', data);
    };

    useEffect(() => {
        if (errors) {
            console.log(errors);
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
            if (errors.model) {
                setColorModel('red');
            }
            if (errors.cycle) {
                setColorCycle('red');
            }
        }
    }, [errors]);

    const handleName = (data) => {
        schema.fields.name.isValid(getValues().name).then((e) => {
            if (e) {
                setColorName('green');
            } else {
                console.log(errors);
            }
        });
    };

    const handleFile = (data) => {
        data.preventDefault();
        schemaFile.isValid(getValues().file).then((e) => {
            if (e) {
                const temp = [];
                Object.keys(data.target.files).forEach((file) => {
                    temp.push(data.target.files[file].path);
                });
                setFiles(temp);
            }
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
                            <Select
                                name="model"
                                ref={register}
                                lineColor={colorModel}
                            >
                                <option value="" disabled selected hidden>
                                    {' '}
                                    Modelo da autoclave{' '}
                                </option>
                                <option value="vdr300"> VDR 3.00 </option>
                                <option value="Modelo"> Modelo 2 </option>
                            </Select>
                            <Select
                                name="cycle"
                                ref={register}
                                lineColor={colorCycle}
                            >
                                <option value="" disabled selected hidden>
                                    {' '}
                                    Ciclo realizado:{' '}
                                </option>
                                <option value="10min"> Ciclo 10min </option>
                                <option value="Modelo"> Ciclo 20min </option>
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
                            <DivFiles>
                                {files ? (
                                    <ul>
                                        {files.map((file) => {
                                            return <li>{file}</li>;
                                        })}
                                    </ul>
                                ) : null}
                            </DivFiles>
                        </FormLeft>
                        <FormRigth>
                            <TextArea
                                name="description"
                                ref={register}
                                placeholder="Descrição:"
                                lineColor={colorDescription}
                            />
                            <DivButton>
                                <Button type="reset" placeholder="Limpar" />
                                <Button type="submit" placeholder="Enviar" />
                            </DivButton>
                        </FormRigth>
                    </Form>
                </Main>
            </DivTest>
        </Container>
    );
}

export default SendData;
