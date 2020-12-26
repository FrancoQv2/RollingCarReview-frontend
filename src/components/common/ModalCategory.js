import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Modal, Button, Form, Row, Col, Container } from "react-bootstrap";
import Swal from "sweetalert2";

function ModalCategory(props) {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.trim() === "") {
            setError(true);
            Swal.fire({
                icon: 'error',
                title: "El campo no puede estar vacío",
                timer: 1500,
                showConfirmButton: false
            });
            return;
        } else if (name.length < 4) {
            setError(true);
            Swal.fire({
                icon: 'error',
                title: "El campo debe tener al menos 3 caracteres",
                timer: 1500,
                showConfirmButton: false
            });
            return;
        } else {
            const dataToSend = { name };
            try {
                const urlCategories = "http://localhost:4000/api/categories";
                const header = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dataToSend)
                };
                const result = await fetch(
                    urlCategories,
                    header
                );
                const resultMsg = await result.json()

                switch (result.status) {
                    case 201:
                        Swal.fire({
                            icon: 'success',
                            title: resultMsg.msg,
                            timer: 1500,
                            showConfirmButton: false
                        });
                        props.queryCategories();
                        props.history.push("/");
                        break;
                    case 403:
                        Swal.fire({
                            icon: 'warning',
                            title: resultMsg.msg,
                            timer: 1500,
                            showConfirmButton: false
                        });
                        props.history.push("/");
                        break;
                    default:
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Algo pasó',
                            timer: 1500,
                            showConfirmButton: false
                        });
                        break;
                }
            } catch (error) {
                Swal.fire(
                    "Ops...",
                    "Ocurrió un error, intente nuevamente",
                    "error"
                );
                setError(true);
            }
        }
        setError(false);
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Agregar Categoría
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Form>
                        <Form.Group as={Row} controlId="formCategoria">
                            <Form.Label column sm={2}>
                                Nombre
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    placeholder="Ej: Ford"
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="warning" onClick={handleSubmit}>
                    Agregar
                </Button>
                <Button variant="warning" onClick={props.onHide}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default withRouter(ModalCategory);
