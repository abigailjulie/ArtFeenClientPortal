const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    telephone: { type: String },
    status: {
      type: String,
      enum: ["Active", "Paused", "Completed", "Cancelled"],
      default: "Active",
    },
    number: { type: String, unique: true, sparse: true },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },

    timeline: {
      currentTick: {
        required: true,
        type: Number,
        min: 0,
        max: 7,
        default: 0,
      },
      expectedCompletionDate: {
        type: Date,
      },
    },

    finances: {
      currentTick: {
        required: true,
        type: Number,
        min: 0,
        max: 7,
        default: 0,
      },
      budget: {
        required: true,
        type: Number,
        default: 0,
      },
      spent: {
        required: true,
        type: Number,
        default: 0,
      },
    },

    phase: {
      name: {
        type: String,
        enum: [
          "Predevelopment",
          "Programming",
          "Schematic Design",
          "Design Development",
          "Construction Documents",
          "Construction Administration",
          "Project Close-out",
        ],
        default: "Predevelopment",
        required: true,
      },
      currentTick: {
        required: true,
        type: Number,
        min: 0,
        max: 7,
        default: 0,
      },
    },

    phaseBudgets: {
      type: Map,
      of: {
        budget: { type: Number, default: 0 },
        spent: { type: Number, default: 0 },
        number: { type: Number, require: true },
      },
      default: function () {
        return Map([
          ["Predevelopment", { budget: 0, spent: 0, number: 1 }],
          ["Programming", { budget: 0, spent: 0, number: 2 }],
          ["Schematic Design", { budget: 0, spent: 0, number: 3 }],
          ["Design Development", { budget: 0, spent: 0, number: 4 }],
          ["Construction Documents", { budget: 0, spent: 0, number: 5 }],
          ["Construction Administration", { budget: 0, spent: 0, number: 6 }],
          ["Project Close-out", { budget: 0, spent: 0, number: 7 }],
        ]);
      },
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);
