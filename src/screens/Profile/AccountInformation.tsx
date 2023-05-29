import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  Modal,
  ToastAndroid,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setIsLoading } from "../../redux/slices/general";
import { setAuth } from "../../redux/slices/account";
import { resetCurrentUser } from "../../redux/slices/currentUser";
import { useDispatch } from "react-redux";
import { UserTypeWithId } from "../../components/Auth/types";
import { User } from "../../api/users";
import AnimatedLottieView from "lottie-react-native";
import waveLoader from "../../../assets/single-wave-loader.json";

export default function AccountInformation() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { currentUser }: { currentUser: UserTypeWithId } = useSelector(
    (state: any) => state.currentUser
  );
  const { email, firstname, lastname, username, password } = currentUser;
  const { auth } = useSelector((state: any) => state.account);
  const { isLoading } = useSelector((state: any) => state.general);

  const handleDeleteBtn = () => {
    Alert.alert(
      "Confirmation",
      `Are you sure you want to delete your account? You won't be able to undo this action.`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "YES, delete it", onPress: deleteUser },
      ],
      { cancelable: true }
    );
  };

  const deleteUser = () => {
    try {
      dispatch(setIsLoading(true));
      setTimeout(async () => {
        await new User().delete(currentUser.id);
        dispatch(setAuth(true));
        dispatch(resetCurrentUser());

        navigation.navigate("Login" as never);
        dispatch(setIsLoading(false));

        ToastAndroid.show("Account deleted succesfully", ToastAndroid.LONG);
      }, 3000);
    } catch (err) {
      setIsLoading(false);
      Alert.alert(
        "Error",
        "We couldn't delete your account, please contact us for help."
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
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
        <View style={styles.warningZone}>
          <Text style={styles.warningText}>Warning Zone</Text>
          <Pressable style={styles.deleteUser} onPress={handleDeleteBtn}>
            <Text style={{ fontWeight: "900", fontSize: 12 }}>DELETE USER</Text>
          </Pressable>
        </View>
        <Modal visible={isLoading && !auth} animationType="fade" transparent>
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
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.65)",
  },
  content: {
    padding: 10,
  },
  propertyContainer: {
    padding: 15,
    borderBottomWidth: 2,
  },
  propertyName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontStyle: "italic",
  },
  warningZone: {
    marginVertical: 15,
    paddingBottom: 50,
    alignItems: "center",
    rowGap: 12,
  },
  warningText: {
    fontWeight: "900",
    fontSize: 22,
  },
  deleteUser: {
    backgroundColor: "red",
    color: "black",
    padding: 15,
    borderRadius: 5,
    elevation: 3,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.65)",
  },
});
