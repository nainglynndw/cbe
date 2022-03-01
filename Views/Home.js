import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Storage } from "expo-storage";
import Input from "../Components/Input";
import Button from "../Components/Button";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Home = () => {
  const [rollCall, setRollCall] = useState({ present: [], students: [] });
  const [openClock, setOpenClock] = useState(false);
  const [openDate, setOpenDate] = useState(false);

  const getData = async () => {
    const item = JSON.parse(await Storage.getItem({ key: "info" }));
    item && setRollCall({ ...rollCall, ...item });
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );

  const save = async () => {
    const item = JSON.parse(await Storage.getItem({ key: "rollCall" }));
    const found = item.some(
      (el) =>
        el.date === rollCall.date &&
        el.lesson === rollCall.lesson &&
        el.startTime === rollCall.startTime
    );
    if (found) {
      alert("Error ! Preventing  Save without changes !");
    } else {
      item.push(rollCall);
      await Storage.setItem({
        key: "rollCall",
        value: JSON.stringify(item),
      });
      const items = JSON.parse(await Storage.getItem({ key: "rollCall" }));

      getData();
      if (items) return alert("Save Success !");
      return alert(" Save Failure !");
    }
  };

  const handleConfirm = (t) => {
    var time;
    if (t.getMinutes() < 10) {
      time = t.getHours() + ":0" + t.getMinutes();
    } else {
      time = t.getHours() + ":" + t.getMinutes();
    }

    if (!rollCall.startTime) {
      setRollCall({ ...rollCall, startTime: time });
      setOpenClock(false);
    } else {
      const start = parseInt(
        rollCall.startTime.substring(0, rollCall.startTime.indexOf(":"))
      );
      const end = parseInt(time.substring(0, time.indexOf(":")));
      const totalTime = end - start;
      console.log(totalTime);
      setRollCall({ ...rollCall, endTime: time, totalTime: totalTime });
      setOpenClock(false);
    }
  };

  return (
    <View style={styles.home}>
      <ScrollView style={{ width: "100%" }} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Teacher's Name</Text>
          <Input
            placeholder="ဆရာ/ဆရာမ အမည်"
            onChangeText={(a) => {
              setRollCall({ ...rollCall, teacher: a });
            }}
          />
          <Text style={styles.title}>Subjects</Text>
          <Input
            placeholder="ဘာသာရပ်"
            onChangeText={(a) => {
              setRollCall({ ...rollCall, subject: a });
            }}
          />
          <Text style={styles.title}>Lesson</Text>
          <Input
            placeholder="သင်ခန်းစာ"
            onChangeText={(a) => {
              setRollCall({ ...rollCall, lesson: a });
            }}
          />
          <Text style={styles.title}>Date</Text>
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              setOpenDate(true);
            }}
          >
            <Text style={styles.cardText}>{rollCall.date || "--/--/--"}</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <View style={styles.inner}>
              <Text style={styles.title}>Start Time</Text>
              <TouchableOpacity
                style={styles.card}
                onPress={() => {
                  delete rollCall.startTime;
                  setOpenClock(true);
                }}
              >
                <Text style={styles.cardText}>
                  {rollCall.startTime || "-- : --"}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inner}>
              <Text style={styles.title}>End Time</Text>
              <TouchableOpacity
                style={styles.card}
                onPress={() => {
                  delete rollCall.endTime;
                  setOpenClock(true);
                }}
              >
                <Text style={styles.cardText}>
                  {rollCall.endTime || "-- : --"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.title}>Total Time</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>{rollCall.totalTime || 0} hr(s)</Text>
          </View>

          <Text style={styles.title}>Total Students</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>{rollCall.students.length || 0}</Text>
          </View>

          <Text style={styles.title}>Present Students</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>{rollCall.present.length || 0}</Text>
          </View>

          <Text style={styles.title}>Absent Students</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>
              {rollCall.students.length - rollCall.present.length || 0}
            </Text>
          </View>
        </View>

        <View style={styles.rollCall}>
          {rollCall &&
            rollCall.students &&
            rollCall.students.length > 0 &&
            rollCall.students.map((a, i) => {
              const handlePresent = () => {
                const b = [...rollCall.present];
                b.push(a);
                const d = [...new Set(b)];
                setRollCall({
                  ...rollCall,
                  present: [...d],
                });
              };

              const handleAbsent = () => {
                let c = [...rollCall.present];
                const e = c.filter((g) => g !== a);

                setRollCall({ ...rollCall, present: [...e] });
              };

              return (
                <View
                  key={i}
                  style={[
                    styles.item,
                    {
                      borderBottomWidth:
                        i + 1 === rollCall.students.length ? 2 : 0,
                      borderTopLeftRadius: i === 0 ? 5 : 0,
                      borderBottomLeftRadius:
                        i + 1 === rollCall.students.length ? 5 : 0,
                      borderTopRightRadius: i === 0 ? 5 : 0,
                      borderBottomRightRadius:
                        i + 1 === rollCall.students.length ? 5 : 0,
                    },
                  ]}
                >
                  <Text style={styles.name}>{a}</Text>
                  <View
                    style={{
                      width: "40%",
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <TouchableOpacity
                      style={[
                        styles.btn,
                        {
                          backgroundColor: rollCall.present.includes(a)
                            ? "green"
                            : "white",
                        },
                      ]}
                      onPress={() => {
                        handlePresent();
                      }}
                    >
                      <Text style={styles.btnText}>ရှိ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.btn,
                        {
                          backgroundColor: !rollCall.present.includes(a)
                            ? "#bababa"
                            : "white",
                        },
                      ]}
                      onPress={() => handleAbsent()}
                    >
                      <Text style={styles.btnText}>ပျက်</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
        </View>
        <Button
          title="Save"
          onPress={() => {
            if (!rollCall.teacher || rollCall.teacher === "")
              return alert("Errpr ! No Teacher's Name");
            if (!rollCall.subject || rollCall.subject === "")
              return alert("Error ! No Subject");
            if (!rollCall.lesson || rollCall.lesson === "")
              return alert("Error ! No Lesson");
            if (!rollCall.date || rollCall.date === "")
              return alert("Error ! No Date");
            if (!rollCall.startTime || rollCall.startTime === "")
              return alert("Error ! No Start Time");
            if (!rollCall.endTime || rollCall.endTime === "")
              return alert("Error ! No End Time");
            return save();
          }}
        />
      </ScrollView>
      <DateTimePickerModal
        isVisible={openClock}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={() => setOpenClock(false)}
      />
      <DateTimePickerModal
        isVisible={openDate}
        mode="date"
        onConfirm={(t) => {
          setRollCall({ ...rollCall, date: t.toLocaleDateString() });
          setOpenDate(false);
        }}
        onCancel={() => setOpenDate(false)}
      />
    </View>
  );
};

export default React.memo(Home);

const styles = StyleSheet.create({
  home: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    padding: 10,
    backgroundColor: "#ad4faa8f",
    borderRadius: 10,
  },
  rollCall: {
    padding: 10,
    backgroundColor: "lightblue",
    borderRadius: 10,
    marginVertical: 10,
  },
  title: {
    fontWeight: "bold",
    letterSpacing: 0.5,
    lineHeight: 20,
  },
  item: {
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    borderWidth: 2,
    borderColor: "green",
  },
  btn: {
    backgroundColor: "white",
    elevation: 4,
    padding: 5,
    borderRadius: 10,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    width: "40%",
  },
  card: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "flex-end",
    elevation: 5,
    marginBottom: 10,
  },
  cardText: {
    fontWeight: "bold",
    color: "#2b2b2b",
  },
  name: {
    fontWeight: "bold",
    fontSize: 13,
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 12,
  },
});
