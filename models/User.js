const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
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
    logo: {
      data: Buffer,
      contentType: String,
      filename: String,
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

userSchema.pre("validate", function (next) {
  if (!this.email && !this.telephone) {
    this.invalidate("email", "Either email or telephone must be provided");
    this.invalidate("telephone", "Either email or telephone must be provided");
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
