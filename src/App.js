import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavigationBar from "./components/common/NavigationBar";
import Footer from "./components/common/Footer";
import HomePage from "./components/HomePage";
import ReviewPage from "./components/ReviewPage";
import Error404 from "./components/common/Error404";

function App() {
    const [arrayCategories, setArrayCategories] = useState([]);
    const [arrayReviews, setArrayReviews] = useState([]);
    const [refreshPage, setRefreshPage] = useState(true);
    const [errors, setErrors] = useState(false);

    const queryCategories = async () => {
        const urlCategories = "https://rolling-car-review.herokuapp.com/api/categories";
        try {
            const queryCategories = await fetch(urlCategories);
            const resCategories = await queryCategories.json();
            setArrayCategories(resCategories);
        } catch (err) {
            setErrors(err);
        }
    };

    const queryReviews = async () => {
        const urlReviews = "https://rolling-car-review.herokuapp.com/api/reviews";
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

    return (
        <Router>
            <NavigationBar
                arrayCategories={arrayCategories}
                arrayReviews={arrayReviews}
                queryCategories={queryCategories}
                queryReviews={queryReviews}
            ></NavigationBar>
            <Switch>
                <Route exact path="/">
                    <section className="my-4">
                        <HomePage
                            arrayCategories={arrayCategories}
                            arrayReviews={arrayReviews}
                            queryCategories={queryCategories}
                        ></HomePage>
                    </section>
                </Route>
                <Route
                    exact
                    path="/reviews/:id"
                    render={(props) => {
                        const reviewLS = JSON.parse(localStorage.getItem('localReview'));
                        let existLS = false;
                        if (reviewLS) existLS = true;

                        const reviewId = props.match.params.id;
                        let selectedReview = {};

                        existLS ? (selectedReview = reviewLS) : (selectedReview = arrayReviews.find(
                            (review) => review._id === reviewId
                        ))

                        localStorage.setItem('localReview', JSON.stringify(selectedReview));
                        return (
                            <section className="my-4">
                                <ReviewPage
                                    review={selectedReview}
                                ></ReviewPage>
                            </section>
                        );
                    }}
                ></Route>
                <Route exact path="*">
                    <Error404></Error404>
                </Route>
            </Switch>
            <Footer></Footer>
        </Router>
    );
}

export default App;
