const createUser = async (body) => {
  const response = await fetch(`http://localhost:3000/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

const getUser = async (id) => {
  const response = await fetch(`http://localhost:3000/api/users/${id}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// consulto todos los usuarios
const getAllUsers = async (page = 1, name = "") => {
  const response = await fetch(
    `http://localhost:3000/api/users?page=${page}&name=${name}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Actualizo un los campos de un usuario por medio de su ID
const updateUser = async (uid, newData) => {
  console.log(uid);
  console.log(newData);
  const response = await fetch(`http://localhost:3000/api/users/${uid}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// elimino un usuario por medio de su ID
const deleteUser = async (uid) => {
  const response = await fetch(`http://localhost:3000/api/users/${uid}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
};

// Descargo el archivo Excel
const downloadExcel = async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/users/downloadExcel`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error descargando el archivo:", error);
  }
};

export {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
  downloadExcel,
};
