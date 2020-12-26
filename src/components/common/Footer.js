import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
    return (
        <div className="bg-dark position justify-content-center align-items-center mt-5">
            <Container>
                <p className="text-center text-white py-3 mb-0">
                    &copy; 2020 Todos los derechos reservados.
                </p>
            </Container>
        </div>
    );
};

export default Footer;
