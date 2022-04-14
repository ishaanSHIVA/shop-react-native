import React from "react";
import { Platform, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import * as cartAction from "../../store/actions/cart.actions";
import HeaderButton from "../../components/UI/HeaderButton";

const ProductOverviewScreen = ({ navigation }) => {
  const products = useSelector((state) => state.products.availableProducts);

  const cartItems = useSelector((state) => state.cart.items);
  console.log(cartItems);

  const dispatch = useDispatch();

  const addToCart = (item) => dispatch(cartAction.addToCart(item));

  // navigation.setParams({id: })
  return (
    <FlatList
      data={products}
      keyExtractor={(prod) => prod.id}
      renderItem={({ item }) => {
        return (
          <ProductItem
            item={item}
            addCart={addToCart.bind(this, item)}
            onViewDetail={() =>
              navigation.navigate("ProductDetail", {
                productId: item.id,
                title: item.title,
                addCart: addToCart.bind(this, item),
              })
            }
          />
        );
      }}
    />
  );
};

ProductOverviewScreen.navigationOptions = ({ navigation }) => {
  return {
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

const styles = StyleSheet.create({});

export default ProductOverviewScreen;
