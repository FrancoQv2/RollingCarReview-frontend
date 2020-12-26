import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Container, Image } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../App.css";

function CarrouselCategory(props) {
    const oneCategory = props.category;
    const categoryReviews = oneCategory.reviews;

    const settings = {
        className: "center py-2",
        centerMode: true,
        infinite: oneCategory.reviews.length > 3,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500,
        rows: 1,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ]
    };
    return (
        <Container className="my-4 py-4 px-5 bg-dark carrouselCategory">
            <h1><u>{oneCategory.name}</u></h1>
            <Slider {...settings}>
                {categoryReviews.map((item, pos) => {
                    return (
                        <div key={pos} className="px-3 imgCategory">
                            <Link to={`/reviews/${item._id}`}>
                                <Image src={item.thumbnail} title={item.title} alt={"imgReview" + pos} thumbnail/>
                            </Link>
                        </div>
                    );
                })}
            </Slider>
        </Container>
    );
}

export default withRouter(CarrouselCategory);
