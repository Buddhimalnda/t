import {
  limitToLast,
  onValue,
  orderByValue,
  query,
  ref,
} from "firebase/database";
import { FIREBASE_RDB } from "../config/firebase";

export const getStepList = async ({ user_id }) => {
  console.log("user_id: ", user_id);
  const stepsQuery = query(
    ref(FIREBASE_RDB, user_id + "/count/step/list"),
    limitToLast(7)
  );
  var steps = [];
  await onValue(stepsQuery, (snapshot) => {
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        console.log("step: ", data);
        steps = [...steps, data];
        //end of the loop
      });
    } else {
      console.log("No data available for the given date.");
    }
  });
  console.log("steps: ", steps);
  return steps;
};

export const getStepCount = async ({ user_id }) => {
  // realtime database
  let stepCount = 0;
  // Create a query to find the node where the date is equal to the queryDate
  const stepsQuery = query(ref(FIREBASE_RDB, user_id + "/count/step/step"));

  // Listen for the data that matches the query
  await onValue(stepsQuery, (snapshot) => {
    if (snapshot.exists()) {
      // snapshot.forEach((childSnapshot) => {
      //   // Here, you access the 'step' value of each item that matches the query date
      //   const data = childSnapshot.val();
      //   console.log(`Step on ${queryDate}: ${data.step}`);
      //   stepCount = data.step;
      // });
      stepCount = snapshot.val();
    } else {
      console.log("No data available for the given date. getStepCount");
    }
  });

  return stepCount;
};

export const calorieBurn = ({ met, weight, duration }) => {
  const metValue = parseFloat(met);
  const weightKg = parseFloat(weight);
  const durationHours = parseFloat(duration);
  const caloriesPerMinute = (metValue * weightKg * 3.5) / 200;
  const totalCalories = caloriesPerMinute * durationHours * 60; // convert hours to minutes
  return totalCalories.toFixed(2);
};
