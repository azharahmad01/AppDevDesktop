import React, {useEffect, useState, useCallback} from 'react';
import { FlatList, Button, Platform,View , Text, ActivityIndicator, StyleSheet} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import HeaderButton from "../../components/UI/HeaderButton";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Colors from '../../constants/Colors';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productActions from "../../store/actions/products";


const ProductsOverviewScreen = props => {
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();


  const loadProducts = useCallback(() => {
    setError(null)
    dispatch(productActions.fetchProducts())
      .then(response => {
        setLoading(false)
      })
      .catch(err => {
        console.log("haha")
        setError(err.message)
      })
  },[dispatch])


  useEffect(() => {
    const willFocusSub = props.navigation.addListener('willFocus',loadProducts);
    return () => {
      willFocusSub.remove();
    }
  },[loadProducts])

  useEffect(() => {
    setLoading(true)
    loadProducts();
  }, [dispatch, loadProducts])


  if(error){
    return <View style={styles.container}>
      <Text>Error occured</Text>
      <Button title="Retry!" onPress={loadProducts} />
    </View>
  }

  if(loading){
    return <View style={styles.container}>
      <ActivityIndicator size='large' color={Colors.primary}/>
    </View>
  }

  if (!loading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }
  
  return (
    <FlatList
    onRefresh={loadProducts}
    refreshing={isRefreshing}
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => {
          return  <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            props.navigation.navigate('ProductDetail',{
                productId:itemData.item.id,
                title:itemData.item.title
            })
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
                props.navigation.navigate('ProductDetail',{
                    productId:itemData.item.id,
                    title:itemData.item.title
                })
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
               dispatch(cartActions.addToCart(itemData.item))
            }}
          />
        </ProductItem>
      }
    }
    />
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Products',
    headerLeft:(
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
            title="Menu"
            iconName="ios-menu"
            onPress={() => {
                navData.navigation.toggleDrawer()
            }}
            />
        </HeaderButtons>
    ),
    headerRight: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Cart"
            iconName='ios-cart'
            onPress={() => {
              navData.navigation.navigate('Cart');
            }}
          />
        </HeaderButtons>
      )
  };
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})


export default ProductsOverviewScreen;
