import React from "react";
// Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// components
import { SidebarComponent } from "../components/ui/SidebarComponent";
//views
import { MenuScreen } from "../views/MenuScreen";
import { NuevoPlatillo } from "../views/NuevoPlatillo";
import { OrdenesScreen } from "../views/OrdenesScreen";

export const RouterApp = () => {
  return (
    <section className="md:flex min-h-screen">
      <Router>
        <SidebarComponent />
        <div className="md:w-3/5 xl:w-4/5 p-6">
          <Switch>
            <Route exact path="/">
              <OrdenesScreen />
            </Route>
            <Route exact path="/menu">
              <MenuScreen />
            </Route>
            <Route exact path="/nuevo-platillo">
              <NuevoPlatillo />
            </Route>
          </Switch>
        </div>
      </Router>
    </section>
  );
};
