/// <reference types="cypress" />
const mongoose = require("mongoose");
const adminModel = require("../../backend/models/adminModel");
const { collection } = require("../../backend/models/adminModel");

const connected = mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // LISTEN FOR REQUESTS
    app.listen(process.env.PORT, () => {
      console.log("Connected to db & listening on port http://localhost:4000/");
    });
    const db = adminModel.find();
    console.log(db);
    return db;
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = testar = async (on, config) => {
  const db = await connected;
  console.log(db);

  on("task", {
    async clearAdmins() {
      console.log("Clear Admins");
      await admins.remove({});

      return null;
    },
  });
};
