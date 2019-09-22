import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Search from "./pages/Search";
import { Container} from "./components/Grid"
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Container>

        <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/books/:id" component={null} />
          <Route component={null} />
        </Switch>

          </Container>
        </Router>
      </div>
    
      );
    }
}

export default App;
