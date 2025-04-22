const Project = require("../models/Project");
const asyncHandler = require("express-async-handler");

// desc Get all projects
// route GET /projects
// access Private
const getAllClientProjects = asyncHandler(async (req, res) => {
  const clientId = req.params.id;
  const projects = await Project.find({ client: clientId }).lean();
  if (!projects?.length) {
    return res.status(400).json({ message: "No projects found" });
  }
  res.json(projects);
});

// desc Create new project
// route POST /projects
// access Private
const createNewClientProject = asyncHandler(async (req, res) => {
  const clientId = req.params.id;
  const { name, address } = req.body;
  if (!name || !address || !clientId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const duplicate = await Project.findOne({ name, client: clientId })
    .lean()
    .exec();

  if (duplicate) {
    return res
      .status(409)
      .json({ message: "Duplicate project name for this client" });
  }

  const projectObject = {
    name,
    address,
    client: clientId,
  };

  const project = await Project.create(projectObject);

  if (project) {
    res.status(201).json({ message: `New project ${name} created!` });
  } else {
    res.status(400).json({ message: "Invalid project data recieved" });
  }
});

// desc Update a project
// route PATCH /projects
// access Private
const updateClientProject = asyncHandler(async (req, res) => {
  const clientId = req.params.id;
  const projectId = req.params.projectId;
  const { name, address, telephone } = req.body;

  if (!projectId || !name || !clientId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const project = await Project.findById(projectId).exec();

  if (!project) {
    return res.status(409).json({ message: "Project not found" });
  }

  const duplicate = await Project.findOne({ name }).lean().exec();

  if (duplicate && duplicate?._id.toString() !== projectId) {
    return res.status(409).json({ message: "Duplicate project" });
  }

  project.name = name;
  project.address = address;
  project.telephone = telephone;

  const updatedProject = await project.save();

  res.json({ message: `${updatedProject.name} updated` });
});

// desc Delete a project
// route DELETE /projects
// access Private
const deleteClientProject = asyncHandler(async (req, res) => {
  const clientId = req.params.id;
  const projectId = req.params.projectId;

  if (!projectId || !clientId) {
    return res.status(409).json({ message: "Project ID Required" });
  }

  const project = await Project.findById(projectId).exec();

  if (!project) {
    return res.status(409).json({ message: "Project not found" });
  }

  await Project.deleteOne({ _id: projectId });

  const reply = `Project ${project.name} with ID ${project._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllClientProjects,
  createNewClientProject,
  updateClientProject,
  deleteClientProject,
};
