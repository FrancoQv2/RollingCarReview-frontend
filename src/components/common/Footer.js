import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
    return (
        <div className="bg-dark position justify-content-center align-items-center">
            <Container>
                <Row>
                    <Col sm={4}>
                        <p className="text-left text-white py-3 mb-0">
                            <b>Rolling Code School</b> - Quevedo, Franco
                        </p>
                    </Col>
                    <Col sm={8}>
                        <p className="text-right text-white py-3 mb-0">
                            &copy; 2020 Todos los derechos reservados.
                        </p>
                    </Col>
                </Row>

            </Container>
        </div>
    );
};

export default Footer;
