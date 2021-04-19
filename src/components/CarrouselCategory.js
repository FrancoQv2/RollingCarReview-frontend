import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { Container, Image, Row, Col, Button } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Swal from "sweetalert2";
import "../App.css";

function CarrouselCategory(props) {
    const [error, setError] = useState(false);

    const oneCategory = props.category;
    const categoryReviews = oneCategory.reviews;

    const deleteCategory = async (e) => {
        e.preventDefault();
        const dataToSend = oneCategory;
        
        try {
            const urlReviews = "https://rolling-car-review.herokuapp.com/api/categories/" + oneCategory.id;
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
                    props.queryCategories();
                    props.history.push("/");
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
        <Container className="my-4 py-3 px-5 bg-dark carrouselCategory shadow-lg">
            <Row>
                <Col sm={11}>
                    <h1 className="title-category">{oneCategory.name}</h1>
                </Col>
                <Col sm={1}>
                    <Button variant="danger" size="sm">
                        <span role="img" aria-label="" onClick={deleteCategory}>🗑️</span>
                    </Button>
                </Col>
            </Row>
            <Slider {...settings}>
                {categoryReviews.map((review, pos) => {
                    return (
                        <div key={pos} className="px-3 imgCategory">
                            <Link to={`/reviews/${review._id}`}>
                                <Image src={review.thumbnail} title={review.title} alt={"imgReview" + pos} thumbnail/>
                            </Link>
                        </div>
                    );
                })}
            </Slider>
        </Container>
    );
}

export default withRouter(CarrouselCategory);
