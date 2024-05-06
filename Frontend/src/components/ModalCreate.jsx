import { createUser } from "../services/api.users.service";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModalCreate({ onClose, fetchUsers }) {
  const [body, setBody] = useState({});

  const handleCreateUser = async (e) => {
    e.preventDefault();
    await createUser(body)
      .then(() => {
        toast.success("Usuario creado!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setBody({});
      })
      .catch((error) => {
        toast.error("Error al crear el usuario", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
    onClose();
    fetchUsers();
  };

  return (
    <>
      <div className="fixed z-50 top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-black rounded-lg p-6 w-full max-w-sm mx-4 shadow-lg border border-gray-700">
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-bold text-white w-full text-center">
              Crear usuario
            </h1>
            <button
              onClick={onClose}
              className="text-red-500 hover:text-red-700 text-2xl -translate-y-6 translate-x-3"
            >
              x
            </button>
          </div>
          <form onSubmit={handleCreateUser} className="flex flex-col gap-4">
            <div>
              <label className="text-lg font-bold text-white p-1">Nombre</label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1"
                placeholder="Nombre"
                required
                onChange={(e) =>
                  setBody({ ...body, firstname: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-lg font-bold text-white p-1">
                Apellido
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1"
                placeholder="Apellido"
                required
                onChange={(e) => setBody({ ...body, lastname: e.target.value })}
              />
            </div>
            <div>
              <label className="text-lg font-bold text-white p-1">Email</label>
              <input
                type="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1"
                placeholder="Email"
                required
                onChange={(e) => setBody({ ...body, email: e.target.value })}
              />
            </div>
            <div>
              <label className="text-lg font-bold text-white p-1">
                Dirección
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1"
                placeholder="Dirección"
                required
                onChange={(e) => setBody({ ...body, address: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 rounded"
            >
              Crear
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalCreate;
