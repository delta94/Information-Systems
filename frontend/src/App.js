import React from "react";
import axios from "axios";

import configureStore from "./configureStore";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import "./style/common.css";
import theme from "./theme";
import MainPage from "./pages/main-page/MainPage";
import LoginPage from "./pages/LoginPage";
import { Provider } from "react-redux";

if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost:6002";
}

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <div className="App">
            <Switch>
              <Route path="/login" component={LoginPage} />
              <Route path="/:view?" component={MainPage} />
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
