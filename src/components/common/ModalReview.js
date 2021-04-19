import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Modal, Button, Form, Row, Col, Container } from "react-bootstrap";
import Select from 'react-select'
import Swal from "sweetalert2";

const URL_EMBED = "https://www.youtube.com/embed/";
const URL_THUMBNAIL = "https://img.youtube.com/vi/";
const URL_THUMBNAIL_TYPE1 = "/maxresdefault.jpg";


function ModalReview(props) {
    const [title, setTitle] = useState("");
    const [idVideo, setidVideo] = useState("");
    const [categoryName, setCategoryName] = useState({});
    const [error, setError] = useState(false);

    const arrayCategories = props.arrayCategories;
    let optionsCategory = []

    arrayCategories.forEach(category => {
        const categ = { value: category.name, label: category.name }
        optionsCategory.push(categ)
    });
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.trim() === "" || idVideo.trim() === "" || categoryName.value.trim() === "") {
            setError(true);
            Swal.fire({
                icon: 'error',
                html: '<h4>No puede dejar algún campo vacío</h4>',
                timer: 1500,
                showConfirmButton: false
            });
            return;
        } else {
            const selectCategory = arrayCategories.find(
                (getCategory) => getCategory.name === categoryName.value
            );
            const category = selectCategory.id;
            const url = URL_EMBED + idVideo;
            const thumbnail = URL_THUMBNAIL + idVideo + URL_THUMBNAIL_TYPE1;
            const dataToSend = { title, url, thumbnail, category };
            console.log(dataToSend);

            try {
                const urlReviews = "https://rolling-car-review.herokuapp.com/api/reviews";
                const header = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dataToSend)
                };
                const result = await fetch(
                    urlReviews,
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
                                ID Video
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese el ID de un video de YouTube"
                                    onChange={(e) => {
                                        setidVideo(e.target.value);
                                    }}
                                />
                                <Form.Text className="text-muted">
                                    Forma de URL de YouTube: https://www.youtube.com/watch?v=[video-id]&ab_channel=[channel]
                                </Form.Text>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="reviewCategory">
                            <Form.Label column sm={2}>
                                Categoría
                            </Form.Label>
                            <Col sm={10}>
                                <Select 
                                    options={optionsCategory}
                                    placeholder="Seleccione alguna de las siguientes categorías"
                                    autoFocus
                                    isSearchable
                                    onChange={setCategoryName}
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
