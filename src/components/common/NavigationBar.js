import React, { useState } from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import './NavigationBar.css';
import ModalCategory from './ModalCategory'
import ModalReview from './ModalReview'

const NavigationBar = (props) => {
    const [modalCategoryShow, setModalCategoryShow] = useState(false);
    const [modalReviewShow, setModalReviewShow] = useState(false);

    const arrayCategories = props.arrayCategories;

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top" id="navigationBar">
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src="/logo.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        />
                    Rolling Car Review
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Button className="mx-2 my-2 shadow-sm" variant="warning" size="sm" href="/AdminPage">
                            Admin
                        </Button>
                        <Button className="mx-2 my-2 shadow-sm" variant="warning" size="sm" onClick={() => setModalCategoryShow(true)}>
                            + Categoría
                        </Button>
                        <Button className="mx-2 my-2 shadow-sm" variant="warning" size="sm" onClick={() => setModalReviewShow(true)}>
                            + Review
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <ModalCategory 
                queryCategories={props.queryCategories}
                show={modalCategoryShow} 
                onHide={() => setModalCategoryShow(false)}
            />
            <ModalReview
                arrayCategories={arrayCategories}
                queryCategories={props.queryCategories}
                show={modalReviewShow} 
                onHide={() => setModalReviewShow(false)}
            />
        </>
    );
};

export default withRouter(NavigationBar);
