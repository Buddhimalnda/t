import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { FIREBASE_DB, FIREBASE_RDB } from "../config/firebase";
import {
  child,
  equalTo,
  get,
  onValue,
  orderByChild,
  ref,
  update,
} from "firebase/database";

export class Workout {
  constructor(
    name,
    exercises,
    datetime,
    userdata,
    end,
    duration,
    calories,
    distance,
    location
  ) {
    this.name = name;
    this.exercises = exercises;
    // [
    //   {
    //     type: exercises?.type,
    //     startTime: exercises?.startTime,
    //     endTime: exercises?.endTime,
    //   },
    // ];
    this.datetime = {
      nanoseconds: datetime?.nanoseconds,
      string: datetime?.string,
    };
    this.userdata = {
      weight: userdata?.weight,
      height: userdata?.height,
      age: userdata?.age,
      gender: userdata?.gender,
      bodycomposition: userdata?.bodycomposition,
    };
    this.end = {
      isEnd: end?.isEnd,
      nanoseconds: end?.nanoseconds,
      string: end?.string,
    };
    this.duration = duration;
    this.calories = calories;
    this.distance = distance;
    this.location = location;
    // [
    //   {
    //     latitude: 0,
    //     longitude: 0,
    //   },
    // ];
  }
}

export const createWorkout = async (workout, user_id) => {
  let workoutRef = null;
  let isExist = false;
  let workoutDocId = null;
  let arry = [];
  try {
    const q = query(
      collection(FIREBASE_DB, "workout"),
      where("user", "==", user_id)
    );
    const querySnapshot = await getDocs(q);
    await querySnapshot.forEach((snap) => {
      if (snap.data().user === user_id) {
        isExist = true;
        workoutDocId = snap.id;
        arry = snap.data().workouts;
        arry.push({ createAT: new Date().getTime(), workout: workout });
        setDoc(doc(FIREBASE_DB, "workout", snap.id), {
          ...snap.data(),
          workouts: arry,
        })
          .then(() => {
            console.log("Document successfully updated!");
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });
      }
    });
    console.log("arry", arry);
    if (!isExist) {
      arry.push({ createAT: new Date().getTime(), workout: workout });
      workoutRef = await addDoc(collection(FIREBASE_DB, "workout"), {
        user: user_id,
        workouts: arry,
      })
        .then(() => {
          console.log("Document successfully created!");
        })
        .catch((error) => {
          console.error("Error creating document: ", error);
        });
    }
  } catch (e) {
    console.log("====================================");
    console.log("Error: ", e);
    console.log("====================================");
  }
  return workoutRef;
};

export const getWorkoutlist = async (user_id) => {
  let workoutRef = null;
  let isExist = false;
  let workoutDocId = null;
  try {
    const q = query(
      collection(FIREBASE_DB, "workout"),
      where("user", "==", user_id)
    );
    const querySnapshot = await getDocs(q);
    await querySnapshot.forEach((doc) => {
      if (doc.data().user === user_id) {
        isExist = true;
        workoutDocId = doc.id;
        workoutRef = doc.data().workouts;
      }
    });
  } catch (e) {
    console.log("====================================");
    console.log("Error: ", e);
    console.log("====================================");
  }
  return workoutRef;
};

export const setColor = async ({ red, green, blue, uid }) => {
  const updates = {};
  updates["/" + uid + "/led/red"] = red;
  updates["/" + uid + "/led/green"] = green;
  updates["/" + uid + "/led/blue"] = blue;
  await update(ref(FIREBASE_RDB), updates);
};
