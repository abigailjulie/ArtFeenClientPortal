import express from "express";
const router = express.Router();
import projectsController from "../controllers/projectsController.js";
import verifyJWT from "../middleware/verifyJWT.js";

router.use(verifyJWT);

router
  .route("/")
  .get(projectsController.getAllProjects)
  .post(projectsController.createNewProject)
  .patch(projectsController.updateProject)
  .delete(projectsController.deleteProject);

export default router;
