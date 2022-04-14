import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { useSelector } from "react-redux";

import Color from "../../constants/Colors";

const CartScreen = () => {
  const cartItems = useSelector((state) => state.cart.items);

  const cartAmount = useSelector((state) => state.cart.sum);
  console.log(cartItems);

  return (
    <View style={styles.cartScreen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.price}>$ {cartAmount}</Text>
        </Text>
        <Button title="Order Now" />
      </View>
      {/* <FlatList date={}  /> */}
      <View>
        {/* {cartItems && cartItems.map((cartItem) => <Text>{cartItem}</Text>)} */}
        <Text>Blue shirt</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartScreen: {
    margin: 20,
  },
  price: {},
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    color: Color.accent,
  },
});

export default CartScreen;
