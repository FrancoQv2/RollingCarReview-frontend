import React, { useState, useEffect, Fragment } from "react";
import { withRouter, useParams } from "react-router-dom";
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
    
    let oneComment = {};
    const { id } = useParams();

    const queryReview = async () => {
        const urlThisReview = "http://localhost:4000/api/reviews/" + id;
        // const urlThisReview = "http://localhost:4000/api/reviews/" + thisReview._id;
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
                const urlReviews = "http://localhost:4000/api/reviews/" + thisReview._id;
                console.log(urlReviews);
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

    return (
        <Fragment>
            <Container>
                <div className="text-center pt-5 pb-2">
                    <p className="display-3">
                        <b>{thisReview.title}</b>
                    </p>
                </div>
            </Container>
            <Container className="py-5">
                <ResponsiveEmbed aspectRatio="16by9">
                    <embed src={thisReview.url} />
                </ResponsiveEmbed>
            </Container>
            <Container className="py-2">
                <Button size="sm" variant="secondary" disabled>
                    {thisReview.category.name}
                </Button>
            </Container>
            <Container>
                <Jumbotron className="py-3">
                    <h3 className="pb-2">Deje un comentario!</h3>
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
            {thisReview.comments.map((item, pos) => {
                oneComment = item;
                return (
                    <Comment 
                        key={pos} 
                        comment={oneComment}
                        index={pos}
                    ></Comment>
                );
            })}
        </Fragment>
    );
}

export default withRouter(ReviewPage);
