const AdministrativeStaff = require('../models/administrativeStaff');

// Create a new administrative staff member
const createAdministrativeStaff = async (req, res) => {
  try {
    const newStaffMember = new AdministrativeStaff(req.body);
    const savedStaffMember = await newStaffMember.save();
    res.json(savedStaffMember);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create administrative staff member' });
  }
};

// Get all administrative staff members
const getAllAdministrativeStaff = async (req, res) => {
  try {
    const staffMembers = await AdministrativeStaff.find();
    res.json(staffMembers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch administrative staff members' });
  }
};

// Get a single administrative staff member by ID
const getAdministrativeStaffById = async (req, res) => {
  try {
    const staffMemberId = req.params.id;
    const staffMember = await AdministrativeStaff.findById(staffMemberId);
    if (!staffMember) {
      return res.status(404).json({ error: 'Administrative staff member not found' });
    }
    res.json(staffMember);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch administrative staff member' });
  }
};

// Update an administrative staff member by ID
const updateAdministrativeStaffById = async (req, res) => {
  try {
    const staffMemberId = req.params.id;
    const updatedStaffMember = await AdministrativeStaff.findByIdAndUpdate(
      staffMemberId,
      req.body,
      { new: true }
    );
    if (!updatedStaffMember) {
      return res.status(404).json({ error: 'Administrative staff member not found' });
    }
    res.json(updatedStaffMember);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update administrative staff member' });
  }
};

// Delete an administrative staff member by ID
const deleteAdministrativeStaffById = async (req, res) => {
  try {
    const staffMemberId = req.params.id;
    const deletedStaffMember = await AdministrativeStaff.findByIdAndDelete(staffMemberId);
    if (!deletedStaffMember) {
      return res.status(404).json({ error: 'Administrative staff member not found' });
    }
    res.json({ message: 'Administrative staff member deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete administrative staff member' });
  }
};

module.exports = {
  createAdministrativeStaff,
  getAllAdministrativeStaff,
  getAdministrativeStaffById,
  updateAdministrativeStaffById,
  deleteAdministrativeStaffById,
};