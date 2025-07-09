import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      enum: ["Client", "Admin", "Founder"],
      default: ["Client"],
    },
    active: {
      type: Boolean,
      default: true,
    },
    email: {
      type: String,
      match: /.+\@.+\..+/,
    },
    telephone: {
      type: String,
    },
    company: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      telephone: { type: String, required: true },
    },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.model("Client", clientSchema);

export default Client;
