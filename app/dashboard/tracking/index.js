import { Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { _COLORS } from '../../../style'
import { useSelector, useDispatch } from 'react-redux'
// import { calculateCaloriesBurned,  getTimeDuration } from '../../../lib/functions'
import { endWorkout, startWorkout } from '../../../store/workout'
import CustomPanel from './CustomPanel'
import EditUserDetails from './editUserDetails'
import { calculateCaloriesBurned, formatTimeDurationInMilliseconds, getTimeDurationInMilliseconds, stateChange } from '../../../lib/functions'
import MapComponent from './mapView'
import { createWorkout } from '../../../db/workout'
import StartWorkout from './startWorkout'

function Tracking() {
  const workoutDetails = useSelector((state) => state?.workout)
  const userDetails = useSelector((state) => state?.auth)
  // const [workout, setWorkout] = useState({
  //   name: "",
  //   exercises: [
  //     {
  //       type: '',
  //       startTime: '',
  //       endTime: '', // Still ongoing
  //     },
  //   ],
  //   datetime: {
  //     nanoseconds: 0, 
  //     string: ''
  //   },
  //   userdata:{
  //     weigth: 0,
  //     height: 0,
  //     age: 0,
  //     gender: "",
  //     bodycomposition: "",
  //   },
  //   end: {
  //     isEnd: false,
  //     nanoseconds:0, 
  //     string: ""
  //   },
  //   duration: 0,
  //   calories: 0,
  //   distance: 0,
  //   location: [
  //     {
  //       latitude: 0,
  //       longitude: 0,
  //     }
  //   ],
  // })
  const [duration, setDuration] = useState("00:00:00")
  const [calories, setCalories] = useState(0)
  const dispatch = useDispatch()
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isWorkoutStart, setIsWorkoutStart] = useState(false)
  useEffect(() => {
    if(workoutDetails?.state === "WAITING"){
      alert("workout Not start. Please start workout?")
      setIsWorkoutStart(false)
    }
    else if(workoutDetails?.state === "END"){
      alert("workout End. Please start workout?")
      setIsWorkoutStart(false)
    }
    else{
      setIsWorkoutStart(true)
      setCalories(calculateCaloriesBurned(workoutDetails, new Date().getTime()).toString())
    }
  }, [workoutDetails])

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(formatTimeDurationInMilliseconds(workoutDetails?.workout?.datetime?.nanoseconds, new Date().getTime()).toString())
      // You can clear the interval based on some condition, e.g., after a certain duration
      // clearInterval(interval);
    }, 1000);
  }, [workoutDetails])

  
  const [submittedData, setSubmittedData] = useState("");
  const [panelVisible, setPanelVisible] = useState(false);

  const handleOpenPanel = () => {
    setPanelVisible(true);
  };

  const handleClosePanel = () => {
    setPanelVisible(false);
  };
  
  const handleSubmitData = (data) => {
    setSubmittedData(data);
  };
//-----------------------------------------
  const [panelVisible2, setPanelVisible2] = useState(false);
  const [submittedData2, setSubmittedData2] = useState('');

  const handleOpenPanel2 = () => {
    setPanelVisible2(true);
  };

  const handleClosePanel2 = () => {
    setPanelVisible2(false);
  };
  
  const handleSubmitData2 = (data) => {
    setSubmittedData2(data);
  };

  

  

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
  const handleStartWorkout =  ({name }) => {
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
  }

  if(isWorkoutStart){

    return (
      <View style={styles.container}>
        <View style={styles.mapView}>
          {/* <MapComponent /> */}
        </View>
        <View style={styles.infoView}>
          <View style={styles.animateIcon}>
            <Text>{stateChange("RUNNING")}</Text>
          </View>
          <View style={styles.duration}>
            <Text style={styles.durationText}>{duration}</Text>
            <Button title='end' color={_COLORS.danger} onPress={handleEndWorkout} />
          </View>
          <View style={styles.info}>
            <ScrollView>
              <View style={styles.infoTitle}>
                <View>
                  <Text style={{fontSize: 20, fontWeight: 'bold', color: _COLORS.black}}>Name: {workoutDetails?.workout?.name}</Text>
                  <Text style={{fontSize: 14, color: _COLORS.black}}>Start: {workoutDetails?.workout?.datetime?.nanoseconds}</Text>
                  <Text style={{fontSize: 14, color: _COLORS.black}}>End: {workoutDetails?.workout?.end?.isEnd ? workoutDetails?.end?.string : "Not yet finish "}</Text>
                </View>
                <View>
                  <Text style={{fontSize: 16, fontWeight: 'bold', color: _COLORS.black}}>Distance:</Text>
                  <Text style={{fontSize: 16, color: _COLORS.black}}> {workoutDetails?.workout?.distance} </Text>
                </View>
              </View>
              <View style={[styles.infoTitle, {marginVertical: 5}]}>
                <View>
                  <Text style={{fontSize: 20, fontWeight: 'bold', color: _COLORS.black}}>User Details</Text>
                  <Text style={{fontSize: 14, color: _COLORS.black}}>Weight: {workoutDetails?.workout?.userdata?.weigth}</Text>
                  <Text style={{fontSize: 14, color: _COLORS.black}}>Height: {workoutDetails?.workout?.userdata?.height}</Text>
                  <Text style={{fontSize: 14, color: _COLORS.black}}>Age: {workoutDetails?.workout?.userdata?.age}</Text>
                  <Text style={{fontSize: 14, color: _COLORS.black}}>Gender: {workoutDetails?.workout?.userdata?.gender}</Text>
                  <Text style={{fontSize: 14, color: _COLORS.black}}>Body Composition: {workoutDetails?.workout?.userdata?.bodycomposition}</Text>
                </View>
                <View>
                  <View>
                    <Button title="Edit" onPress={handleOpenPanel} />
                    <CustomPanel
                      isVisible={panelVisible}
                      onClose={handleClosePanel}
                      onSubmit={handleSubmitData}
                      Rx={<EditUserDetails />}
                    />
                  </View>
                </View>
              </View>
              
            </ScrollView>
            <View style={styles.caloriesburned}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: _COLORS.black}}>{calories}</Text>
            </View>
            
          </View>
        </View>
        
      </View>
    )
  }else{
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View>
          <Button title="Start Workoutr" onPress={handleOpenPanel2} />
          <CustomPanel
            isVisible={panelVisible2}
            onClose={handleClosePanel2}
            onSubmit={handleSubmitData2}
            Rx={<StartWorkout handleStartWorkout={handleStartWorkout} />}
          />
        </View>
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  container:{
  },
  mapView:{
    width: '100%',
    height: 300,
    backgroundColor: 'red'
  },
  infoView:{
    width: '100%',
    height: "100%",
  },
  animateIcon:{
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 6,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 50,
    top: -50
  },
  info:{
    top: -70,
    marginHorizontal: 20,
  },
  infoTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  duration:{
    top: -80,
    right: 10,
    marginHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  durationText:{
    fontSize: 25,
    fontWeight: 'bold',
    color: _COLORS.black,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 6,
    marginHorizontal: 'auto',
  },
  caloriesburned:{
    height: 50,
    width: 200,
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 6,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 10,
  }
})

export default Tracking