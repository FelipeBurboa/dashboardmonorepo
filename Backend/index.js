require("dotenv").config();
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");
const userRoutes = require("./routes/user.routes");
const { sequelize } = require("./config/database");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan('dev'));
app.use(cors({ origin: true,credentials: true }));

// Use user routes
app.use('/api/users', userRoutes);

sequelize.sync().then(() => {
  console.log("Database synced successfully.");
});

app.listen(process.env.PORT, () => {
  console.log('Server running on port 3000');
});
