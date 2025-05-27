const express = require("express");
const router = express.Router();
const clientsController = require("../controllers/clientsController");
const signUpLimiter = require("../middleware/signUpLimiter");
const verifyJWT = require("../middleware/verifyJWT");

router.post("/", signUpLimiter, clientsController.createNewClient);

router.use(verifyJWT);

router
  .route("/")
  .get(clientsController.getAllClients)
  .patch(clientsController.updateClient)
  .delete(clientsController.deleteClient);

module.exports = router;
