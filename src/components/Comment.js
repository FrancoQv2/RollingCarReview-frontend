import React, { useState, useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Jumbotron, Button } from "react-bootstrap";
import Swal from "sweetalert2";

function Comment(props) {
    const [comment, setComment] = useState(props.comment);
    const [error, setError] = useState(false);

    const handleClick = async (e) => {
        e.preventDefault();
        const dataToSend = comment;

        try {
            const urlReviews = "https://rolling-car-review.herokuapp.com/api/comments/" + comment._id;
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
                    props.queryReview();
                    props.history.push("/reviews/" + props.idReview);
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
            Swal.fire(
                "Ops...",
                "Ocurrió un error, intente nuevamente",
                "error"
            );
            setError(true);
        }
        setError(false);
    };

    return (
        <>
            <Container>
                <Jumbotron className="py-3">
                    <Row>
                        <Col sm={2}><b>#{props.index} - {comment.username}</b></Col>
                        <Col sm={9}>{comment.content}</Col>
                        <Col sm={1}>
                            <Button variant="danger" size="sm" onClick={handleClick}>
                                <span role="img" aria-label="">🗑️</span>
                            </Button>
                        </Col>
                    </Row>
                </Jumbotron>
            </Container>
        </>
    );
}

export default withRouter(Comment);
