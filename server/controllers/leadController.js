const Lead = require('../models/Lead');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private/Admin
const getLeads = asyncHandler(async (req, res) => {
  const leads = await Lead.find({}).sort({ createdAt: -1 });
  res.json(leads);
});

// @desc    Get lead by ID
// @route   GET /api/leads/:id
// @access  Private/Admin
const getLeadById = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  if (lead) {
    res.json(lead);
  } else {
    res.status(404);
    throw new Error('Lead not found');
  }
});

// @desc    Create a lead
// @route   POST /api/leads
// @access  Public
const createLead = asyncHandler(async (req, res) => {
  const { name, email, phone, company, source, message } = req.body;

  const lead = new Lead({
    name,
    email,
    phone,
    company,
    source,
    message,
  });

  const createdLead = await lead.save();
  res.status(201).json(createdLead);
});

// @desc    Update lead status and notes
// @route   PUT /api/leads/:id
// @access  Private/Admin
const updateLead = asyncHandler(async (req, res) => {
  const { status, note } = req.body;

  const lead = await Lead.findById(req.params.id);

  if (lead) {
    if (status) lead.status = status;
    if (note) {
      lead.notes.push({ text: note });
    }

    const updatedLead = await lead.save();
    res.json(updatedLead);
  } else {
    res.status(404);
    throw new Error('Lead not found');
  }
});

// @desc    Delete lead
// @route   DELETE /api/leads/:id
// @access  Private/Admin
const deleteLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id);

  if (lead) {
    await Lead.deleteOne({ _id: lead._id });
    res.json({ message: 'Lead removed' });
  } else {
    res.status(404);
    throw new Error('Lead not found');
  }
});

module.exports = {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
};
