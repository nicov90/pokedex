import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Keyboard,
  Modal,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import AnimatedLottieView from "lottie-react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuth,
  setEmail,
  setError,
  setFirstname,
  setLastname,
  setPassword,
  setUsername,
} from "../redux/slices/account";
import waveLoader from "../../assets/single-wave-loader.json";
import { validateRegisterInputs } from "../components/Auth/validation";
import { User } from "../api/users";
import { UserType, UserTypeWithId } from "../components/Auth/types";
import { setErrorMessage } from "../redux/slices/register";
import { setIsLoading } from "../redux/slices/general";
import { setCurrentUser } from "../redux/slices/currentUser";

export default function Register() {
  const userApi = new User();
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const { isLoading } = useSelector((state: any) => state.general);
  const { email, firstname, lastname, username, password, errors } =
    useSelector((state: any) => state.account);
  const { errorMessage } = useSelector((state: any) => state.register);

  const handleRegister = async () => {
    const validatedInputs = await validateRegisterInputs(dispatch, {
      email,
      firstname,
      lastname,
      username,
      password,
    });

    if (validatedInputs) {
      dispatch(setIsLoading(true));
      setTimeout(async () => {
        const newUserObj: UserType = {
          email,
          username,
          firstname,
          lastname,
          password,
          favorites: [],
        };
        await userApi
          .create(newUserObj)
          .then((data) => {
            const createdUser = data.find(
              (user: UserTypeWithId) => user.email === email
            );
            dispatch(setCurrentUser(createdUser!));
            dispatch(setAuth(true));
            dispatch(setErrorMessage(""));
            dispatch(setIsLoading(false));
            navigation.navigate("ProfileNavigation");
          })
          .catch((err) => {
            dispatch(setErrorMessage(err.message));
            dispatch(setIsLoading(false));
          });
      }, 2000);
      Keyboard.dismiss();
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setError({}));
      dispatch(setEmail(""));
      dispatch(setFirstname(""));
      dispatch(setLastname(""));
      dispatch(setPassword(""));
      dispatch(setUsername(""));
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={{
            borderColor: errors.username ? "red" : "#888888",
            ...styles.input,
          }}
          placeholder="Email"
          autoCapitalize="none"
          maxLength={32}
          value={email}
          onChangeText={(value) => dispatch(setEmail(value))}
        />
        <TextInput
          style={{
            borderColor: errors.username ? "red" : "#888888",
            ...styles.input,
          }}
          placeholder="Firstname"
          autoCapitalize="none"
          maxLength={16}
          value={firstname}
          onChangeText={(value) => dispatch(setFirstname(value))}
        />
        <TextInput
          style={{
            borderColor: errors.username ? "red" : "#888888",
            ...styles.input,
          }}
          placeholder="Lastname"
          autoCapitalize="none"
          maxLength={16}
          value={lastname}
          onChangeText={(value) => dispatch(setLastname(value))}
        />
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
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}
          {(errors.email ||
            errors.firstname ||
            errors.lastname ||
            errors.username ||
            errors.password) && (
            <Text style={styles.error}>All inputs are required</Text>
          )}
          {errorMessage !== "" && (
            <Text style={styles.error}>{errorMessage}</Text>
          )}
        </View>
        <Pressable style={styles.button} onPress={handleRegister}>
          <Text style={styles.textBtn}>Enter</Text>
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
  },
  content: {
    paddingVertical: 40,
    height: '100%',
    alignItems: "center",
    justifyContent: "center",
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
  error: {
    color: "#FF5555",
    fontSize: 12,
  },
  loading: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.65)",
  },
});
