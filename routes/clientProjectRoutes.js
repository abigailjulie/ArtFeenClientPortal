const express = require("express");
const router = express.Router({ mergeParams: true });
const clientProjectsController = require("../controllers/clientProjectsController");

router
  .route("/")
  .get(clientProjectsController.getAllClientProjects)
  .post(clientProjectsController.createNewClientProject);

router
  .route("/:projectId")
  .patch(clientProjectsController.updateClientProject)
  .delete(clientProjectsController.deleteClientProject);

module.exports = router;
