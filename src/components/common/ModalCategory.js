import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Modal, Button, Form, Row, Col, Container } from "react-bootstrap";
import Swal from "sweetalert2";

function ModalCategory(props) {
    const [category, setCategory] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (category.trim() === "") {
            setError(true);
            return;
        } else {
            try {
                const header = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(category),
                };
                const result = await fetch(
                    `http://localhost:4000/api/categories`,
                    header
                );

                switch (result.status) {
                    case 201:
                        props.history.push("/");
                        break;
                    case 400:
                        props.history.push("/");
                        break;
                    case 404:
                        Swal.fire("Error", "Algo no encontrado", "error");
                        break;
                    default:
                        Swal.fire(
                            "Error",
                            "Usuario o contraseña incorrecta",
                            "error"
                        );
                        break;
                }
            } catch (error) {
                Swal.fire(
                    "Ops...",
                    "Ocurrió un error, intente nuevamente",
                    "error"
                );
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
                                        setCategory(e.target.value);
                                    }}
                                />
                            </Col>
                        </Form.Group>
                        {/* <Form.Group as={Row} className="justify-content-end">
                            <Col sm={{ span: 10, offset: 2 }}>
                                <Button variant="warning" type="submit" onClick={props.onHide}>Agregar</Button>
                            </Col>
                            <Col sm={{ span: 10, offset: 2 }}>
                                <Button variant="warning" onClick={props.onHide}>Cerrar</Button>
                            </Col>
                        </Form.Group> */}
                    </Form>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="warning" type="submit" onClick={handleSubmit}>
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
