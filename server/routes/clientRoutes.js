import express from "express";
const router = express.Router();
import clientsController from "../controllers/clientsController.js";
import signUpLimiter from "../middleware/signUpLimiter.js";
import verifyJWT from "../middleware/verifyJWT.js";

router.post("/", signUpLimiter, clientsController.createNewClient);

router.use(verifyJWT);

router
  .route("/")
  .get(clientsController.getAllClients)
  .patch(clientsController.updateClient)
  .delete(clientsController.deleteClient);

export default router;
