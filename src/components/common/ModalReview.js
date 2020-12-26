import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Modal, Button, Form, Row, Col, Container } from "react-bootstrap";
import Swal from "sweetalert2";

function ModalReview(props) {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [error, setError] = useState(false);

    const arrayCategories = props.arrayCategories;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.trim() === "" || url.trim() === "" || thumbnail.trim() === "" || categoryName.trim() === "") {
            setError(true);
            Swal.fire({
                icon: 'error',
                html: '<h4>No puede dejar algún campo vacío</h4>',
                timer: 1500,
                showConfirmButton: false
            });
            return;
        // } else if (name.length < 4) {
        //     setError(true);
        //     Swal.fire({
        //         icon: 'error',
        //         title: "El campo debe tener al menos 3 caracteres",
        //         timer: 1500,
        //         showConfirmButton: false
        //     });
        //     return;
        } else {
            const selectCategory = arrayCategories.find(
                (getCategory) => getCategory.name === categoryName
            );
            const category = selectCategory.id;
            const dataToSend = { title, url, thumbnail, category };

            try {
                const urlCategories = "http://localhost:4000/api/reviews";
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
                                    required
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
                                <Form.Text className="text-muted">
                                    Una URL de YouTube tiene esta forma: https://www.youtube.com/embed/[video-id]
                                </Form.Text>
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
                                <Form.Text className="text-muted">
                                    Reemplace la id del video aquí: https://img.youtube.com/vi/[video-id]/maxresdefault.jpg
                                </Form.Text>
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
                                        setCategoryName(e.target.value);
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

export default withRouter(ModalReview);
