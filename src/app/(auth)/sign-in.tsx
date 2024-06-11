import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/src/constants/Colors'
import Button from '@/src/components/Button'
import { Link, Stack } from 'expo-router'

const SignInScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: 'Sign in'}} />
      <Text style={styles.label}>Email</Text>
      <TextInput 
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholder='joh@example.com'  
        enterKeyHint='next'
      />
      <Text style={styles.label}>Password</Text>
      <TextInput 
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholder=''  
        enterKeyHint='send'
        secureTextEntry
        // keyboardType='password'
      />
      <Button text='Sign In' />
      <Link href={'/(auth)/sign-up'} asChild>
        <Text style={styles.textButton}>Create an account</Text>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      padding: 10
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

export default SignInScreen