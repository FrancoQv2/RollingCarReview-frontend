import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import CarrouselCategory from "./CarrouselCategory";

function HomePage(props) {
    let arrayCategories = props.arrayCategories;

    return (
        <Fragment>
            <Container>
                <div className="text-center py-5">
                    <p className="display-3 title-page">
                        <b><u>Reviews Principales</u></b>
                    </p>
                </div>
            </Container>
            {localStorage.clear()}
            {arrayCategories.map((oneCategory, pos) => {
                return (
                    <CarrouselCategory
                        key={pos}
                        category={oneCategory}
                    ></CarrouselCategory>
                );
            })}
        </Fragment>
    );
}

export default withRouter(HomePage);
