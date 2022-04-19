import React from "react";
import { Platform, StyleSheet, FlatList, View, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/Colors";

import ProductItem from "../../components/shop/ProductItem";
import * as cartAction from "../../store/actions/cart.actions";

// button
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

const ProductOverviewScreen = ({ navigation }) => {
  const products = useSelector((state) => state.products.availableProducts);

  const dispatch = useDispatch();

  const addToCart = (item) => dispatch(cartAction.addToCart(item));

  const selectItemHandler = (id, title) => {
    navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(prod) => prod.id}
      renderItem={({ item }) => {
        return (
          <ProductItem
            item={item}
            onSelect={() => selectItemHandler(item.id, item.title)}
          >
            <View style={styles.actions}>
              <Button
                color={Colors.primary}
                title="View Details"
                onPress={() => selectItemHandler(item.id, item.title)}
              />
              <Button
                color={Colors.primary}
                title="To Cart"
                onPress={addToCart.bind(this, item)}
              />
            </View>
          </ProductItem>
        );
      }}
    />
  );
};

ProductOverviewScreen.navigationOptions = ({ navigation }) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "ios" ? "ios-menu" : "md-menu"}
          onPress={() => {
            console.log("Menu clicked");
            navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="CART"
          iconName={Platform.OS === "ios" ? "ios-cart" : "md-cart"}
          onPress={() => {
            console.log("CART clicked");
            navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "20%",
    paddingHorizontal: 20,
  },
});

export default ProductOverviewScreen;
