import React, { Component } from "react";
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import Swal from 'sweetalert2';

import { Global } from "./Global";
import Signature from "./Signature";

import { Row, Col, Form, InputGroup, Button, Image } from "react-bootstrap";
import { Check2 } from 'react-bootstrap-icons';

import loading from '../assets/images/resources/cargando3.gif';

class FormControl extends Component {

    fichaRef = React.createRef();
    nombreRef = React.createRef();
    posicionRef = React.createRef();
    departamentoRef = React.createRef();
    extRef = React.createRef();
    celRef = React.createRef();
    emailRef = React.createRef();

    direccionCC = Global.direccionCC;
    direccionVI = Global.direccionVI;
    webcc = Global.web;
    webcm = Global.webcm;
    msn = Global.errorMsn;
    info = null;
    isReadyFirma = false;
    isReadyExtra = false;
    cell = '';
    cellError = '';
    ext = '';
    extError = '';
    isLoading = false;

    constructor(props) {
        super(props);

        this.state = {
            ficha: '',
            nombreDB: '',
            posicionDB: '',
            departamentoDB: '',
            nombre: '',
            condicion: '',
            posicion: '',
            codigo_departamento: '',
            departamento: '',
            telefono: Global.telefono,
            ext: '',
            celular: '',
            email: '',
            webcc: this.webcc,
            webcm: this.webcm,
            direccion: ''
        }

        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este campo es requerido.'
            }
        });
    }

    sendEmail = () => {
        Swal.fire({
            title: 'Error!!',
            text: 'Hubo un error inesperado. Favor contactar a Tecnología...',
            icon: 'error',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload();
            }
        });
    }

    getEntidad = (ficha) => {
        this.isLoading = true;

        setTimeout(async () => {
            await axios.get(process.env.REACT_APP_URL + ficha)
                .then(res => {
                    if (res.status === 200 && res.data.length > 0) {
                        let data = res.data[0];

                        let condicion = data.condicion_empleado;
                        let isActivo = condicion === 'Activo' || condicion === 'Vacaciones' ? true : false;

                        if (isActivo) {
                            this.isReadyExtra = true;

                            var nombreSplit = data.nombre.split(' ');
                            let ns = String(nombreSplit[0]);
                            let nombreDB = ns.charAt(0) + ns.substring(1).toLowerCase();
                            let apellidoDB = '';
                            let posicionDB = data.cargo;
                            let codigoDepartamento = data.codigo_departamento;
                            let departamentoDB = data.departamento;

                            if (nombreSplit.length < 5) {
                                let as1 = String(nombreSplit[1]);
                                let as2 = String(nombreSplit[2])
                                apellidoDB = nombreSplit.length === 3 ? as1.charAt(0) + as1.substring(1).toLowerCase() : as2.charAt(0) + as2.substring(1).toLowerCase();
                            } else {
                                let as3 = String(nombreSplit[3]);
                                apellidoDB = as3.charAt(0) + as3.substring(1).toLowerCase();
                            }

                            let direccion = data.codigo_departamento === 44 || data.codigo_departamento === 110 ? this.direccionVI : this.direccionCC;

                            /*** ---Cargo y departamento letra inicial mayúscula
                            let car = String(data.cargo);
                            let dep = String(data.departamento);
                            cargo = car.charAt(0) + car.substring(1).toLowerCase();
                            departamento = dep.charAt(0) + dep.substring(1).toLowerCase();
                            */

                            this.setState({
                                ficha: data.ficha,
                                nombreDB: nombreDB + ' ' + apellidoDB,
                                posicionDB: posicionDB,
                                codigo_departamento: codigoDepartamento,
                                departamentoDB: departamentoDB,
                                condicion: condicion,
                                direccion: direccion
                            });

                            this.isLoading = false;
                        } else {
                            this.isLoading = false;
                            this.sendEmail();
                        }
                    } else {
                        this.isLoading = false;

                        Swal.fire({
                            title: 'Ficha incorrecta!!',
                            text: 'Por favor, escriba una ficha válida...',
                            icon: 'warning',
                            confirmButtonText: 'Ok'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }
                        });
                    }
                }).catch(error => {
                    this.isLoading = false;

                    Swal.fire({
                        title: 'Error!!',
                        text: 'Ha ocurrido un error con la siguiente referencia: ' + error,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                    });

                });
        }, 2000);
    }

    submit = (e) => {
        e.preventDefault();

        let fichaRef = this.fichaRef.current.value;
        this.getEntidad(fichaRef);
        this.isReadyFirma = false;

        this.validator.showMessages();
        this.forceUpdate();
    }

    submitFirma = (e) => {
        e.preventDefault();

        if (this.validator.allValid()) {
            this.chageState();
            this.isReadyFirma = true;                
        } else {
            this.isReadyFirma = false;
            Swal.fire({
                title: 'Campos requeridos!!',
                text: 'Por favor, complete los campos requeridos para generar su firma...',
                icon: 'warning',
                confirmButtonText: 'Ok'
            });
        }
    }

    chageState = () => {
        if (this.state.celular.length < 14) {
            this.setState({
                celular: ''
            });
        }
        if (this.state.ext.length < 4) {
            this.setState({
                ext: ''
            });
        }

        this.setState({
            nombre: this.nombreRef.current.value,
            posicion: this.posicionRef.current.value,
            departamento: this.departamentoRef.current.value,
            email: this.emailRef.current.value
        });

        this.validator.showMessages();
        this.forceUpdate();
    }

    changeNumber = (event) => {
        let val = event.target.value;
        val = val.substring(0) !== '1' ? val.replace(/[^0-9]/g, '') : '';
        val = val.length > 10 ? val.substring(0, 10) : val;
        this.cell = val;
        this.cellError = this.cell.length > 0 && this.cell.length < 10 ? 'El celular debe tener 10 dígitos' : '';

        let num = `(${this.cell.substring(0, 3)}) ${this.cell.substring(3, 6)}-${this.cell.substring(6, this.cell.length)}`;
        num = num.trim();

        this.setState({
            celular: num
        });
    };

    changeExt = (event) => {
        let val = event.target.value;
        val = val.replace(/[^0-9]/g, '');
        val = val.length > 4 ? val.substring(0, 4) : val;
        this.ext = val;
        this.extError = this.ext.length > 0 && this.ext.length < 4 ? 'La extensión debe tener 4 dígitos' : '';

        this.setState({
            ext: this.ext
        });
    };

    render() {
        return (
            <Row className="d-flex justify-content-center" style={{
                width: '650px'
            }}>
                <Col xs={12} className="p-0">
                    <Form onSubmit={this.submit}>
                        <InputGroup>
                            <Form.Control type="number" placeholder="Ficha:" ref={this.fichaRef} />
                            <Button variant="warning" type="submit">
                                <Check2 size={22} />
                            </Button>
                        </InputGroup>
                    </Form>
                </Col>
                {this.isLoading &&
                    <Col xs={12} className="text-center">
                        <Image src={loading} alt="Loading..." />
                    </Col>
                }
                {this.isReadyExtra === true && !this.isReadyFirma && !this.isLoading &&
                    <Col xs={12} className="text-start" style={{
                        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
                    }}>
                        <Form onSubmit={this.submitFirma}>
                            <hr />
                            <Form.Group className="mb-3">
                                <Form.Label><b>Nombre:</b></Form.Label>
                                <Form.Control type="text" name="nombre" ref={this.nombreRef} onChange={this.chageState} placeholder="Escriba su primer nombre y primer apellido..." size="sm" />
                                <Form.Text className="text-danger">
                                    <b>{this.validator.message('nombre', this.state.nombre, 'required|string')}</b>
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label><b>Posición:</b></Form.Label>
                                <Form.Control type="text" name="posicion" ref={this.posicionRef} onChange={this.chageState} placeholder="Escriba su posición..." size="sm" />
                                <Form.Text className="text-danger">
                                    <b>{this.validator.message('posicion', this.state.posicion, 'required|string')}</b>
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label><b>Departamento:</b></Form.Label>
                                <Form.Control type="text" name="departamento" ref={this.departamentoRef} onChange={this.chageState} placeholder="Escriba el departmento al cual usted pertenece..." size="sm" />
                                <Form.Text className="text-danger">
                                    <b>{this.validator.message('departamento', this.state.departamento, 'required|string')}</b>
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label><b>Email:</b></Form.Label>
                                <Form.Control type="email" ref={this.emailRef} placeholder="Escriba su email corporativo..." size="sm" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label><b>Flota:</b></Form.Label>
                                <Form.Control type="text" name="celular" ref={this.celRef} onChange={this.changeNumber} value={this.cell} placeholder="Escriba su celular. Solo números sin espacios..." size="sm" />
                                <Form.Text className="text-danger">
                                    <b>{this.cellError}</b>
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="my-3">
                                <Form.Label><b>Extensión:</b></Form.Label>
                                <Form.Control type="text" ref={this.extRef} onChange={this.changeExt} value={this.ext} placeholder="Escriba su extensión. Solo números sin espacios ej.: 3010" size="sm" />
                                <Form.Text className="text-danger">
                                    <b>{this.extError}</b>
                                </Form.Text>
                            </Form.Group>
                            <hr />
                            <Button variant="outline-danger" type="submit" className="mb-3" size="sm">
                                <b>Generar Firma</b>
                            </Button>
                        </Form>
                    </Col>
                }
                {this.isReadyFirma &&
                    <Col md={12} className="text-start p-4" style={{
                        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
                    }}>
                        <Signature data={this.state} />
                    </Col>
                }
            </Row>
        );
    }
}

export default FormControl;