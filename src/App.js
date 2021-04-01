import React from "react";
import Start from "./GameComponents/Start";
import { Switch, Route } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import SearchSelection from "./GameComponents/SearchSelection";
import Result from "./GameComponents/Result";

function App() {
  return (
    <div>
      <Header />
      <Switch>
      <Route
          exact
          path="/selections/:choiceNo"
          render={(props) => (
            <SearchSelection key={props.match.params.choiceNo || "empty"} />
          )}
        />
        <Route path="/result">
          <Result />
        </Route>
        <Route path="/">
          <Start />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
