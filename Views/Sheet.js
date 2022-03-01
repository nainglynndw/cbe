import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Storage } from "expo-storage";
import Input from "../Components/Input";
import Button from "../Components/Button";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Sheet = () => {
  const [rollCall, setRollCall] = useState([]);

  const getData = async () => {
    const item = JSON.parse(await Storage.getItem({ key: "rollCall" }));
    item && setRollCall([...item]);
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );

  const submit = async () => {
    alert("Need Internet");
  };

  console.log(rollCall);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.date}>{item.date}</Text>
          <View style={styles.rightHeader}>
            <Text style={styles.time}>{item.startTime} - </Text>
            <Text style={styles.time}>{item.endTime}</Text>
          </View>
          <Text style={styles.totalTime}>{item.totalTime} hr(s)</Text>
        </View>
        <Text style={styles.teacher}>{item.teacher}</Text>
        <Text style={styles.lesson}>{item.lesson}</Text>
        <Text style={styles.attendance}>
          Attendance - {item.present.length}/{item.students.length}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.sheet}>
      <FlatList
        style={{ marginBottom: 10 }}
        data={rollCall}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button
        title="Submit"
        onPress={() => {
          submit();
        }}
      />
    </View>
  );
};

export default React.memo(Sheet);

const styles = StyleSheet.create({
  sheet: {
    width: "100%",
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
    elevation: 5,
    marginBottom: 10,
  },
  date: {
    fontWeight: "bold",
    fontSize: 12,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rightHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "green",
    padding: 5,
    borderRadius: 5,
  },
  time: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#fff",
  },
  totalTime: {
    fontWeight: "bold",
    fontSize: 13,
  },
  teacher: {
    fontSize: 18,
    fontWeight: "bold",
  },
  lesson: {
    fontSize: 14,
  },
  attendance: {
    fontSize: 12,
    alignSelf: "flex-end",
    marginTop: 5,
    backgroundColor: "lightblue",
    padding: 5,
    borderRadius: 5,
    fontWeight: "bold",
  },
});
