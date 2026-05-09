import api from './api';

const getLeads = async () => {
  const response = await api.get('/leads');
  return response.data;
};

const getLeadById = async (id) => {
  const response = await api.get(`/leads/${id}`);
  return response.data;
};

const createLead = async (leadData) => {
  const response = await api.post('/leads', leadData);
  return response.data;
};

const updateLead = async (id, updateData) => {
  const response = await api.put(`/leads/${id}`, updateData);
  return response.data;
};

const deleteLead = async (id) => {
  const response = await api.delete(`/leads/${id}`);
  return response.data;
};

const leadService = {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
};

export default leadService;
