import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { useDispatch } from 'react-redux';
import { fetchMovies } from '../redux/movies';

export default function HeaderTabs() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    dispatch(fetchMovies(activeTab))
  }, [activeTab])

  return (
    <View style={{ flexDirection: "row", alignSelf: "center" }}>
      <HeaderButton
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        value=""
        text="All"
        textColor="black"
        btnColor="white"
      />
      <HeaderButton
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        value="Bollywood"
        text="Bollywood"
        textColor="black"
        btnColor="white"
      />
      <HeaderButton
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        value="Hollywood"
        text="Hollywood"
        textColor="white"
        btnColor="black"
      />
    </View>
  )
}

const HeaderButton = (props) => (
  <TouchableOpacity
    style={{
      backgroundColor: props.activeTab === props.value ? "white" : "black",
      borderRadius: 30,
      paddingHorizontal: 16,
      paddingVertical: 8,
    }}
    onPress={() => props.setActiveTab(props.value)}
  >
    <Text
      style={{
        color: props.activeTab === props.value ? "black" : "white",
        fontWeight: "900",
        fontSize: 15,
      }}
    >
      {props.text}
    </Text>
  </TouchableOpacity>
)