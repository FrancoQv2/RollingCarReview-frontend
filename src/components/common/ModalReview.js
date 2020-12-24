import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Modal, Button, Form, Row, Col, Container } from "react-bootstrap";

function ModalReview(props) {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [category, setCategory] = useState("");
    const [error, setError] = useState(false);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Agregar Review
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Container>
                    <Form>
                        <Form.Group as={Row} controlId="reviewTitle">
                            <Form.Label column sm={2}>
                                Título
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    placeholder="Ej: Ford EcoSport 2020"
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                    }}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="reviewUrl">
                            <Form.Label column sm={2}>
                                URL
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese una URL de YouTube"
                                    onChange={(e) => {
                                        setUrl(e.target.value);
                                    }}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="reviewThumbnail">
                            <Form.Label column sm={2}>
                                Miniatura
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    placeholder="Utilice el ID del video de YouTube"
                                    onChange={(e) => {
                                        setThumbnail(e.target.value);
                                    }}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="reviewCategory">
                            <Form.Label column sm={2}>
                                Categoría
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
                    </Form>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default withRouter(ModalReview);
