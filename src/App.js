import React, { useState, useEffect } from "react";
import "./App.css";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavigationBar from "./components/common/NavigationBar";
import Footer from "./components/common/Footer";
import ReviewPage from "./components/ReviewPage";
import Error404 from "./components/common/Error404";

function App() {
  const [arrayReviews, setArrayReviews] = useState([]);
  const [arrayCategories, setArrayCategories] = useState(true);
  const [refreshReviews, setRefreshReviews] = useState([]);
  const [refreshCategories, setRefreshCategories] = useState(true);

  const queryBackend = async () => {
    try {
      const queryReviews = await fetch(
        "http://localhost:4000/api/reviews"
      );
      const queryCategories= await fetch(
        "http://localhost:4000/api/categorias"
      );

      const resultReviews = await queryReviews.json();
      const resultCategories = await queryCategories.json();

      setArrayReviews(resultReviews);
      setArrayCategories(resultCategories);
    } catch (error) {
      
    }
  };

  useEffect(() => {
    if (refreshReviews || refreshCategories) {
      queryBackend();
      setRefreshReviews(false);
      setRefreshCategories(false);
    }
  }, [refreshReviews, refreshCategories]);

    return (
        <Router>
            <NavigationBar></NavigationBar>
            <Container>
                <div className="text-center py-5">
                    <h1>Hola</h1>
                </div>
            </Container>
            <Switch>
                {/* <Route
                    exact
                    path="/reviews/:id"
                    render={(props) => {
                        const idNoticia = props.match.params.id;
                        const noticiaSelect = listaNoticias.find(
                            (item) => item._id === idNoticia
                        );
                        const noticiasCategoria = listaNoticias.find(
                            (item) =>
                                item.categoriaNoticia ===
                                noticiaSelect.categoriaNoticia
                        );
                        return (
                            <Container className="my-4">
                                <ReviewPage
                                    noticia={noticiaSelect}
                                    noticiasCategoria={noticiasCategoria}
                                    listaNoticias={listaNoticias}
                                ></ReviewPage>
                            </Container>
                        );
                    }}
                ></Route> */}
                <Route>

                </Route>
                <Route exact path="*">
                  <Error404></Error404>
                </Route>
            </Switch>
            <Footer></Footer>
        </Router>
    );
}

export default App;
