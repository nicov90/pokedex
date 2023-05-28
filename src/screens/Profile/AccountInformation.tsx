import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';

export default function AccountInformation() {
  const { currentUser } = useSelector((state: any) => state.currentUser);
  const { email, firstname, lastname, username, password } = currentUser;

  return (
    <View style={styles.container}>
      <View style={styles.propertyContainer}>
        <Text style={styles.propertyName}>Firstname</Text>
        <Text style={styles.text}>{firstname}</Text>
      </View>
      <View style={styles.propertyContainer}>
        <Text style={styles.propertyName}>Lastname</Text>
        <Text style={styles.text}>{lastname}</Text>
      </View>
      <View style={styles.propertyContainer}>
        <Text style={styles.propertyName}>Email</Text>
        <Text style={styles.text}>{email}</Text>
      </View>
      <View style={styles.propertyContainer}>
        <Text style={styles.propertyName}>Username</Text>
        <Text style={styles.text}>{username}</Text>
      </View>
      <View style={styles.propertyContainer}>
        <Text style={styles.propertyName}>Password</Text>
        <Text style={styles.text}>{password}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.65)'
  },
  propertyContainer: {
    padding: 15,
    borderBottomWidth: 2,
    
  },
  propertyName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontStyle: 'italic',
  },
})