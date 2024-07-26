import React, { Component } from "react";
import { Container, Row, Col, Image } from 'react-bootstrap';
import Form from '../Form';

import logo from '../../assets/images/logotipos/logo.png';

class Home extends Component {
    render() {
        return (
            <Container fluid>
                <Row className="text-center">
                    <Col xs={12} className="p-3">
                        <Image src={logo} className="img img-fluid" />
                        <h1>Generador de Firma para Correo</h1>
                        <p className="text-muted my-0" style={{fontSize: '22px'}}>Por favor, escriba su ficha para generar la firma</p>
                    </Col>
                    <Col xs={12} className="d-flex justify-content-center align-items-center">
                        <Form />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Home;