import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import ProductListItem from '@components/ProductListItem';
import { useProductList } from '@/src/api/products';


export default function MenuScreen() {
  const { data: products, error, isLoading } = useProductList()

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>failed to fetch products</Text>
  }
  return (
    <FlatList  
      data={products} 
      renderItem={({ item }) => <ProductListItem product={item} />}
      contentContainerStyle={{gap: 10, padding: 10}}
      columnWrapperStyle={{gap: 10}}
      numColumns={2} />
  );
}


