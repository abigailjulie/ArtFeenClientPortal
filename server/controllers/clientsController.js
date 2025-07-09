import Client from "../models/Client.js";
import EmailService from "../services/emailService.js";
const emailService = new EmailService();
import bcrypt from "bcrypt";

// desc Get all clients
// route GET /clients
// access Private
const getAllClients = async (req, res) => {
  const clients = await Client.find().select("-password").lean();
  if (!clients?.length) {
    return res.status(400).json({ message: "No clients found" });
  }
  res.json(clients);
};

// desc Create new client
// route POST /clients
// access Private
const createNewClient = async (req, res) => {
  const { username, password, roles, email, telephone, company } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const duplicate = await Client.findOne({ username })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate username" });
  }

  const hashedPwd = await bcrypt.hash(password, 10);

  const clientObject =
    !Array.isArray(roles) || !roles.length
      ? {
          username,
          password: hashedPwd,
          email,
          telephone,
          company,
        }
      : {
          username,
          password: hashedPwd,
          roles,
          email,
          telephone,
          company,
        };

  const client = await Client.create(clientObject);

  if (client) {
    const clientData = { username, email, company };
    setImmediate(() => {
      emailService.sendAdminNotification("client", clientData);
      if (email) {
        emailService.sendClientWelcomeEmail(clientData);
      }
    });
    res.status(201).json({ message: `New client ${username} created!` });
  } else {
    res.status(400).json({ message: "Invalid client data received" });
  }
};

// desc Update a client
// route PATCH /clients
// access Private
const updateClient = async (req, res) => {
  const { id, username, roles, active, password, email, telephone, company } =
    req.body;

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

  const duplicate = await Client.findOne({ username })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();
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

  if (email && email !== client.email) client.email = email;
  if (telephone && telephone !== client.telephone) client.telephone = telephone;
  if (client.company) {
    if (company.name !== undefined && company.name !== client.company.name)
      client.company.name = company.name;
    if (
      company.address !== undefined &&
      company.address !== client.company.address
    )
      client.company.address = company.address;
    if (
      company.telephone !== undefined &&
      company.telephone !== client.company.telephone
    )
      client.company.telephone = company.telephone;
  }

  const updatedClient = await client.save();

  res.json({ message: `${updatedClient.username} updated` });
};

// desc Delete a client
// route DELETE /clients
// access Private
const deleteClient = async (req, res) => {
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
};

export default { getAllClients, createNewClient, updateClient, deleteClient };
