import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";

const Splash = (props) => {
  useEffect(() => {
    const timing = setTimeout(() => {
      props.navigation.reset({
        index: 0,
        routes: [{ name: "Tab" }],
      });
    }, 3500);

    return () => {
      clearTimeout(timing);
    };
  }, []);

  return (
    <View style={styles.loading}>
      <LottieView
        autoPlay
        loop
        style={{
          width: 200,
          height: 200,
          backgroundColor: "#fff",
        }}
        source={require("../assets/animation/loading.json")}
      />
    </View>
  );
};

export default React.memo(Splash);

const styles = StyleSheet.create({
  loading: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
