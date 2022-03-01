import { StyleSheet, TextInput } from "react-native";
import React, { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  return (
    <TextInput
      value={props.value}
      ref={ref}
      placeholder={props.placeholder}
      onChangeText={props.onChangeText}
      style={styles.input}
    />
  );
});

export default React.memo(Input);

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    borderColor: "#ad4faa",
    borderWidth: 3,
    backgroundColor: "#fff",
    fontWeight: "bold",
  },
});
