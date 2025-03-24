const express = require('express');
const { createWorkout, getAllWorkouts, getWorkout, updateWorkout, deleteWorkout } = require('../controllers/workoutController');
const router = express.Router();

// get all workouts
router.get('/', getAllWorkouts);

// get single workout
router.get('/:id', getWorkout);

// post a workout
router.post('/', createWorkout);

// del a workouts
router.delete('/:id', deleteWorkout);

// update a workout
router.put('/:id', updateWorkout);

module.exports = router;
