import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import MenuBar from '../../components/menuBar';

import {
    Container,
    DivTest,
    Main,
    TextArea,
    Input,
    InputFile,
    Form,
    Fields,
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
            if (data[element].size > 3000000) {
                result = false;
            }
        });
        return result;
    };

    const schema = yup.object().shape({
        name: yup.string().min(3, 'Minimo 3 caracteres').required(),
        serie: yup
            .string()
            .matches(/^[0-9]+$/, 'Código inválido')
            .min(6, 'Código inválido')
            .required(),
        code: yup
            .string()
            .matches(/^[0-9]+$/, 'Código inválido')
            .min(30, 'Código inválido')
            .required(),
        model: yup.string().required('Selecione uma opção'),
        cycle: yup.string().required('Selecione uma opção'),
        description: yup.string().min(20, 'Minimo 20 caracteres').required(),
        file: yup
            .mixed()
            .test('Arquivo deve ter no maximo 3mb', (value) =>
                handleTest(value),
            ),
    });

    const { register, handleSubmit, reset, getValues, errors } = useForm({
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
    const [opacity, setOpacity] = useState(1);
    const [sending, setSending] = useState(false);

    const handleReport = (data) => {
        window.api.stop('report');
        setOpacity(1);
        setSending(false);
        setFiles([]);
        reset();
        setColorName('#003b4d');
        setColorSerie('#003b4d');
        setColorCode('#003b4d');
        setColorFile('#003b4d');
        setColorModel('#003b4d');
        setColorCycle('#003b4d');
        setColorDescription('#003b4d');
    };

    const onSubmit = (data) => {
        data.file = files;
        setSending(true);
        setOpacity(0.5);
        window.api.send('Report', data);
        window.api.receive('report', handleReport);
    };

    const handleName = (data) => {
        schema.fields.name.isValid(getValues().name).then((e) => {
            if (e) {
                setColorName('green');
            } else {
                setColorName('red');
            }
        });
    };

    const handleSerie = (data) => {
        schema.fields.serie.isValid(getValues().serie).then((e) => {
            if (e) {
                setColorSerie('green');
            } else {
                setColorSerie('red');
            }
        });
    };

    const handleCode = (data) => {
        schema.fields.code.isValid(getValues().code).then((e) => {
            if (e) {
                setColorCode('green');
            } else {
                setColorCode('red');
            }
        });
    };

    const handleModel = (data) => {
        schema.fields.model.isValid(getValues().model).then((e) => {
            if (e) {
                setColorModel('green');
            } else {
                setColorModel('red');
            }
        });
    };

    const handleCycle = (data) => {
        schema.fields.cycle.isValid(getValues().cycle).then((e) => {
            if (e) {
                setColorCycle('green');
            } else {
                setColorCycle('red');
            }
        });
    };

    const handleDescription = (data) => {
        schema.fields.description.isValid(getValues().description).then((e) => {
            if (e) {
                setColorDescription('green');
            } else {
                setColorDescription('red');
            }
        });
    };

    const handleFile = (data) => {
        data.preventDefault();
        schema.fields.file.isValid(getValues().file).then((e) => {
            if (e) {
                const temp = [];
                Object.keys(data.target.files).forEach((file) => {
                    temp.push(data.target.files[file].path);
                });
                setFiles(temp);
                errors.file = null;
                setColorFile('green');
            } else {
                setFiles([]);
                errors.file.message = 'Todos os arquivos devem ter até 3MB';
                setColorFile('red');
            }
        });
    };

    const handleReset = (event) => {
        event.preventDefault();
        setFiles([]);
        reset();
    }

    return (
        <Container>
            <MenuBar changeWindow={false} />
            <DivTest>
                <Main opacity={opacity}>
                    {sending ? (
                        <label style={{ color: '#003b4d', fontSize: '28px' }}>
                            Enviando Mensagem...
                        </label>
                    ) : (
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Fields>
                                <FormLeft>
                                    <Input
                                        type="text"
                                        name="name"
                                        onBlur={handleName}
                                        ref={register}
                                        placeholder="Nome:"
                                        lineColor={colorName}
                                    />
                                    {errors ? (
                                        <label style={{ backgroundColor: 'inherit', color: 'red' }}>
                                            {errors.name?.message}
                                        </label>
                                    ) : null}
                                    <Input
                                        type="text"
                                        name="serie"
                                        onBlur={handleSerie}
                                        ref={register}
                                        placeholder="Número de serie:"
                                        lineColor={colorSerie}
                                    />
                                    {errors ? (
                                        <label style={{ backgroundColor: 'inherit', color: 'red' }}>
                                            {errors.serie?.message}
                                        </label>
                                    ) : null}
                                    <Input
                                        type="text"
                                        name="code"
                                        onBlur={handleCode}
                                        ref={register}
                                        placeholder="Código da assistência:"
                                        lineColor={colorCode}
                                    />
                                    {errors ? (
                                        <label style={{ backgroundColor: 'inherit', color: 'red' }}>
                                            {errors.code?.message}
                                        </label>
                                    ) : null}
                                    <Select
                                        name="model"
                                        onBlur={handleModel}
                                        ref={register}
                                        lineColor={colorModel}
                                    >
                                        <option
                                            value=""
                                            disabled
                                            selected
                                            hidden
                                        >
                                            {' '}
                                            Modelo da autoclave{' '}
                                        </option>
                                        <option value="vdr300">
                                            {' '}
                                            VDR 3.00{' '}
                                        </option>
                                        <option value="Modelo">
                                            {' '}
                                            Modelo 2{' '}
                                        </option>
                                    </Select>
                                    {errors ? (
                                        <label style={{ backgroundColor: 'inherit', color: 'red' }}>
                                            {errors.model?.message}
                                        </label>
                                    ) : null}
                                    <Select
                                        name="cycle"
                                        onBlur={handleCycle}
                                        ref={register}
                                        lineColor={colorCycle}
                                    >
                                        <option
                                            value=""
                                            disabled
                                            selected
                                            hidden
                                        >
                                            {' '}
                                            Ciclo realizado:{' '}
                                        </option>
                                        <option value="10min">
                                            {' '}
                                            Ciclo 10min{' '}
                                        </option>
                                        <option value="Modelo">
                                            {' '}
                                            Ciclo 20min{' '}
                                        </option>
                                    </Select>
                                    {errors ? (
                                        <label style={{ backgroundColor: 'inherit', color: 'red' }}>
                                            {errors.cycle?.message}
                                        </label>
                                    ) : null}
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
                                    {errors ? (
                                        <label style={{ backgroundColor: 'inherit', color: 'red' }}>
                                            {errors.file?.message}
                                        </label>
                                    ) : null}
                                    <DivFiles>
                                        {files ? (
                                            <ul style={{backgroundColor: 'white'}}>
                                                {files.map((file) => {
                                                    return <li style={{backgroundColor: 'white'}}>{file}</li>;
                                                })}
                                            </ul>
                                        ) : null}
                                    </DivFiles>
                                </FormLeft>
                                <FormRigth>
                                    <TextArea
                                        name="description"
                                        onBlur={handleDescription}
                                        ref={register}
                                        placeholder="Descrição:"
                                        lineColor={colorDescription}
                                    />
                                    {errors ? (
                                        <label style={{ backgroundColor: 'inherit', color: 'red' }}>
                                            {errors.description?.message}
                                        </label>
                                    ) : null}
                                </FormRigth>
                            </Fields>
                            <DivButton>
                                <Button onClick={handleReset} ref={register} type="reset" />
                                <Button ref={register} type="submit" />
                            </DivButton>
                        </Form>
                    )}
                </Main>
            </DivTest>
        </Container>
    );
}

export default SendData;
