import Home from "./pages/homePage/Home";
import Navbar from "./components/navbar/Navbar";
import Register from "./pages/authPages/Register";
import Login from "./pages/authPages/Login";
import useAutoLogin from "./hooks/useAutoLogin";
import { Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./App.css";

const App = (): JSX.Element => {
  const [tryLogin, setTryLogin] = useState(true);
  const autoLogin = useAutoLogin();
  const isLoggedIn = useSelector(
    (state: { authReducer: { login: boolean } }): boolean =>
      state.authReducer.login
  );

  useEffect((): void => {
    //Check if user have a token before loading the page
    (async () => {
      let status = await autoLogin();
      if (!status) setTryLogin(false);
    })();
  }, []);

  useEffect((): void => {
    //Check if user just logged in before loading the page
    if (isLoggedIn && tryLogin) setTryLogin(false);
  }, [isLoggedIn]);

  return (
    <div className="main-div">
      {!tryLogin && (
        <div>
          <Navbar />
          <div style={{ marginTop: "5rem" }}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
            </Switch>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
