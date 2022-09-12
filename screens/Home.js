import React from "react"
import { View, Text, SafeAreaView, ScrollView } from "react-native"

import Movies from "../components/Movies";
import SearchBar from "../components/SearchBar"
import HeaderTabs from "../components/HeaderTabs"

export default function Home() {
  return (
    <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
      <View style={{ backgroundColor: "black", padding: 8 }}>
        <HeaderTabs/>
        <SearchBar/>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 250,
        }}
      >
        <Text
          style={{
            flex: 1,
            color: "white",
            fontSize: 22,
            lineHeight: 30,
            marginLeft: 24,
            fontWeight: "900"
          }}
        >
          Discover
        </Text>
        <Movies/>
      </ScrollView>
    </SafeAreaView>
  )
}
