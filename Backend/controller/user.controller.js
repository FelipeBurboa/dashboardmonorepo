const { User } = require("../models/index");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const {
  getPagination,
  getPaginationData,
} = require("../utils/paginationHelper");
const excelJS = require("exceljs");

exports.exportUsers = async (req, res) => {
  try {
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("Mis usuarios");

    worksheet.columns = [
      { header: "ID", key: "id", width: 30 },
      { header: "Nombre", key: "firstname", width: 10 },
      { header: "Apellido", key: "lastname", width: 10 },
      { header: "Email", key: "email", width: 30 },
      { header: "Dirección", key: "address", width: 20 },
      { header: "Fecha de registro", key: "createdAt", width: 15 },
    ];

    const users = await User.findAll();

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });

    users.forEach((user) => {
      worksheet.addRow({
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        address: user.address,
        createdAt: user.createdAt,
      });
    });

    workbook.xlsx
      .writeBuffer()
      .then((buffer) => {
        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader("Content-Disposition", "attachment; filename=users.xlsx");
        res.send(buffer);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const { page, size, name } = req.query;
    const condition = name
      ? {
          [Op.or]: [
            { firstname: { [Op.iLike]: `%${name}%` } },
            { lastname: { [Op.iLike]: `%${name}%` } },
          ],
        }
      : null;

    const { currentPage, pageSize, offset } = getPagination(page, size);

    const { count, rows } = await User.findAndCountAll({
      where: condition,
      offset,
      limit: pageSize,
      attributes: { exclude: ["updatedAt"] },
      order: [["createdAt", "DESC"]],
    });

    const response = getPaginationData({ count, rows }, currentPage, pageSize);

    if (response.data.length === 0 && name) {
      return res
        .status(404)
        .json({ message: `No users con nombre: ${name} fueron encontrados` });
    }

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id: id } });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  const { firstname, lastname, email, address } = req.body;
  try {
    if (!firstname || !lastname || !email || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newId = uuidv4();

    const newUser = await User.create({
      id: newId,
      firstname: firstname,
      lastname: lastname,
      email: email,
      address: address,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const [updated] = await User.update(req.body, { where: { id: id } });
    if (updated) res.json({ message: "User updated successfully" });
    else res.status(404).json({ message: "User not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id: id } });
    if (!user) return res.status(404).json({ message: "User not found" });
    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
