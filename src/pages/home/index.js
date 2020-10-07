import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { NewUser, InputText, InputButton } from './styles'
import { Form } from '@unform/web';
import Input from '../../components/form/input';
import { Api } from '../../config/Api';
import * as Yup from 'yup';

export default function User() {
    const formRef = useRef(null)

    const [users, setUser] = useState([])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${Api.url}users`);

            const data = await response.json();

            setUser(data)

        }
        fetchData();
    }, []);



    async function handleSubmit(data) {
        try {
            const schema = Yup.object().shape({
                username: Yup.string().required('O nome é obrigatório'),
                email: Yup.string()
                    .email('Digite um e-mail válido')
                    .required('O e-mail é obrigatório'),
                password: Yup.string()
                    .min(6, 'No mínimo 6 caracterer')
                    .required('A senha é obrigatória'),
            });
            await schema.validate(data, {
                abortEarly: false,
            });
            // Validation passed
            console.log(data);

            await fetch(`${Api.url}users`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            setUser([...users, data])

            formRef.current.setErrors({});
        } catch (err) {
            const validationErrors = {};

            if (err instanceof Yup.ValidationError) {
                err.inner.forEach(error => {
                    validationErrors[error.path] = error.message;
                });
                formRef.current.setErrors(validationErrors);
            }
        }
    }


    return (
        <>
            <Container>
                <h1>Usuários</h1>
                <Form ref={formRef}
                    onSubmit={handleSubmit}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: '30px',
                        alignItems: 'center'
                    }}>
                    <Input type="text" name="username" placeholder="Nome" />
                    <Input type="email" name="email" placeholder="E-mail" />
                    <Input type="password" name="password" placeholder="Senha" />
                    <button type="submit" style={
                        {
                            backgroundColor: 'rgb(138, 5, 190)',
                            border: 0,
                            borderRadius: '8px',
                            width: '50%',
                            height: '35px',
                            color: '#ffffff',
                            marginTop: '15px'
                        }
                    } >Register</button>
                </Form>
                {users.map(u =>
                    <Row style={
                        {
                            backgroundColor: 'rgb(138, 5, 190)',
                            height: '40px',
                            marginTop: '3px',
                            borderRadius: '5px',
                            color: '#ffffff',
                            alignItems: 'center'
                        }}>
                        <Col sm={6}> {u.username} </Col>
                        <Col sm={6}> {u.email} </Col>
                    </Row>
                )}
            </Container>
        </>
    )
}

