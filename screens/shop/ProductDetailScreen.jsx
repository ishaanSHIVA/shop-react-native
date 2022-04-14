import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  ScrollView,
  Image,
} from "react-native";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";

const ProductDetail = ({ navigation }) => {
  const id = navigation.getParam("productId");

  const addCart = navigation.getParam("addCart");
  console.log("cart ", addCart);
  const productSelected = useSelector((state) =>
    state.products.availableProducts.find((p) => p.id === id)
  );
  console.log(productSelected.imageUrl);
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: productSelected.imageUrl }} />
      <View style={{ backgroundColor: Colors.primary }}>
        <Button
          color={Platform.OS === "ios" ? "white" : Colors.primary}
          title="Add to cart"
          onPress={addCart}
        />
      </View>

      <Text style={styles.price}>$ {productSelected.price.toFixed(2)}</Text>
      <Text style={styles.detail}>{productSelected.description}</Text>
    </ScrollView>
  );
};

ProductDetail.navigationOptions = ({ navigation }) => {
  const title = navigation.getParam("title");
  return {
    headerTitle: title,
  };
};

const styles = StyleSheet.create({
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },
  detail: {
    fontSize: 24,
    textAlign: "center",
    margin: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
});

export default ProductDetail;
