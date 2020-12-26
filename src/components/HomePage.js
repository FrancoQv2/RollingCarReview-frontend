import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import CarrouselCategory from "./CarrouselCategory";

function HomePage(props) {
  let arrayCategories = props.arrayCategories;
  
  let oneCategory = {};

    return (
        <Fragment>
            <Container>
                <div className="text-center py-5">
                    <p className="display-3"><b>Reviews Principales</b></p>
                </div>
            </Container>
            {arrayCategories.map((item, pos) => {
              oneCategory = item;
              return (
                <CarrouselCategory
                  key={pos}
                  category={oneCategory}
                ></CarrouselCategory>
              )
            })}
        </Fragment>
    );
}

export default withRouter(HomePage);
