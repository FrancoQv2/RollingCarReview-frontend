import React, { useState, useEffect, Fragment } from "react";
import { withRouter, useParams } from "react-router-dom";
import { Redirect } from "react-router";
import {
    Container,
    ResponsiveEmbed,
    Button,
    Form,
    Row,
    Col,
    Jumbotron,
} from "react-bootstrap";
import Comment from "./Comment"
import Swal from "sweetalert2";

function ReviewPage(props) {
    const [thisReview, setThisReview] = useState(props.review);
    const [refreshPage, setRefreshPage] = useState(true);
    const [username, setUsername] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState(false);
    
    const { id } = useParams();

    const queryReview = async () => {
        const urlThisReview = "https://rolling-car-review.herokuapp.com/api/reviews/" + id;
        try {
            const getReview = await fetch(urlThisReview);
            const resReview = await getReview.json();
            setThisReview(resReview);
        } catch (err) {
            setError(err);
        }
    };

    useEffect(() => {
        if (refreshPage) {
            queryReview();
            setRefreshPage(false);
        }
    }, [refreshPage]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username.trim() === "" || content.trim() === "") {
            setError(true);
            Swal.fire({
                icon: "error",
                html: "<h4>No puede dejar algún campo vacío</h4>",
                timer: 1500,
                showConfirmButton: false,
            });
            return;
        } else {
            const dataToSend = { username, content };
            try {
                const urlReviews = "https://rolling-car-review.herokuapp.com/api/reviews/" + thisReview._id;
                const header = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dataToSend),
                };
                const result = await fetch(urlReviews, header);
                const resultMsg = await result.json();

                switch (result.status) {
                    case 201:
                        Swal.fire({
                            icon: "success",
                            title: resultMsg.msg,
                            timer: 1500,
                            showConfirmButton: false,
                        });
                        queryReview();
                        props.history.push("/reviews/" + thisReview._id);
                        setUsername("");
                        setContent("");
                        break;
                    case 403:
                        Swal.fire({
                            icon: "warning",
                            title: resultMsg.msg,
                            timer: 1500,
                            showConfirmButton: false,
                        });
                        props.history.push("/");
                        break;
                    default:
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Algo pasó",
                            timer: 1500,
                            showConfirmButton: false,
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

    const deleteReview = async (e) => {
        e.preventDefault();
        const dataToSend = thisReview;
        
        try {
            const urlReviews = "https://rolling-car-review.herokuapp.com/api/reviews/" + thisReview._id;
            const header = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend)
            };
            const result = await fetch(urlReviews, header);
            const resultMsg = await result.json();

            switch (result.status) {
                case 200:
                    Swal.fire({
                        icon: "success",
                        title: resultMsg.msg,
                        timer: 1500,
                        showConfirmButton: false,
                    });
                    localStorage.clear();
                    props.queryCategories();
                    setTimeout(() => {
                        props.history.push("/");
                    }, 1200);
                    break;
                case 404:
                    Swal.fire({
                        icon: "warning",
                        title: resultMsg.msg,
                        timer: 1500,
                        showConfirmButton: false,
                    });
                    props.history.push("/");
                    break;
                default:
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Algo pasó",
                        timer: 1500,
                        showConfirmButton: false,
                    });
                    break;
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Ops...",
                text: "Ocurrió un error, intente nuevamente",
                timer: 2500,
                showConfirmButton: false
            });
            setError(true);
        }
        setError(false);
    };

    return (
        <Fragment>
            <Container>
                <div className="text-center pt-5 pb-2 title-page">
                    <p className="display-3">
                        <b>{thisReview.title}</b>
                    </p>
                </div>
            </Container>
            <Container className="py-5">
                <ResponsiveEmbed aspectRatio="16by9" className="shadow-lg">
                    <embed src={thisReview.url} />
                </ResponsiveEmbed>
            </Container>
            <Container className="py-2">
                <Row>
                    <Col sm={1}>
                        <Button className="shadow" size="sm" variant="dark" disabled>
                            {thisReview.category.name}
                        </Button>
                    </Col>
                    <Col sm={11}>
                        <Button variant="warning" size="sm">
                            <span role="img" aria-label="" onClick={deleteReview}>🗑️</span>
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Jumbotron className="py-3 shadow-sm">
                    <h3 className="pb-2">Déjenos un comentario!</h3>
                    <Form>
                        <Form.Group as={Row} controlId="commentUsername">
                            <Form.Label column sm={2} size="sm">
                                Nombre:
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    size="sm"
                                    placeholder="Ej: ComandanteFort123"
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                    value={username}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="commentContent">
                            <Form.Label column sm={2} size="sm">
                                Mensaje:
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    as="textarea"
                                    size="sm"
                                    placeholder="Escriba aquí su mensaje"
                                    rows={2}
                                    onChange={(e) => {
                                        setContent(e.target.value);
                                    }}
                                    value={content}
                                />
                            </Col>
                        </Form.Group>
                        <Button type="submit" variant="warning" onClick={handleSubmit}>
                            Comentar
                        </Button>
                    </Form>
                </Jumbotron>
            </Container>
            {thisReview.comments.map((oneComment, pos) => {
                return (
                    <Comment 
                        key={pos} 
                        comment={oneComment}
                        index={pos}
                        queryReview={queryReview}
                        idReview={thisReview._id}
                        className="shadow-sm"
                    ></Comment>
                );
            })}
        </Fragment>
    );
}

export default withRouter(ReviewPage);
