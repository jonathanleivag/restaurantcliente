import React, { useContext, useRef } from "react";
import { FirebaseContext } from "../../firebase";

export const Platillos = ({ platillo }) => {
  const {
    name,
    price,
    category,
    description,
    existencia,
    image,
    id,
  } = platillo;
  const ref = useRef(existencia);

  const { firebase } = useContext(FirebaseContext);

  const handlerSelect = () => {
    const exitenciaBolean = ref.current.value === "true";
    try {
      firebase.db
        .collection("products")
        .doc(id)
        .update({ existencia: exitenciaBolean });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full px-3 mb-4">
      <div className="p-5 shadow-md bg-white">
        <div className="lg:flex">
          <div className="lg:w-5/12 xl:w-3/12">
            <img src={image} alt={"imagen de platillo " + name} />

            <div className="sm:flex sm:-mx-2 pl-2">
              <label className="block mt-5 sm:w-2/4">
                <span className="block text-gray-800 mb-2">Existencia</span>
                <select
                  className="appearance-none shadow border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-white"
                  ref={ref}
                  onChange={handlerSelect}
                  value={existencia}
                >
                  <option value="true">Disponible</option>
                  <option value="false">No Disponible</option>
                </select>
              </label>
            </div>
          </div>
          <div className="lg:w-7/12 xl:w-9/12 pl-5">
            <p className="font-bold text-2xl text-yellow-600 mb-4"> {name} </p>
            <p className="text-gray-600 mb-4">
              Categoría:{" "}
              <span className="text-gray-700 font-bold">
                {category.toUpperCase()}
              </span>
            </p>
            <p className="text-gray-600 mb-4"> {description} </p>
            <p className="text-gray-600 mb-4">
              Precio:<span className="text-gray-700 font-bold"> $ {price}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
