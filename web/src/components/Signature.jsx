import React, { Component } from 'react';
import copy from 'copy-to-clipboard';
import Swal from 'sweetalert2';

import { Image, Button } from 'react-bootstrap';
import { Clipboard2CheckFill } from 'react-bootstrap-icons';

import LogoHorizontal from "../assets/images/logotipos/logo-horizontal.png";
import CibaoMix from '../assets/images/logotipos/cibaomix3.png';

class Signature extends Component {

    tableRef = React.createRef();

    copyToClipboard = () => {
        var code = this.tableRef.current.innerHTML;
        copy(code);

        Swal.fire({
            title: 'Firma copiada',
            text: 'La firma fue copiada exitosamente. Ahora puede pegarla en su gestor de correos.',
            icon: 'success',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload();
            }
        });
    };

    render() {
        let data = this.props.data;

        return (
            <>
                <div ref={this.tableRef}>
                    <table cellPadding={0} cellSpacing={0} style={{
                        color: 'rgb(97, 106, 107)'
                    }}>
                        <tbody>
                            <tr>
                                <td rowSpan={4}>
                                    {data.codigo_departamento === 36 ?
                                        (
                                            <Image src={CibaoMix} style={{
                                                marginRight: 10,
                                                marginLeft: 0
                                            }} />

                                        ) : (
                                            <Image src={LogoHorizontal} style={{
                                                marginRight: 10
                                            }} />
                                        )
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p style={{
                                        fontSize: 12,
                                        margin: 0,
                                        padding: 0
                                    }}>
                                        <b>
                                            <span style={{ fontSize: 16 }}>{data.nombre}</span>
                                        </b>
                                        <br />
                                        <b>
                                            <span style={{ fontSize: 10 }}>{data.posicion} - {data.departamento}</span>
                                        </b>
                                        <br />
                                        <b style={{color: '#FFCC00'}}>----------------------------------------------------</b>
                                        <br />
                                        <b>
                                            Tel.: {data.telefono} {data.ext !== '' ? ('Ext.: ' + data.ext) : ''}
                                        </b>
                                        <br />
                                        {data.celular !== '' &&
                                            (
                                                <>
                                                    <b>
                                                        Cel.: {data.celular}
                                                    </b>
                                                    <br />
                                                </>
                                            )
                                        }
                                        {data.email !== '' &&
                                            (
                                                <>
                                                    <b>
                                                        Email.: {data.email}
                                                    </b>
                                                    <br />
                                                </>
                                            )
                                        }
                                        {data.codigo_departamento === 36 ?
                                            (
                                                <b>
                                                    Web: {data.webcm}
                                                </b>

                                            ) : (
                                                <b>
                                                    Web: {data.webcc}
                                                </b>
                                            )
                                        }
                                        <br />
                                        <b>
                                            {data.direccion.length >= 85 ?
                                                (
                                                    data.direccion.substring(0, 51)
                                                ) : (
                                                    data.direccion
                                                )
                                            }
                                        </b>
                                        <br />
                                        <b>
                                            {data.direccion.length >= 85 &&
                                                (
                                                    data.direccion.substring(52, 85)
                                                )
                                            }
                                        </b>
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Button variant='outline-secondary' size="lg" className='w-100 mt-3' onClick={this.copyToClipboard}>
                    <Clipboard2CheckFill size={30} /> <b>Copiar</b>
                </Button>
            </>
        );
    }
};

export default Signature;