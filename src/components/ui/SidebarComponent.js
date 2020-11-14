import React from "react";
import { NavLink } from "react-router-dom";

export const SidebarComponent = () => {
  return (
    <section className="md:w-2/5 xl:w-1/5 bg-gray-800">
      <div className="p-6">
        <p className="uppercase text-white text-2xl tracking-wide text-center font-bold">
          RestaurantApp
        </p>
        <p className="mt-3 text-gray-600">
          Administra tu restaurant en la siguiente opciones:
        </p>
        <nav className="mt-10">
          <NavLink
            className="p-1 block text-gray-400 hover:bg-yellow-500 hover:text-gray-900"
            to="/"
            activeClassName="text-yellow-500"
          >
            Oredenes
          </NavLink>
          <NavLink
            className="p-1 block text-gray-400 hover:bg-yellow-500 hover:text-gray-900"
            to="/menu"
            activeClassName="text-yellow-500"
          >
            Menu
          </NavLink>
        </nav>
      </div>
    </section>
  );
};
