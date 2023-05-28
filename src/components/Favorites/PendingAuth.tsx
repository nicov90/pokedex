import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Pressable } from 'react-native';

export default function PendingAuth() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Log in to see your favorite pokemons</Text>
      <Pressable style={styles.goToBtn} onPress={()=>navigation.navigate("AccountNavigation")}>
        <Text style={styles.textBtn}>Take me there</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.65)'
  },
  diglett: {
    position: 'absolute',
    top: 75,
    width: 150,
  },
  text: {
    width: '90%',
    maxWidth: 200,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
  goToBtn: {
    backgroundColor: '#DC143C',
    padding: 10,
    margin: 12,
    borderRadius: 5,
    elevation: 4,
  },
  textBtn: {
    color: 'white',
  }
})