import React from "react";
import { Button } from "react-native-web";
import { FlatList, Platform, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors";
import * as productActions from "../../store/actions/products.action";

const UserProductsScreen = () => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem item={item} onSelect={() => {}}>
          <Button title="Edit" color={Colors.primary} onPress={() => {}} />
          <Button
            title="Delete"
            color={Colors.primary}
            onPress={() => {
              dispatch(productActions.deleteProduct(item.id));
            }}
          />
        </ProductItem>
      )}
    />
  );
};
