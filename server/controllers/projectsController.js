const Project = require("../models/Project");

// desc Get all projects
// route GET /projects
// access Private
const getAllProjects = async (req, res) => {
  const projects = await Project.find().populate("client", "username").lean();
  if (!projects?.length) {
    return res.status(400).json({ message: "No projects found" });
  }

  const projectsWithConvertedMaps = projects.map((project) => ({
    ...project,
    phaseBudgets: project.phaseBudgets || {},
  }));

  res.json(projectsWithConvertedMaps);
};

// desc Create new project
// route POST /projects
// access Private
const createNewProject = async (req, res) => {
  const { name, address, telephone, client, number } = req.body;
  if (!name || !address || !client || !telephone || !number) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const duplicate = await Project.findOne({ $or: [{ name }, { number }] })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res
      .status(409)
      .json({ message: "Duplicate project name or number" });
  }

  const projectObject = {
    name,
    address,
    client,
    telephone,
    number,
  };

  const project = await Project.create(projectObject);

  if (project) {
    res
      .status(201)
      .json({ message: `New project ${name} created with Number: ${number}!` });
  } else {
    res.status(400).json({ message: "Invalid project data recieved" });
  }
};

// desc Update a project
// route PATCH /projects
// access Private
const updateProject = async (req, res) => {
  const {
    id,
    name,
    number,
    address,
    telephone,
    status,
    client,
    timeline,
    finances,
    phase,
    phaseBudgets,
  } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Project ID is required" });
  }

  const project = await Project.findById(id).exec();

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  if (name && name !== project.name) {
    const duplicate = await Project.findOne({ name })
      .collation({ locale: "en", strength: 2 })
      .lean()
      .exec();

    if (duplicate && duplicate?._id.toString() !== id) {
      return res.status(409).json({ message: "Duplicate project name" });
    }
  }

  if (number && number !== project.number) {
    const duplicateNumber = await Project.findOne({ number })
      .collation({ locale: "en", strength: 2 })
      .lean()
      .exec();

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

  if (timeline) {
    if (
      timeline.currentTick !== undefined &&
      timeline.currentTick !== project.timeline.currentTick
    ) {
      project.timeline.currentTick = timeline.currentTick;
    }
    if (
      timeline.expectedCompletionDate !== undefined &&
      timeline.expectedCompletionDate !==
        project.timeline.expectedCompletionDate
    ) {
      project.timeline.expectedCompletionDate = timeline.expectedCompletionDate;
    }
  }
  if (finances) {
    if (
      finances.currentTick !== undefined &&
      finances.currentTick !== project.finances.currentTick
    ) {
      project.finances.currentTick = finances.currentTick;
    }
    if (
      finances.budget !== undefined &&
      finances.budget !== project.finances.budget
    ) {
      project.finances.budget = finances.budget;
    }
    if (
      finances.spent !== undefined &&
      finances.spent !== project.finances.spent
    ) {
      project.finances.spent = finances.spent;
    }
  }

  if (phase) {
    if (phase.name && phase.name !== project.phase.name) {
      project.phase.name = phase.name;
    }
    if (
      phase.currentTick !== undefined &&
      phase.currentTick !== project.phase.currentTick
    ) {
      project.phase.currentTick = phase.currentTick;
    }
    if (phase.budget !== undefined && phase.budget !== project.phase.budget) {
      project.phase.budget = phase.budget;
    }
    if (phase.spent !== undefined && phase.spent !== project.phase.spent) {
      project.phase.spent = phase.spent;
    }
  }

  if (phaseBudgets) {
    try {
      for (const [phaseName, phaseData] of Object.entries(phaseBudgets)) {
        if (phaseData.budget !== undefined && phaseData.budget < 0) {
          return res.status(400).json({
            message: `Budget cannot be negative for phase: ${phaseName}`,
          });
        }

        if (phaseData.spent !== undefined && phaseData.spent < 0) {
          return res.status(400).json({
            message: `Spent amount cannot be negative for phase: ${phaseName}`,
          });
        }

        const currentPhaseData = project.phaseBudgets.get(phaseName) || {
          budget: 0,
          spent: 0,
          number: 0,
        };

        project.phaseBudgets.set(phaseName, {
          budget:
            phaseData.budget !== undefined
              ? phaseData.budget
              : currentPhaseData.budget,
          spent:
            phaseData.spent !== undefined
              ? phaseData.spent
              : currentPhaseData.spent,
          number:
            phaseData.number !== undefined
              ? phaseData.number
              : currentPhaseData.number,
        });
      }
      project.markModified("phaseBudgets");
    } catch (error) {
      return res.status(400).json({
        message: "Invalid phase budget data",
        error: error.message,
      });
    }
  }
  try {
    const updatedProject = await project.save();
    res.json({
      message: `${updatedProject.name} updated`,
      project: updatedProject,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating project",
      error: error.message,
    });
  }
};

// desc Delete a project
// route DELETE /projects
// access Private
const deleteProject = async (req, res) => {
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
};

module.exports = {
  getAllProjects,
  createNewProject,
  updateProject,
  deleteProject,
};
