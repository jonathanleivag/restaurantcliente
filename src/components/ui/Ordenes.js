import React, { useContext, useState } from "react";
import { FirebaseContext } from "../../firebase/index";

export const Ordenes = ({ orden }) => {
  const { id, orden: ordenesList, total, tiempoentrega, completado } = orden;
  const [tiempoDeEntrega, setTiempoDeEntrega] = useState(0);
  const { firebase } = useContext(FirebaseContext);
  const definirTiempo = (id) => {
    try {
      firebase.db
        .collection("ordenes")
        .doc(id)
        .update({ tiempoentrega: tiempoDeEntrega });
    } catch (error) {
      console.error(error);
    }
  };

  const ordenLista = (id) => {
    try {
      firebase.db.collection("ordenes").doc(id).update({ completado: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="sm:w-1/2 lg:w-1/3 px-2 mb-4">
      <div className="p-3 shadow-md bg-white">
        <h1 className="text-yellow-600 text-lg font-bold"> {id} </h1>
        {ordenesList.map((item) => {
          const { cantidad, name, id } = item;
          return (
            <p key={id} className="text-gray-600">
              {cantidad} {name}
            </p>
          );
        })}
        <p className="text-gray-700 font-bold">Total a pagar $ {total} </p>
        {tiempoentrega === 0 && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tiempo de entrega:
            </label>
            <input
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              min="1"
              max="20"
              placeholder="20"
              value={tiempoDeEntrega}
              onChange={(event) =>
                setTiempoDeEntrega(parseInt(event.target.value))
              }
            />
            <button
              onClick={() => definirTiempo(id)}
              type="submit"
              className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
            >
              Definir tiempo
            </button>
          </div>
        )}
        {tiempoentrega > 0 && (
          <p className="text-gray-700">
            Tiempo de entrega:
            <span className="font-bold"> {tiempoentrega} Minutos </span>
          </p>
        )}
        {!completado && tiempoentrega > 0 && (
          <button
            className="bg-blue-800 hover:bg-blue-700 w-full mt-5 p-2 text-white uppercase font-bold"
            onClick={() => ordenLista(id)}
          >
            Marcar como lista
          </button>
        )}
      </div>
    </div>
  );
};
