import React from 'react';
import { Container, Header, Button, Image, Main, Input, TextArea, Form, FormLeft, FormRigth} from "./styles";

import Logo from "../../assets/cristofoli.png";

function Home() {
    
    return (
        <Container>
            <Header>
                <Image src={Logo} alt="logo da cristofoli"/>
                <Button> Analisar </Button>
                <Button> Comparar </Button>
                <Button> DataLogger </Button>
                <Button> Reportar </Button>
                <Button> Sair </Button>
            </Header>
            <Main>
                <Form>
                    <FormLeft>
                        <Input type={"text"} placeholder={"Nome:"} />
                        <Input type={"email"} placeholder={"E-Mail:"} />
                            <TextArea/>
                    </FormLeft>
                    <FormRigth>
                        <TextArea placeholder={"Arquivos"} />
                    </FormRigth>
                </Form>
            </Main>
        </Container>
    );
}

export default Home;
