import React from "react";
// routers
import { RouterApp } from "./routers/RouterApp";

// styles
import "./assets/css/main.css";

// firebase
import { FirebaseContext, firebase } from "./firebase/index";

export const App = () => {
  return (
    <FirebaseContext.Provider value={{ firebase }}>
      <RouterApp />
    </FirebaseContext.Provider>
  );
};
