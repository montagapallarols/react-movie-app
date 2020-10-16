import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import DiscoverMoviesPage from "./pages/DiscoverMoviesPage";
import NavBar from "./components/NavBar";
import MovieDetails from "./components/MovieDetails";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar className="nav" />
      </header>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route
          exact
          path="/discover/:searchtext?"
          component={DiscoverMoviesPage}
        />
        <Route path="/about" component={AboutPage} />
        <Route path="/movie/:imdbID" component={MovieDetails} />
      </Switch>
    </div>
  );
}

export default App;
