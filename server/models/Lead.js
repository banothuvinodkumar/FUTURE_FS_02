const mongoose = require('mongoose');

const leadSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    company: {
      type: String,
    },
    source: {
      type: String,
      default: 'Website',
    },
    message: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ['New', 'Contacted', 'Converted'],
      default: 'New',
    },
    notes: [
      {
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
