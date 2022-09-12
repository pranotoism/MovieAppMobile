import React, { useState } from "react"
import { View, Text } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"

import { useDispatch } from 'react-redux';
import { fetchMovies } from '../redux/movies';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("")

  return (
    <View style={{ marginHorizontal: 16, marginTop: 12, flexDirection: "row" }}>
      <GooglePlacesAutocomplete placeholder="Search Movies"
        textInputProps={{
          onChangeText: (text) => setTitle(text),
          onSubmitEditing: () => dispatch(fetchMovies(title))
        }}
        style={{
          textInput: {
            backgroundColor: "black",
            borderRadius: 20,
            fontWeight: "700",
            marginTop: 7,
          },
          textInputContainer: {
            backgroundColor: "black",
            borderRadius: 50,
            flexDirection: "row",
            alignItems: "center",
            marginRight: 10,
          }
        }}
        renderRightButton={() => (
          <View
            onTouchStart={() => dispatch(fetchMovies(title))}
            style={{
              flexDirection: "row",
              marginHorizontal: 8,
              backgroundColor: "black",
              padding: 6,
              borderRadius: "50%",
              alignItems: "center"
            }}
          >
            <Text style={{color: "white"}}>Search</Text>
          </View>
        )}
      />
    </View>
  )
}
