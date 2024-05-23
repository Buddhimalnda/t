export function getTimeDurationInMilliseconds(startTimeInMilliseconds, endTimeInMilliseconds) {
    // Calculate the difference in milliseconds
    let durationInMilliseconds = endTimeInMilliseconds - startTimeInMilliseconds;

    // Handle case where endTime is on the next day or later
    if (durationInMilliseconds < 0) {
        // In this case, you might want to handle the negative duration differently,
        // depending on your application's logic
        durationInMilliseconds = Math.abs(durationInMilliseconds);
    }

    // Convert duration to various units
    const milliseconds = durationInMilliseconds;
    const seconds = milliseconds / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;

    return {
        milliseconds,
        seconds,
        minutes,
        hours
    };
}

export function formatTimeDurationInMilliseconds(startTimeInMilliseconds, endTimeInMilliseconds) {
    // Calculate the difference in milliseconds
    let durationInMilliseconds = endTimeInMilliseconds - startTimeInMilliseconds;

    // Handle case where endTime is on the next day or later
    if (durationInMilliseconds < 0) {
        // In this case, you might want to handle the negative duration differently,
        // depending on your application's logic
        durationInMilliseconds = Math.abs(durationInMilliseconds);
    }

    // Convert duration to hours, minutes, and seconds
    const seconds = Math.floor(durationInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingSeconds = seconds % 60;
    const remainingMinutes = minutes % 60;

    // Format the time string
    const formattedTime = `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;

    return formattedTime;
}

export const calculateCaloriesBurned=(workoutData, currentTime)=> {
    const weightInKg = workoutData?.workout?.userdata?.weigth;
    // Define MET values for different exercises
    const METs = {
      running: 9.8,
      walking: 3.3,
      stretching: 2.3,
      jumping: 8.0,
    };
  
    let totalCaloriesBurned = 0;
  
    // Iterate through exercises and calculate calories for each
    workoutData?.workout?.exercises.forEach(exercise => {
      const exerciseMET = METs[exercise.type] || 0;
      const startTime = new Date(exercise.startTime).getTime();
      const endTime = exercise.endTime ? new Date(exercise.endTime).getTime() : currentTime;
      const durationInHours = (endTime - startTime) / 3600000; // Convert milliseconds to hours
  
      // Calories burned for this exercise
      const caloriesBurned = exerciseMET * weightInKg * durationInHours;
      totalCaloriesBurned += caloriesBurned;
    });
  
    return Math.floor(totalCaloriesBurned);
  }

export const stateChange = (state) => {
    let text = "";
    switch (state) {
        case "RUNNING":
            text = "Running";
            break;
        case "WALKING":
            text = "Walking";
            break;
        case "STRETCHING":
            text = "Stretching";
            break;
        case "JUMPING":
            text = "Jumping";
            break;
        case "IDLE":
            text = "Idle";
            break;
        default:
            text = "Waiting";
            break;
        }
        return text;
}