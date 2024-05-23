import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { _COLORS } from "../../../style";
import { limitToLast, onValue, query, ref, set } from "firebase/database";
import { getStepList } from "../../../db/stepCount";
import { FIREBASE_RDB } from "../../../config/firebase";
// { data, chartConfig, width, height }
const CountryWiseAnalysis = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const [data, setData] = useState({ labels: [], datasets: [{ data: [] }] });
  const [labelsArr, setLabelsArr] = useState([]);
  const [dataArr, setDataArr] = useState([]);
  const [length, setLength] = useState(0);
  // const setChartData = async () => {
  // const stepsQuery = query(
  //   ref(FIREBASE_RDB, "HYWBRRXdwtN7TseWcR5AKpybrqW2/count/step/list"),
  //   limitToLast(7)
  // );
  //   await onValue(stepsQuery, (snapshot) => {
  //     if (snapshot.exists()) {
  //       snapshot.forEach((childSnapshot) => {
  //         const data = childSnapshot.val();
  //         console.log("step: ", data);
  //         const date = data?.date;
  //         setLabelsArr((prev) => [
  //           ...prev,
  //           date.toString().split("-")[1] + "-" + date.toString().split("-")[2],
  //         ]);
  //         setDataArr((prev) => [...prev, data?.step]);

  //         //end of the loop
  //       });
  //     } else {
  //       console.log("No data available for the given date.");
  //     }
  //   });
  // };

  // useEffect(() => {
  //   // if (isLoaded) return;
  //   setChartData()
  //     .then(() => {
  //       setData({
  //         labels: labelsArr,
  //         datasets: [
  //           {
  //             data: dataArr,
  //           },
  //         ],
  //       });
  //       setIsLoaded(true);
  //     })
  //     .catch((e) => {
  //       console.log("Error: ", e);
  //     });
  // }, [labelsArr, dataArr]);

  // useEffect(() => {
  //   console.log("====================================");
  //   console.log("labelsArr: ", labelsArr);
  //   console.log("dataArr: ", dataArr);
  //   console.log("====================================");
  // }, [labelsArr, dataArr]);
  // const chartConfig = {
  //   backgroundGradientFrom: "#fff",
  //   backgroundGradientTo: "#fff",
  //   color: (opacity = 1) => _COLORS.primary,
  //   labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  //   strokeWidth: 3, // optional, default 3
  // };

  const width = 350;
  const height = 220;
  if (!isLoaded) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Country Wise Analysis</Text>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Country Wise Analysis</Text>
        {data && data.labels.length === 0 ? (
          <Text>No data available</Text>
        ) : (
          <BarChart
            data={data}
            width={width}
            height={height}
            yAxisLabel=""
            chartConfig={chartConfig}
            verticalLabelRotation={30}
          />
        )}
        <Text style={styles.footer}>Most steps taken by: Italy</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 5,
    padding: 5,
    marginVertical: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  footer: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default CountryWiseAnalysis;
