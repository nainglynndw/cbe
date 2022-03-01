import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useRef } from "react";
import { Storage } from "expo-storage";
import Input from "../Components/Input";
import Button from "../Components/Button";
import { useFocusEffect } from "@react-navigation/native";

const Setting = () => {
  const [centerData, setCenterData] = useState({ students: [] });

  const [key, setKey] = useState([]);
  const [saved, setSaved] = useState(false);
  const [text, setText] = useState("");

  const stuRef = useRef(null);

  const getData = async () => {
    const item = JSON.parse(await Storage.getItem({ key: "info" }));
    item && setCenterData(item);
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [])
  );

  const save = async () => {
    await Storage.setItem({
      key: "info",
      value: JSON.stringify(centerData),
    });

    await Storage.setItem({
      key: "rollCall",
      value: JSON.stringify([]),
    });

    const item = JSON.parse(await Storage.getItem({ key: "info" }));
    setSaved(!saved);
    console.log(key);
    console.log(item);
    if (item) return alert("Save Success !");
    return alert(" Save Failure !");
  };

  const addStudent = () => {
    stuRef.current.clear();
    setCenterData({
      ...centerData,
      students: [...centerData.students, text],
    });
  };

  return (
    <View style={styles.setting}>
      <ScrollView
        contentContainerStyle={{ width: "100%" }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Center ID</Text>
          <Input
            value={centerData && centerData.centerId}
            placeholder="စင်တာအမှတ်"
            onChangeText={(a) => {
              setCenterData({ ...centerData, centerId: a });
            }}
          />
          <Text style={styles.title}>Class</Text>
          <Input
            value={centerData && centerData.class}
            placeholder="အတန်း"
            onChangeText={(a) => {
              setCenterData({ ...centerData, class: a });
            }}
          />

          <Text style={styles.title}>Student's Name</Text>
          <KeyboardAvoidingView
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <View style={styles.half}>
              <Input
                ref={stuRef}
                placeholder="ကျောင်းသား/သူ"
                onChangeText={(a) => {
                  setText(a);
                }}
              />
            </View>
            <View style={styles.half}>
              <Button
                title="Add"
                onPress={() => {
                  if (!text || text === "") return alert("အမည်ဖြည့်ပါ !");
                  if (centerData.students.includes(text))
                    return alert(
                      "ရှိပြီးသားအမည် ဖြစ်နေသည် ။ အခြားအမည်ရေးပေးပါ ။"
                    );
                  return addStudent();
                }}
              />
            </View>
          </KeyboardAvoidingView>
          {centerData.students &&
            centerData.students.length > 0 &&
            centerData.students.map((s, i) => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignSelf: "center",
                  marginBottom: i + 1 === centerData.students.length ? 20 : 0,
                }}
                key={i}
                onPress={() => {
                  let a = [...centerData.students];
                  a.splice(i, 1);
                  setCenterData({ ...centerData, students: [...a] });
                }}
              >
                <View
                  style={[
                    styles.half,
                    {
                      borderColor: "green",
                      borderTopLeftRadius: i === 0 ? 5 : 0,
                      borderBottomLeftRadius:
                        i + 1 === centerData.students.length ? 5 : 0,
                      borderWidth: 2,
                      borderRightWidth: 0,
                      borderBottomWidth:
                        i + 1 === centerData.students.length ? 2 : 0,
                    },
                  ]}
                >
                  <Text>No . {i + 1}</Text>
                </View>
                <View
                  style={[
                    styles.half,
                    {
                      borderColor: "green",
                      borderTopRightRadius: i === 0 ? 5 : 0,
                      borderBottomRightRadius:
                        i + 1 === centerData.students.length ? 5 : 0,
                      borderWidth: 2,
                      borderBottomWidth:
                        i + 1 === centerData.students.length ? 2 : 0,
                    },
                  ]}
                >
                  <Text>{s}</Text>
                </View>
              </TouchableOpacity>
            ))}

          <Button
            size={18}
            title="Save"
            onPress={() => {
              if (!centerData.centerId || centerData.centerId.length === 0)
                return alert("No Center ID");
              if (!centerData.class || centerData.class.length === 0)
                return alert("No Class ");
              if (!centerData.students || centerData.students.length === 0)
                return alert("No Students ");
              return save();
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default React.memo(Setting);

const styles = StyleSheet.create({
  setting: {
    width: "100%",
    flex: 1,
    padding: 10,
    paddingTop: StatusBar.currentHeight,
    justifyContent: "center",
  },
  header: {
    padding: 10,
    backgroundColor: "#ad4faa8f",
    borderRadius: 10,
  },
  half: {
    width: "45%",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  subject: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "lightblue",
    borderRadius: 5,
    alignSelf: "center",
    margin: 5,
  },

  title: {
    fontWeight: "bold",
    letterSpacing: 0.5,
    lineHeight: 20,
  },

  t: {
    alignSelf: "center",
    textAlign: "left",
    fontSize: 12,
    color: "black",
  },
});
