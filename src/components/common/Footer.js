import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
    return (
        <div className="bg-dark position justify-content-center align-items-center" fixed="bottom">
            <Container>
                <p className="text-center text-white py-3">
                    &copy; 2020 Todos los derechos reservados.
                </p>
            </Container>
        </div>
    );
};

export default Footer;
