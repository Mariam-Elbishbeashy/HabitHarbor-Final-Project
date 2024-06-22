const express = require('express');
const analysisRoutes = express.Router();
const AnalysisController = require('../controllers/Analysis');

analysisRoutes.get('/analysis/countHabits/:username', AnalysisController.countUserHabits);
analysisRoutes.get('/analysis/habits/:username', AnalysisController.getUserHabits);
analysisRoutes.get('/analysis/totalHabitsPerMonth/:username', AnalysisController.getTotalHabitsPerMonth);
analysisRoutes.get('/analysis/getHabitsByDate/:username/:month/:day', AnalysisController.getHabitsByUserAndDate);

module.exports = analysisRoutes;