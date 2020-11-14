import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { FirebaseContext } from "../firebase/index";
import { useHistory } from "react-router-dom";
import FileUploader from "react-firebase-file-uploader";
export const NuevoPlatillo = () => {
  const { firebase } = useContext(FirebaseContext);

  const [subiendo, setSubiendo] = useState(false);

  const [progreso, setProgreso] = useState(0);

  const [urlImage, setUrlImage] = useState("");

  let history = useHistory();

  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      name: "",
      price: "",
      category: "",
      image: "",
      description: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Los platillos deben tener al menos 3 caracteres")
        .required("Este campo no tiene que estar vacio"),

      price: Yup.number()
        .min(1, "Debes subir el precio")
        .required("El precio es obligatiorio"),

      category: Yup.string().required("La cateroria es obligatioria"),

      description: Yup.string()
        .min(10, "La descripción tiene que ser mas larga")
        .required("El campo descripción es obligatorio"),
    }),

    onSubmit: (value) => {
      try {
        value.existencia = true;
        value.image = urlImage;
        firebase.db.collection("products").add(value);
        history.push("/menu");
      } catch (error) {
        console.error(error);
      }
    },
  });

  const { name, price, category, description } = values;

  const {
    name: nameTouchet,
    price: priceTouchet,
    category: categoryTouchet,
    description: descriptionTouchet,
  } = touched;

  const {
    name: nameError,
    price: priceError,
    category: categoryError,
    description: descriptionError,
  } = errors;

  const handleUploadStart = () => {
    setProgreso(0);
    setSubiendo(true);
  };

  const handleUploadError = (error) => {
    setSubiendo(false);
    console.error(error);
  };

  const handleUploadSuccess = async (nombre) => {
    setProgreso(100);
    setSubiendo(false);
    const url = await firebase.storage
      .ref("products")
      .child(nombre)
      .getDownloadURL();
    setUrlImage(url);
  };

  const handleProgress = (progreso) => {
    setProgreso(progreso);
  };

  return (
    <section>
      <h1 className="text-3xl font-light mb-4">Agregar platillo</h1>
      <hr />
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-3xl">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Nombre:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Nombre platillo"
                value={name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            {nameTouchet && nameError ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role="alert"
              >
                <p className="font-bold">Hubo un error: </p>
                <p>{nameError}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="price"
              >
                Precio:
              </label>
              <input
                type="number"
                min="0"
                id="price"
                name="price"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="$10000"
                value={price}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            {priceTouchet && priceError ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role="alert"
              >
                <p className="font-bold">Hubo un error: </p>
                <p>{priceError}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="category"
              >
                categoría:
              </label>
              <select
                id="category"
                name="category"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={category}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">- Seleccionar -</option>
                <option value="desayuno">Desayuno</option>
                <option value="comida">Comida</option>
                <option value="cena">Cena</option>
                <option value="bebida">Bebida</option>
                <option value="postre">Postre</option>
                <option value="ensalada">Ensalada</option>
              </select>
            </div>

            {categoryTouchet && categoryError ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role="alert"
              >
                <p className="font-bold">Hubo un error: </p>
                <p>{categoryError}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="image"
              >
                Imagen:
              </label>
              <FileUploader
                accept="image/*"
                id="image"
                name="image"
                randomizeFilename
                storageRef={firebase.storage.ref("products")}
                onUploadStart={handleUploadStart}
                onUploadError={handleUploadError}
                onUploadSuccess={handleUploadSuccess}
                onProgress={handleProgress}
              />
            </div>

            {subiendo && (
              <div className="h-12 relative w-full border">
                <div
                  style={{ width: `${progreso}%` }}
                  className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center"
                >
                  {progreso} %
                </div>
              </div>
            )}

            {urlImage && (
              <p className="bg-green-500 text-white p-3 text-center my-5">
                La imagen se subio correctamente
              </p>
            )}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Descripción:
              </label>
              <textarea
                id="description"
                name="description"
                className="shadow h-40 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Descripción del platillo"
                value={description}
                onChange={handleChange}
                onBlur={handleBlur}
              ></textarea>
            </div>

            {descriptionTouchet && descriptionError ? (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role="alert"
              >
                <p className="font-bold">Hubo un error: </p>
                <p>{descriptionError}</p>
              </div>
            ) : null}

            <button
              type={urlImage ? "submit" : "button"}
              className={
                urlImage
                  ? "bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold cursor-pointer"
                  : "bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold cursor-not-allowed"
              }
            >
              Agregar platillo
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
