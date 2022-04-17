import React from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from "react-native";

import Colors from "../../constants/Colors";

const ProductItem = ({ item, onSelect, children }) => {
  let TouchableContent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version >= "2.0") {
    TouchableContent = TouchableNativeFeedback;
  }
  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableContent onPress={onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image
                style={{ height: "100%" }}
                source={{ uri: item.imageUrl }}
              />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>$ {item.price.toFixed(2)}</Text>
            </View>
            {children}
          </View>
        </TouchableContent>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300, //tweek
    margin: 20,
    overflow: "hidden",
  },
  title: { fontSize: 18, marginVertical: 4, fontFamily: "open-sans" },

  price: {
    fontSize: 14,
    color: "#888",
    fontFamily: "open-sans",
  },
  details: {
    alignItems: "center",
    height: "20%",
    fontFamily: "open-sans-bold",
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default ProductItem;
