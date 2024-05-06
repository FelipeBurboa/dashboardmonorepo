import { useEffect, useState } from "react";
import { getUser, updateUser } from "../services/api.users.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModalEdit({ onClose, userId, fetchUsers }) {
  const [user, setUser] = useState({});
  const [newData, setNewData] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUser();
    setShowModal(true);
  }, [userId]);

  const fetchUser = async () => {
    try {
      const response = await getUser(userId);
      setUser(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    await updateUser(userId, newData)
      .then(() => {
        toast.success("Usuario editado!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setNewData({});
      })
      .catch((error) => {
        toast.error("Error al editar el usuario", {
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
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="fixed z-50 top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-black rounded-lg p-6 w-full max-w-sm mx-4 shadow-lg border border-gray-700">
            <div className="flex justify-between mb-4">
              <h1 className="text-2xl font-bold text-white w-full text-center">
                Editar usuario
              </h1>
              <button
                onClick={onClose}
                className="text-red-500 hover:text-red-700 text-2xl -translate-y-6 translate-x-3"
              >
                x
              </button>
            </div>
            <form onSubmit={handleEditUser} className="flex flex-col gap-4">
              <div>
                <label className="text-lg font-bold text-white p-1">
                  Nombre
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1"
                  placeholder="Nombre"
                  defaultValue={user?.firstname}
                  onChange={(e) =>
                    setNewData({ ...newData, firstname: e.target.value })
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
                  defaultValue={user?.lastname}
                  onChange={(e) =>
                    setNewData({ ...newData, lastname: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-lg font-bold text-white p-1">
                  Email
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1"
                  placeholder="Email"
                  defaultValue={user?.email}
                  onChange={(e) =>
                    setNewData({ ...newData, email: e.target.value })
                  }
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
                  defaultValue={user?.address}
                  onChange={(e) =>
                    setNewData({ ...newData, address: e.target.value })
                  }
                />
              </div>
              <button
                type="submit"
                className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 rounded"
              >
                Actualizar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalEdit;
