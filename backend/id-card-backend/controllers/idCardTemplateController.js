const IDCardTemplate = require('../models/IDCardTemplate');

// Create a new template
exports.createTemplate = async (req, res) => {
  try {
    const newTemplate = new IDCardTemplate(req.body);
    await newTemplate.save();
    res.status(201).json({ message: 'Template created successfully', template: newTemplate });
  } catch (error) {
    res.status(400).json({ message: 'Error creating template', error });
  }
};

// Get all templates
exports.getTemplates = async (req, res) => {
  try {
    const templates = await IDCardTemplate.find();
    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving templates', error });
  }
};

// Get a single template by ID
exports.getTemplateById = async (req, res) => {
  try {
    const template = await IDCardTemplate.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }
    res.status(200).json(template);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving template', error });
  }
};

// Update a template
exports.updateTemplate = async (req, res) => {
  try {
    const updatedTemplate = await IDCardTemplate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTemplate) {
      return res.status(404).json({ message: 'Template not found' });
    }
    res.status(200).json({ message: 'Template updated successfully', template: updatedTemplate });
  } catch (error) {
    res.status(400).json({ message: 'Error updating template', error });
  }
};

// Delete a template
exports.deleteTemplate = async (req, res) => {
  try {
    const deletedTemplate = await IDCardTemplate.findByIdAndDelete(req.params.id);
    if (!deletedTemplate) {
      return res.status(404).json({ message: 'Template not found' });
    }
    res.status(200).json({ message: 'Template deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting template', error });
  }
};
