import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const Button = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.btn}>
      <Text style={[styles.btnText, { fontSize: props.size }]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(Button);

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#5e185c",
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    marginBottom: 10,
  },
  btnText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
});
