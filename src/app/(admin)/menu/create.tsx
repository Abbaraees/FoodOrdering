import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import Button from '@/src/components/Button'
import { defaultPizzaImage } from '@/src/components/ProductListItem'
import Colors from '@/src/constants/Colors'
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from 'expo-router'

const CreateProductScreen = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [errors, setErrors] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const { id } = useLocalSearchParams()
  const isUpdating = !!id;

  const onCreate = () => {
    if (!validateInputs()) {
      return
    }

    console.warn("Creating Product: ", name)

    resetFields()
    setImage(null)
  }

  const validateInputs = () => {
    setErrors('')
    if (!name) {
      setErrors('Name is required')
      return false
    }
    if (!price) {
      setErrors('Price is required')
      return false
    }
    if (isNaN(parseFloat(price))) {
      setErrors('Price is not a number')
      return false
    }

    return true
  }

  const resetFields = () => {
    setName('')
    setPrice('')
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate()
    } else {
      onCreate()
    }
  }

  const onUpdate = () => {
    if (!validateInputs()) {
      return
    }
    console.warn("Update: ", name)

    resetFields()
  }

  const confirmDelete = () => {
    Alert.alert("Confirm Delete", "Are you sure?", [
      {text: 'Cancel'},
      {text: 'Delete', style: 'destructive', onPress: onDelete}, 
    ])
  }

  const onDelete = () => {
    console.warn("DELETE!!!")
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: isUpdating ? "Update Product" : "Create Product"}} />
      <Image source={{uri: image || defaultPizzaImage}} style={styles.image} />
      <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput 
        value={name}
        onChangeText={setName}
        placeholder='Name' 
        style={styles.input} 
      />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput 
        value={price}
        onChangeText={setPrice}
        placeholder='9.99' 
        style={styles.input} 
        keyboardType='numeric'
      />

      {errors && <Text style={{color: 'red'}}>{errors}</Text>}
      <Button text={isUpdating ? 'Update' : 'Create'} onPress={onSubmit}/>
      { isUpdating && <Text  onPress={confirmDelete} style={styles.textButton}>Delete</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10
    },
    image: {
      width: '50%',
      aspectRatio: 1,
      alignSelf: 'center'
    },
    textButton: {
      alignSelf: 'center',
      color: Colors.light.tint,
      fontWeight: 'bold',
      marginVertical: 10
    },
    label: {
        color: 'gray',
        fontSize: 14
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 10,
        // borderWidth: 1,
        borderColor: 'gray'
    }
})
export default CreateProductScreen