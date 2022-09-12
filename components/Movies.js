import React, { useEffect } from 'react';
import {
  Text,
  View,
  Image,
  Animated,
  Dimensions,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, selectAllMovies } from '../redux/movies';

const play = require("../assets/icons/play.png");

const { width, height } = Dimensions.get("window");

const Movies = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.movies);
  const movies = useSelector(selectAllMovies);

  const newSeasonScrollX = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <Animated.FlatList
        horizontal
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={width}
        scrollEventThrottle={16}
        decelerationRate={0}
        contentContainerStyle={{
          marginTop: 12,
        }}
        data={movies}
        keyExtractor={(item) => `${item.id}`}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: newSeasonScrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item, index }) => {
          return (
            <TouchableWithoutFeedback
              onPress={() =>
                console.log(item)
              }
            >
              <View
                style={{
                  width: width,
                  alignItems: "center",
                  justifyContent: "start",
                }}
              >
                <ImageBackground
                  resizeMode="cover"
                  source={{uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}}
                  style={{
                    width: width * 0.85,
                    height: height * 0.4,
                    justifyContent: "flex-end",
                  }}
                  imageStyle={{
                    borderRadius: 40,
                  }}
                >
                  <View
                    style={{
                      height: 60,
                      width: "100%",
                      marginBottom: 12,
                      paddingHorizontal: 12,
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    {/* playnow */}
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          width: 40,
                          height: 40,
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                          borderRadius: 30,
                        }}
                      >
                        <Image
                          source={play}
                          style={{
                            width: 15,
                            height: 15,
                            tintColor: "#fff",
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 16,
                          marginLeft: 8,
                          lineHeight: 22,
                        }}
                      >
                        PlayNow
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
                <View style={{ marginHorizontal: 24,  marginTop: 16 }}>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 20,
                      lineHeight: 28,
                      fontWeight: "600",
                      marginBottom: 6
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 16,
                      lineHeight: 22,
                    }}
                  >
                    {item.overview}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      />
  );
};

export default Movies;

const styles = StyleSheet.create({
  loader: {
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  container: {
    flexDirection: 'row',
    marginVertical: 10
  },
  dataContainer: {
    flexDirection: 'row'
  }
});