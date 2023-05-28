import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  Pressable,
  ToastAndroid,
  Modal,
  ScrollView
} from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setUsername,
  setPassword,
  setError,
  setAuth,
} from "../redux/slices/account";
import { UserType } from "../components/Auth/types";
import { User } from "../api/users";
import { setCurrentUser } from "../redux/slices/currentUser";
import { useNavigation } from "@react-navigation/native";
import { setIsLoading } from "../redux/slices/general";
import AnimatedLottieView from "lottie-react-native";
("lottie-react-native");
import waveLoader from "../../assets/single-wave-loader.json";
import pikachuFace from "../../assets/pikachu-animated.json";
import { validateLoginInputs } from "../components/Auth/validation";

export default function Login() {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const { isLoading } = useSelector((state: any) => state.general);
  const { username, password, errors } = useSelector(
    (state: any) => state.account
  );

  const handleLogin = async () => {
    dispatch(setError({}));
    const validatedInputs = await validateLoginInputs(dispatch, {
      username,
      password,
    });

    if (validatedInputs) {
      Keyboard.dismiss();
      const userList: [] = await new User().get();
      const validUser = userList.find(
        (user: UserType) =>
          user.username == username && user.password == password
      );
      if (validUser) {
        dispatch(setIsLoading(true));
        setTimeout(() => {
          dispatch(setCurrentUser(validUser));
          dispatch(setAuth(true));

          dispatch(setIsLoading(false));
          navigation.navigate("ProfileNavigation");
        }, 2000);
      } else {
        ToastAndroid.show("User not found", ToastAndroid.SHORT);
        dispatch(setError({ invalidUser: "User not found" }));
      }
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setError({}));
      dispatch(setUsername(""));
      dispatch(setPassword(""));
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <View>
          <AnimatedLottieView
            source={pikachuFace}
            autoPlay
            loop
            style={styles.pikachuFace}
          />
        </View>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={{
            borderColor: errors.username ? "red" : "#888888",
            ...styles.input,
          }}
          placeholder="Username"
          autoCapitalize="none"
          maxLength={16}
          value={username}
          onChangeText={(value) => dispatch(setUsername(value))}
        />
        <TextInput
          style={{
            borderColor: errors.password ? "red" : "#888888",
            ...styles.input,
          }}
          placeholder="Password"
          autoCapitalize="none"
          maxLength={16}
          secureTextEntry
          value={password}
          onChangeText={(value) => dispatch(setPassword(value))}
        />
        <View>
          {(errors.username || errors.password) && (
            <Text style={styles.error}>All inputs are required.</Text>
          )}
          {errors.invalidUser && (
            <Text style={styles.error}>{errors.invalidUser}</Text>
          )}
        </View>
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.textBtn}>Enter</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Register")}>
          <View style={{ width: 180, paddingVertical: 10 }}>
            <Text style={styles.textLink}>You don't have an account?</Text>
            <Text style={{ ...styles.textLink, fontWeight: "600" }}>
              Register here
            </Text>
          </View>
        </Pressable>
        <Modal visible={isLoading} animationType="fade" transparent>
          <View style={styles.loading}>
            <AnimatedLottieView source={waveLoader} autoPlay loop speed={0.9} />
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  content: {
    paddingVertical: 25,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  pikachuFace: {
    width: 130,
    marginBottom: -42,
  },
  title: {
    fontSize: 28,
    marginVertical: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    marginVertical: 5,
    width: "80%",
    height: 40,
    fontSize: 17,
    paddingHorizontal: 25,
    borderRadius: 5,
    borderWidth: 1,
  },
  button: {
    margin: 13,
    paddingVertical: 10,
    backgroundColor: "#FFDD44",
    width: "100%",
    maxWidth: 120,
    borderRadius: 6,
    elevation: 4,
  },
  textBtn: {
    color: "black",
    textAlign: "center",
    fontWeight: "500",
  },
  textLink: {
    textAlign: "center",
    fontSize: 12,
  },
  error: {
    color: "#FF5555",
    fontSize: 12,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.65)",
  },
});
