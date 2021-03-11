import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from './store/session'
import BasePage from "./components/BasePage/index.js";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      const user = await dispatch(sessionActions.restoreUser())
      if (!user.errors) {
        setLoaded(true);
      }
    })();
  }, [dispatch, setLoaded]);

  if (!loaded) {
    return null;
  }

  return (
    <BasePage/>
  );
}

export default App;
