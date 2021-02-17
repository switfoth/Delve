import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar/NavBar.js";
import AppWrapper from "./components/AppWrapper/index.js"
import { useDispatch } from "react-redux";
import * as sessionActions from './store/session'

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      const user = await dispatch(sessionActions.restoreUser())
      if (!user.errors) {
        setAuthenticated(true);
      }
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
      <AppWrapper>
        <NavBar/>
      </AppWrapper>
  );
}

export default App;
