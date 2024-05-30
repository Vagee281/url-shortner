const mongoose = require("mongoose");

const urlSchema = mongoose.Schema(
  {
    shortUrl: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
    },
    visitHistory: [
      {
        timestamp: {
          type: Number,
        },
      },
    ],
  },
  { timestamp: true }
);

const urlModel = mongoose.model("URL", urlSchema);

module.exports = { urlModel };
