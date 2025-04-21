const Client = require("../models/Client");
const Project = require("../models/Project");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// desc Get all clients
// route GET /clients
// access Private
const getAllClients = asyncHandler(async (req, res) => {
  const clients = await Client.find().select("-password").lean();
  if (!clients?.length) {
    return res.status(400).json({ message: "No clients found" });
  }
  res.json(clients);
});

// desc Create new client
// route POST /clients
// access Private
const createNewClient = asyncHandler(async (req, res) => {
  const { username, password, roles, email, telephone, company } = req.body;
  if (!username || !password || !Array.isArray(roles) || !roles.length) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const duplicate = await Client.findOne({ username }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  const hashedPwd = await bcrypt.hash(password, 10);

  const clientObject = {
    username,
    password: hashedPwd,
    roles,
    email,
    telephone,
    company,
  };

  const client = await Client.create(clientObject);

  if (client) {
    res.status(201).json({ message: `New client ${username} created!` });
  } else {
    res.status(400).json({ message: "Invalid client data recieved" });
  }
});

// desc Update a client
// route PATCH /clients
// access Private
const updateClient = asyncHandler(async (req, res) => {
  const { id, username, roles, active, password } = req.body;

  if (
    !id ||
    !username ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const client = await Client.findById(id).exec();

  if (!client) {
    return res.status(409).json({ message: "User not found" });
  }

  const duplicate = await Client.findOne({ username }).lean().exec();
  //not duplicate, found client to update
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  client.username = username;
  client.roles = roles;
  client.active = active;

  if (password) {
    client.password = await bcrypt.hash(password, 10);
  }

  const updatedClient = await client.save();

  res.json({ message: `${updatedClient.username} updated` });
});

// desc Delete a client
// route DELETE /clients
// access Private
const deleteClient = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(409).json({ message: "Client ID Required" });
  }

  const client = await Client.findById(id).exec();

  if (!client) {
    return res.status(409).json({ message: "Client not found" });
  }

  await Client.deleteOne({ _id: id });

  const reply = `Username ${client.username} with ID ${client._id} deleted`;

  res.json(reply);
});

module.exports = { getAllClients, createNewClient, updateClient, deleteClient };
