import Project from "../models/Project.js";
import Client from "../models/Client.js";
import EmailService from "../services/emailService.js";
const emailService = new EmailService();

// desc Get all projects
// route GET /projects
// access Private
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("client", "username").lean();
    if (!projects?.length) {
      return res.status(404).json({ message: "No projects found" });
    }

    const projectsWithConvertedMaps = projects.map((project) => ({
      ...project,
      phaseBudgets: project.phaseBudgets || {},
    }));

    res.json(projectsWithConvertedMaps);
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching projects",
      error: error.message,
    });
  }
};

// desc Create new project
// route POST /projects
// access Private
const createNewProject = async (req, res) => {
  try {
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
      const clientInfo = await Client.findById(client)
        .select("username")
        .lean();

      setImmediate(() => {
        emailService.sendAdminNotification("project", {
          name,
          username: clientInfo?.username || "Unknown Client",
        });
      });

      res
        .status(201)
        .json({ message: `Project ${name} created with Number: ${number}!` });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error while creating project",
      error: error.message,
    });
  }
};

// desc Update a project
// route PATCH /projects
// access Private
const updateProject = async (req, res) => {
  try {
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

      if (duplicate && duplicate._id.toString() !== id) {
        return res.status(409).json({ message: "Project name already exists" });
      }
    }

    if (number && number !== project.number) {
      const duplicateNumber = await Project.findOne({ number })
        .collation({ locale: "en", strength: 2 })
        .lean()
        .exec();

      if (duplicateNumber && duplicateNumber._id.toString() !== id) {
        return res
          .status(409)
          .json({ message: "Project number already exists" });
      }
    }

    if (name) project.name = name;
    if (client && client?.toString() !== project.client.toString())
      project.client = client;
    if (number) project.number = number;
    if (address) project.address = address;
    if (telephone) project.telephone = telephone;
    if (status) project.status = status;

    if (timeline) {
      if (timeline.currentTick !== undefined)
        project.timeline.currentTick = timeline.currentTick;
      if (timeline.expectedCompletionDate !== undefined)
        project.timeline.expectedCompletionDate =
          timeline.expectedCompletionDate;
    }

    if (finances) {
      if (finances.currentTick !== undefined)
        project.finances.currentTick = finances.currentTick;
      if (finances.budget !== undefined)
        project.finances.budget = finances.budget;
      if (finances.spent !== undefined) project.finances.spent = finances.spent;
    }

    if (phase) {
      if (phase.name) project.phase.name = phase.name;
      if (phase.currentTick !== undefined)
        project.phase.currentTick = phase.currentTick;
      if (phase.budget !== undefined) project.phase.budget = phase.budget;
      if (phase.spent !== undefined) project.phase.spent = phase.spent;
    }

    if (phaseBudgets) {
      for (const [phaseName, phaseData] of Object.entries(phaseBudgets)) {
        if (phaseData.budget !== undefined && phaseData.budget < 0) {
          return res.status(400).json({
            message: `Budget cannot be negative for phase "${phaseName}"`,
          });
        }

        if (phaseData.spent !== undefined && phaseData.spent < 0) {
          return res.status(400).json({
            message: `Spent amount cannot be negative for phase "${phaseName}"`,
          });
        }

        const current = project.phaseBudgets.get(phaseName) || {
          budget: 0,
          spent: 0,
          number: 0,
        };

        project.phaseBudgets.set(phaseName, {
          budget: phaseData.budget ?? current.budget,
          spent: phaseData.spent ?? current.spent,
          number: phaseData.number ?? current.number,
        });
      }
      project.markModified("phaseBudgets");
    }

    const updatedProject = await project.save();

    res.json({
      message: `Project "${updatedProject.name}" updated successfully`,
      project: updatedProject,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while updating project",
      error: error.message,
    });
  }
};

// desc Delete a project
// route DELETE /projects
// access Private
const deleteProject = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(409).json({ message: "Project ID Required" });
    }

    const project = await Project.findById(id).exec();

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await Project.deleteOne({ _id: id });

    res.json({
      message: `Project "${project.name}" deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while deleting project",
      error: error.message,
    });
  }
};

export default {
  getAllProjects,
  createNewProject,
  updateProject,
  deleteProject,
};
