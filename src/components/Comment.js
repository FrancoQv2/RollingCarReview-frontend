import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Jumbotron } from "react-bootstrap";
import CarrouselCategory from "./CarrouselCategory";

function Comment(props) {
    let comment = props.comment;
    let nroComment = props.index + 1;

    return (
        <>
            <Container>
                <Jumbotron className="py-3">
                    <Row>
                        <Col sm={2}><b>#{nroComment} - {comment.username}</b></Col>
                        <Col sm={10}>{comment.content}</Col>
                    </Row>
                </Jumbotron>
            </Container>
        </>
    );
}

export default withRouter(Comment);
