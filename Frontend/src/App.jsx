import { useEffect, useState, useMemo } from "react";
import {
  deleteUser,
  getAllUsers,
  downloadExcel,
} from "./services/api.users.service";
import ModalEdit from "./components/ModalEdit";
import ModalCreate from "./components/ModalCreate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaginationView from "./components/PaginationView";
import SearchUser from "./components/SearchUser";
import { AiOutlineUpload } from "react-icons/ai";

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetchUsers(page, searchValue);
  }, [page, searchValue]);

  const fetchUsers = (pageNum, searchValue) => {
    getAllUsers(pageNum, searchValue)
      .then((data) => {
        const { data: usersData, pagination } = data;
        setUsers(usersData);
        setTotalPages(pagination.totalPages);

        if (usersData.length === 0 && pageNum > 1) {
          setPage(pageNum - 1);
        }
      })
      .catch(() => {
        setUsers([]);
      });
  };

  const paginationOptions = useMemo(() => {
    const options = [];
    for (let i = 1; i <= totalPages; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  }, [totalPages]);

  function handlePageChange(event) {
    const selectedPage = parseInt(event.target.value);
    setPage(selectedPage);
  }

  const handleDeleteUser = async (uid) => {
    await deleteUser(uid).then(() => {
      toast.success("Usuario eliminado!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
    fetchUsers();
  };

  const handleEditUser = (uid) => {
    setEditingUserId(uid);
  };

  const handleCloseModal = () => {
    setEditingUserId(null);
    setIsModalOpen(false);
  };

  const handleCreateUser = () => {
    setEditingUserId(null);
    setIsModalOpen(true);
  };

  const handleDownload = async () => {
    try {
      const response = await downloadExcel();

      if (!response.ok) {
        throw new Error("Failed to download Excel file");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Usuarios.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading Excel file:", error);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold flex items-center justify-center text-white">
        Dashboard
      </h1>
      <div className="flex justify-center items-center mt-4 gap-5">
        <div className="" onClick={handleDownload}>
          <AiOutlineUpload
            className="text-white cursor-pointer ml-4 hover:text-blue-500 transition-all duration-200 ease-in-out"
            size={40}
          />
        </div>
        <SearchUser setSearchValue={setSearchValue} setPage={setPage} />
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleCreateUser}
          >
            Crear usuario
          </button>
        </div>
      </div>
      <div className="mt-4 max-w-4xl flex items-center justify-center flex-col overflow-x-auto mx-auto">
        <table className="table-auto border-collapse border border-blue-500 bg-slate text-white">
          <thead>
            <tr>
              <th className="border border-blue-500 px-4 py-2">Nombre</th>
              <th className="border border-blue-500 px-4 py-2">Apellido</th>
              <th className="border border-blue-500 px-4 py-2 sm:table-cell hidden">
                Email
              </th>
              <th className="border border-blue-500 px-4 py-2 md:table-cell hidden">
                Dirección
              </th>
              <th className="border border-blue-500 px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-light">
                <td className="border border-blue-500 px-4 py-2">
                  {user.firstname}
                </td>
                <td className="border border-blue-500 px-4 py-2">
                  {user.lastname}
                </td>
                <td className="border border-blue-500 px-4 py-2 sm:table-cell hidden">
                  {user.email}
                </td>
                <td className="border border-blue-500 px-4 py-2 md:table-cell hidden">
                  {user.address}
                </td>
                <td className="border border-blue-500 px-4 py-2 flex items-center justify-center space-x-2">
                  <button
                    className="mr-2 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleEditUser(user.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="mr-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users?.length === 0 && (
          <div className="">
            <p>No hay Usuarios que correspondan a tu búsqueda</p>
          </div>
        )}
        {editingUserId && (
          <ModalEdit
            onClose={handleCloseModal}
            userId={editingUserId}
            fetchUsers={fetchUsers}
          />
        )}
        {users.length > 0 && totalPages > 1 && (
          <PaginationView
            paginationOptions={paginationOptions}
            currentPage={page}
            handlePageChange={handlePageChange}
            getTotalPages={() => totalPages}
          />
        )}
      </div>
      {isModalOpen && (
        <ModalCreate onClose={handleCloseModal} fetchUsers={fetchUsers} />
      )}
      <ToastContainer />
    </>
  );
};

export default App;
