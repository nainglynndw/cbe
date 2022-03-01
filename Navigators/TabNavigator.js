import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "../Views/Home";
import Setting from "../Views/Setting";
import Sheet from "../Views/Sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#f0edf6"
      inactiveColor="#5e185c"
      barStyle={{ backgroundColor: "#ad4faa" }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Sheet"
        component={Sheet}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="file-excel" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="tools" size={26} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default React.memo(TabNavigator);
