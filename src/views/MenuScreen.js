import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Platillos } from "../components/ui/Platillos";
import { FirebaseContext } from "../firebase";

export const MenuScreen = () => {
  const { firebase } = useContext(FirebaseContext);
  const [platillos, setPlatillos] = useState([]);
  useEffect(() => {
    const resultadosPlatillos = () => {
      firebase.db.collection("products").onSnapshot(hablerSnapshot);
    };
    resultadosPlatillos();
  }, [firebase]);

  const hablerSnapshot = (snapshot) => {
    const platillosFirebase = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPlatillos(platillosFirebase);
  };

  return (
    <section>
      <h1 className="text-3xl font-light mb-4">Menu</h1>
      <Link
        to="/nuevo-platillo"
        className="ml-3 bg-blue-800 hover:bg-blue-700 inline-block mb-5 p-2 text-white uppercase font-bold"
      >
        Nuevo platillo
      </Link>

      {platillos.map((platillo) => (
        <Platillos key={platillo.id} platillo={platillo} />
      ))}
    </section>
  );
};
