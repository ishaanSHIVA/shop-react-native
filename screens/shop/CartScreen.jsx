import React from "react";
import { StyleSheet, View, Text, Button, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Color from "../../constants/Colors";
import CartItem from "../../components/shop/CartItem";
import * as CartActions from "../../store/actions/cart.actions";
import * as OrderActions from "../../store/actions/orders.actions";

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartAmount = useSelector(({ cart }) => cart.sum);

  const cartItems = useSelector((state) => {
    const transformedCart = [];

    for (const key in state.cart.items) {
      if (state.cart.items[key].quantity > 0) {
        transformedCart.push({
          productId: key,
          productTitle: state.cart.items[key].productTitle,
          productPrice: state.cart.items[key].productPrice,
          quantity: state.cart.items[key].quantity,
          sum: state.cart.items[key].sum,
        });
      }
    }
    return transformedCart.sort((a, b) => (a.productId > b.productId ? 1 : -1));
  });

  return (
    <View style={styles.cartScreen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.price}>$ {cartAmount.toFixed(2)}</Text>
        </Text>
        <Button
          color={Color.accent}
          title="Order Now"
          disabled={cartItems.length === 0}
          onPress={() => dispatch(OrderActions.addOrder(cartItems, cartAmount))}
        />
      </View>
      <View>
        <FlatList
          data={cartItems}
          renderItem={({ item }) => (
            <CartItem
              item={item}
              onRemove={() =>
                dispatch(CartActions.removeFromCart(item.productId))
              }
            />
          )}
          keyExtractor={(card) => card.productId}
        />
      </View>
    </View>
  );
};

CartScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "Your Cart",
  };
};

const styles = StyleSheet.create({
  cartScreen: {
    margin: 20,
  },
  price: {
    color: Color.primary,
  },
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
  },
});

export default CartScreen;
