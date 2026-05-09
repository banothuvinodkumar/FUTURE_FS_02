const express = require('express');
const {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
} = require('../controllers/leadController');
const { protect, admin } = require('../middleware/authMiddleware');
const { validateLead } = require('../middleware/validationMiddleware');
const router = express.Router();

router.route('/').get(protect, admin, getLeads).post(protect, validateLead, createLead);
router
  .route('/:id')
  .get(protect, admin, getLeadById)
  .put(protect, admin, updateLead)
  .delete(protect, admin, deleteLead);

module.exports = router;
