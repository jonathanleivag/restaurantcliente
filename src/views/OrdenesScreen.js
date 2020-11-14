import React, { useContext, useEffect, useState } from "react";
import { Ordenes } from "../components/ui/Ordenes";
import { FirebaseContext } from "../firebase/index";
export const OrdenesScreen = () => {
  const { firebase } = useContext(FirebaseContext);
  const [ordenes, setOrdenes] = useState([]);
  useEffect(() => {
    const obtenerOrdenes = () => {
      firebase.db
        .collection("ordenes")
        .where("completado", "==", false)
        .onSnapshot(manejarSnapshot);
    };

    obtenerOrdenes();
  }, [firebase.db]);

  const manejarSnapshot = (snapshot) => {
    const ordenes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setOrdenes(ordenes);
  };

  return (
    <section>
      <h1 className="text-3xl font-light mb-4">Ordenes</h1>

      <div className="sm:flex sm:flex-wrap -mx-3">
        {ordenes.map((item) => (
          <Ordenes key={item.id} orden={item} />
        ))}
      </div>
    </section>
  );
};
