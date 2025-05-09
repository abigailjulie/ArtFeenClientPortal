const Project = require("../models/Project");
const asyncHandler = require("express-async-handler");

// desc Get all projects
// route GET /projects
// access Private
const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().populate("client", "username").lean();
  if (!projects?.length) {
    return res.status(400).json({ message: "No projects found" });
  }
  res.json(projects);
});

// desc Create new project
// route POST /projects
// access Private
const createNewProject = asyncHandler(async (req, res) => {
  const { name, number, address, telephone, client } = req.body;
  if (!name || !address || !client || !number) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const duplicate = await Project.findOne({ $or: [{ name }, { number }] })
    .lean()
    .exec();

  if (duplicate) {
    return res
      .status(409)
      .json({ message: "Duplicate project name or number" });
  }

  const projectObject = {
    name,
    number,
    address,
    client,
    telephone,
  };

  const project = await Project.create(projectObject);

  if (project) {
    res
      .status(201)
      .json({ message: `New project ${name} created with Number: ${number}!` });
  } else {
    res.status(400).json({ message: "Invalid project data recieved" });
  }
});

// desc Update a project
// route PATCH /projects
// access Private
const updateProject = asyncHandler(async (req, res) => {
  const { id, name, number, address, telephone, status, client } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Project ID is required" });
  }

  const project = await Project.findById(id).exec();

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (name && name !== project.name) {
    const duplicate = await Project.findOne({ name }).lean().exec();

    if (duplicate && duplicate?._id.toString() !== id) {
      return res.status(409).json({ message: "Duplicate project name" });
    }
  }

  if (number && number !== project.number) {
    const duplicateNumber = await Project.findOne({ number }).lean().exec();

    if (duplicateNumber && duplicateNumber._id.toString() !== id) {
      return res.status(409).json({ message: "Duplicate project number" });
    }
  }

  if (name && name !== project.name) project.name = name;
  if (client && client?.toString() !== project.client.toString())
    project.client = client;
  if (number && number !== project.number) project.number = number;
  if (address && address !== project.address) project.address = address;
  if (telephone && telephone !== project.telephone)
    project.telephone = telephone;
  if (status && status !== project.status) project.status = status;

  const updatedProject = await project.save();

  res.json({ message: `${updatedProject.name} updated` });
});

// desc Delete a project
// route DELETE /projects
// access Private
const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(409).json({ message: "Project ID Required" });
  }

  const project = await Project.findById(id).exec();

  if (!project) {
    return res.status(409).json({ message: "Project not found" });
  }

  await Project.deleteOne({ _id: id });

  const reply = `Project ${project.name} with ID ${project._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllProjects,
  createNewProject,
  updateProject,
  deleteProject,
};
