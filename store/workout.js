import { createSlice } from '@reduxjs/toolkit'
import { Workout } from '../db/workout'

export const workoutSlice = createSlice({
  name: 'auth',
  initialState: {
    workout: {
      name: "",
      exercises: [
        {
          type: '',
          startTime: '',
          endTime: '', // Still ongoing
        },
      ],
      datetime: {
        nanoseconds: 0, 
        string: ''
      },
      userdata:{
        weigth: 0,
        height: 0,
        age: 0,
        gender: "",
        bodycomposition: "",
      },
      end: {
        isEnd: false,
        nanoseconds:0, 
        string: ""
      },
      duration: 0,
      calories: 0,
      distance: 0,
      location: [
        {
          latitude: 0,
          longitude: 0,
        }
      ],
    },
    state: "WAITING"
  },
  reducers: {
    startWorkout: (state, actions) => {
      state.workout = actions.payload,
      state.state = "ACTIVE"
    },
    endWorkout: (state, actions) => {
      state.workout = actions.payload.workout,
      state.state = "END"
    },
    pauseWorkout: (state, actions) => {
      state.workout = actions.payload.workout,
      state.state = "INACTIVE"
    },
    resumeWorkout: (state, actions) => {
      state.workout = actions.payload.workout,
      state.state = "ACTIVE"
    },
    changeState: (state, actions) => {
      state.workout = actions.payload.workout,
      state.state = actions.payload.state
    },
    updateWorkout: (state, actions) => {
      state.workout = actions.payload.workout,
      state.state = "UPDATE"
    },
    saveWorkout: (state, actions) => {
      state.workout = actions.payload.workout,
      state.state = "SAVE"
    },
    deleteWorkout: (state, actions) => {
      state.workout = actions.payload.workout,
      state.state = "DELETE"
    },
    setCalories: (state, actions) => {
      state.workout.calories = actions.payload
    },
    setDistance: (state, actions) => {
      state.workout.distance = actions.payload
    },
    setDuration: (state, actions) => {
      state.workout.duration = actions.payload
    },
    setLocation: (state, actions) => {
      state.workout.location = actions.payload
    },
    setName: (state, actions) => {
      state.workout.name = actions.payload
    },
    setTime: (state, actions) => {
      state.workout.time = actions.payload
    },
    setDate: (state, actions) => {
      state.workout.date = actions.payload
    },
    setExercises: (state, actions) => {
      state.workout.exercises = actions.payload
    },
    addExercise: (state, actions) => {
      state.workout.exercises.push(actions.payload)
    },
    removeExercise: (state, actions) => {
      state.workout.exercises = state.workout.exercises.filter((exercise) => exercise.id !== actions.payload.id)
    },
    updateExercise: (state, actions) => {
      state.workout.exercises = state.workout.exercises.map((exercise) => {
        if(exercise.id === actions.payload.id){
          return actions.payload
        }
        return exercise
      })
    },


  }
})

// Action creators are generated for each case reducer function
export const { startWorkout, endWorkout, addExercise, pauseWorkout, resumeWorkout, changeState, setExercises, updateExercise, removeExercise,  setTime, setDate, setDistance, setDuration, setCalories, updateWorkout, saveWorkout, deleteWorkout  } = workoutSlice.actions

export default workoutSlice.reducer