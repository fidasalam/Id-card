const express = require('express');
const router = express.Router();
const { createTemplate, getTemplates, getTemplateById, updateTemplate, deleteTemplate } = require('../controllers/idCardTemplateController');

// Route to create a new template
router.post('/templates', createTemplate);

// Route to get all templates
router.get('/templates', getTemplates);

// Route to get a single template by ID
router.get('/templates/:id', getTemplateById);

// Route to update a template
router.put('/templates/:id', updateTemplate);

// Route to delete a template
router.delete('/templates/:id', deleteTemplate);

module.exports = router;
