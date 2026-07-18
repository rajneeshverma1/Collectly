/**
 * @file reminderController.js
 * @description Controllers for managing automated reminder configurations.
 */
const ReminderConfiguration = require("../models/ReminderConfiguration");

/**
 * Get all reminder configurations for an organization
 */
exports.getConfigurations = async (req, res, next) => {
  try {
    const organizationId = req.user.organizationId;
    const configs = await ReminderConfiguration.findAll({
      where: { organizationId },
      order: [["offsetDays", "ASC"]]
    });

    res.status(200).json({
      status: "success",
      data: { configs }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new reminder configuration
 */
exports.createConfiguration = async (req, res, next) => {
  try {
    const { offsetDays, templateSubject, templateBody, isActive } = req.body;
    const organizationId = req.user.organizationId;

    const config = await ReminderConfiguration.create({
      organizationId,
      offsetDays,
      templateSubject,
      templateBody,
      isActive: isActive !== undefined ? isActive : true
    });

    res.status(201).json({
      status: "success",
      data: { config }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update an existing reminder configuration
 */
exports.updateConfiguration = async (req, res, next) => {
  try {
    const { id } = req.params;
    const organizationId = req.user.organizationId;

    const config = await ReminderConfiguration.findOne({
      where: { id, organizationId }
    });

    if (!config) {
      return res.status(404).json({ status: "fail", message: "Configuration not found" });
    }

    await config.update(req.body);

    res.status(200).json({
      status: "success",
      data: { config }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a reminder configuration
 */
exports.deleteConfiguration = async (req, res, next) => {
  try {
    const { id } = req.params;
    const organizationId = req.user.organizationId;

    const deleted = await ReminderConfiguration.destroy({
      where: { id, organizationId }
    });

    if (!deleted) {
      return res.status(404).json({ status: "fail", message: "Configuration not found" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
