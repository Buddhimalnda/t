import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { _COLORS } from '../../style'
import { useDispatch } from 'react-redux'
import { formatTimeDurationInMilliseconds, getTimeDuration } from '../../lib/functions'
import { useSelector } from 'react-redux'
import { endWorkout, startWorkout } from '../../store/workout'
import { handleStartWorkout } from './tracking'
import CustomPanel from './tracking/CustomPanel'
import StartWorkout from './tracking/startWorkout'
import { createWorkout } from '../../db/workout'

const Workout = () => {
    const [isStart, setIsStart] = useState(false)
    const dispatch = useDispatch()

    const workoutDetails = useSelector((state) => state?.workout)
    const [duration, setDuration] = useState(0)

    useEffect(() => {
        if(workoutDetails?.state === "WAITING"){
            // alert("workout Not start. Please start workout?")
            setIsStart(false)
          }
          else if(workoutDetails?.state === "END"){
            // alert("workout End. Please start workout?")
            setIsStart(false)
          }
          else{
            setIsStart(true)
          }
    }, [workoutDetails])
    
    
    const [panelVisible2, setPanelVisible2] = useState(false);
    const [submittedData2, setSubmittedData2] = useState('');
  
    const handleOpenPanel2 = () => {
      setPanelVisible2(true);
    };
  
    const handleClosePanel2 = () => {
      setPanelVisible2(false);
    };
    
    const handleSubmitData2 = (data) => {
    //   setSubmittedData(data);
    };
  
    const handleStartWorkout =  ({ name }) => {
        const time = new Date()
        const workoutData = {
          name: name,
          exercises: [],
          datetime: {
            nanoseconds: time.getTime(), 
            string: time.toString()
          },
          userdata:{
            weigth: 70,
            height: 0,
            age: 0,
            gender: "",
            bodycomposition: "",
          },
          end: {
            isEnd: false,
            nanoseconds: 0, 
            string: ""
          },
          duration: 0,
          calories: 0,
          distance: 0,
          location: [],
        }
        dispatch(startWorkout(workoutData))
        handleClosePanel2()
    }
    useEffect(() => {
        const interval = setInterval(() => {
          setDuration(formatTimeDurationInMilliseconds(workoutDetails?.workout?.datetime?.nanoseconds, new Date().getTime()).toString())
          // You can clear the interval based on some condition, e.g., after a certain duration
          // clearInterval(interval);
        }, 1000);
      }, [workoutDetails])
  const handleEndWorkout = () => {
    Alert.alert(
      "End Workout",
      "Are you sure to end workout?",
      [
        {
          text: "Cancel",
          onPress: () => {
          },
          style: "cancel"
        },
        
        { text: "OK", onPress: () => {
          const workout = {
            name: workoutDetails?.workout?.name,
            exercises: workoutDetails?.workout?.exercises,
            datetime: workoutDetails?.workout?.datetime,
            userdata: workoutDetails?.workout?.userdata,
            end: {
              isEnd: true,
              nanoseconds: new Date().getTime(),
              string: new Date().toString()
            },
            duration: workoutDetails?.workout?.duration,
            calories: workoutDetails?.workout?.calories,
            distance: workoutDetails?.workout?.distance,
            location: workoutDetails?.workout?.location,
          }
          console.log(workout);
          const data = createWorkout(workout, "HYWBRRXdwtN7TseWcR5AKpybrqW2")
          data.then((res) => {
            console.log(res);
            dispatch(endWorkout(workout))
          }).catch((err) => {
            console.log(err);
          })
        } }
      ]
    );
  }
    
  return (
    <View style={styles.workout}>
        <View style={styles.container}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: _COLORS.black}}>Workout</Text>
            <View>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: _COLORS.black}}>Last active time: </Text>
                <Text style={{fontSize: 14, color: _COLORS.black}}>Last active time: </Text>
            </View>
        </View>
        <View style={styles.container}>
            <Button  title={!isStart? "Start Workout": "end"} color={isStart? "red": ""} onPress={isStart?  handleEndWorkout:handleOpenPanel2} />
            {/* <Button title={"Start Workoutr"} onPress={handleOpenPanel2} /> */}
            <CustomPanel
                isVisible={panelVisible2}
                onClose={handleClosePanel2}
                onSubmit={handleSubmitData2}
                Rx={<StartWorkout handleStartWorkout={handleStartWorkout} />}
            />
            <Text>{isStart? duration: ""}</Text>
        </View>
    </View>
  )
}


export default Workout

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginVertical: 10,
    },
    workout: {
        marginHorizontal: 10,
        marginVertical: 10,
        borderColor: _COLORS.quaternary,
        borderWidth: 2,
        padding: 5,
        borderRadius: 10,
    }
})