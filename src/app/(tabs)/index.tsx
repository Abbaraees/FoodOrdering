import { View, FlatList } from 'react-native';
import products from '@/assets/data/products';
import ProductListItem from '@components/ProductListItem';

const product = products[1];

export default function MenuScreen() {
  return (
    <FlatList  
      data={products} 
      renderItem={({ item }) => <ProductListItem product={item} />}
      contentContainerStyle={{gap: 10, padding: 10}}
      columnWrapperStyle={{gap: 10}}
      numColumns={2} />
  );
}


