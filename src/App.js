import React, { useState, useEffect } from "react";
import "./App.css";
// import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavigationBar from "./components/common/NavigationBar";
import Footer from "./components/common/Footer";
import HomePage from "./components/HomePage";
import ReviewPage from "./components/ReviewPage";
// import Error404 from "./components/common/Error404";

function App() {
    const [arrayCategories, setArrayCategories] = useState([]);
    const [arrayReviews, setArrayReviews] = useState([]);
    const [refreshPage, setRefreshPage] = useState(true);
    const [errors, setErrors] = useState(false);

    const queryCategories = async () => {
        const urlCategories = "http://localhost:4000/api/categories";
        try {
            const queryCategories = await fetch(urlCategories);
            const resCategories = await queryCategories.json();
            setArrayCategories(resCategories);
        } catch (err) {
            setErrors(err);
        }
    };

    const queryReviews = async () => {
        const urlReviews = "http://localhost:4000/api/reviews";
        try {
            const queryReviews = await fetch(urlReviews);
            const resReviews = await queryReviews.json();
            setArrayReviews(resReviews);
        } catch (err) {
            setErrors(err);
        }
    };

    useEffect(() => {
        if (refreshPage) {
            queryCategories();
            queryReviews();
            setRefreshPage(false);
        }
    }, [refreshPage]);

    // console.log("***************** En App");
    // console.log(arrayCategories);
    // console.log(arrayReviews);
    // console.log(refreshPage);

    return (
        <Router>
            <NavigationBar
                arrayCategories={arrayCategories}
                queryCategories={queryCategories}
            ></NavigationBar>
            <Switch>
                <Route exact path="/">
                    <section className="my-4">
                        <HomePage
                            arrayCategories={arrayCategories}
                            arrayReviews={arrayReviews}
                        ></HomePage>
                    </section>
                </Route>
                <Route
                    exact
                    path="/reviews/:id"
                    render={(props) => {
                        const reviewId = props.match.params.id;
                        console.log(reviewId);

                        const selectReview = arrayReviews.find(
                            (review) => review.name === reviewId
                        );
                        console.log(selectReview);
                        return (
                            <section className="my-4">
                                <ReviewPage
                                    review={selectReview}
                                    arrayReviews={arrayReviews}
                                    queryReviews={queryReviews}
                                ></ReviewPage>
                            </section>
                        );
                    }}
                ></Route>
                {/* <Route exact path="*">
                    <Error404></Error404>
                </Route> */}
            </Switch>
            <Footer></Footer>
        </Router>
    );
}

export default App;
