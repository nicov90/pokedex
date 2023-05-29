import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  Modal,
  BackHandler,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../redux/slices/account";
import { resetCurrentUser } from "../../redux/slices/currentUser";
import { setIsLoading } from "../../redux/slices/general";
import AnimatedLottieView from "lottie-react-native";
import waveLoader from "../../../assets/single-wave-loader.json";
import Icon from "react-native-vector-icons/FontAwesome5";
import { ProfileScreens } from "../../navigation/ProfileNavigation";
import { UserTypeWithId } from "../../components/Auth/types";

export default function ProfileMain() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { auth } = useSelector((state: any) => state.account);
  const { isLoading } = useSelector((state: any) => state.general);
  const { currentUser }: { currentUser: UserTypeWithId } = useSelector(
    (state: any) => state.currentUser
  );
  const { firstname, lastname, favorites } = currentUser;

  const signOutHandler = () => {
    dispatch(setIsLoading(true));
    setTimeout(() => {
      dispatch(setAuth(false));
      dispatch(resetCurrentUser());
      navigation.navigate("Login" as never);
      dispatch(setIsLoading(false));
    }, 2000);
  };

  const goToScreen = (screen: ProfileScreens) => {
    navigation.navigate(screen as never);
  };

  const buttonsStyles = () => {
    return {
      backgroundColor: "rgba(0,0,0,0.85)",
      ...styles.buttons,
    };
  };
  const buttonsText = () => {
    return {
      color: "white",
      ...styles.buttonsText,
    };
  };

  const backHandler = () => {
    const indexedRoutesLength = navigation.getState().routes.length - 1;
    const currentRoute =
      navigation.getState().routes[indexedRoutesLength]?.name;
    if (currentRoute === "ProfileMain") {
      return true;
    } else {
      return false;
    }
  };

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", backHandler);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", backHandler);
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileIcon}
          source={require("../../../assets/profile-black.png")}
        />
        <View style={styles.profileRowRight}>
          <Text style={styles.name}>
            {firstname} {lastname}
          </Text>
          <Text style={styles.text}>Favorites: {favorites.length}</Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable
          style={buttonsStyles()}
          onPress={() => goToScreen("AccountInformation")}
        >
          <View style={styles.buttonsRowLeft}>
            <Icon size={20} name="id-badge" color="white" />
            <Text style={buttonsText()}>Account Information</Text>
          </View>
          <Icon size={20} name="angle-right" color="white" />
        </Pressable>
        <Pressable style={buttonsStyles()} onPress={() => goToScreen("About")}>
          <View style={styles.buttonsRowLeft}>
            <Icon size={17} name="info-circle" color="white" />
            <Text style={buttonsText()}>About</Text>
          </View>
          <Icon size={20} name="angle-right" color="white" />
        </Pressable>
      </View>
      <Pressable style={styles.signOutBtn} onPress={signOutHandler}>
        <Text style={styles.btnText}>Sign out</Text>
      </Pressable>
      <Modal visible={isLoading && !auth} animationType="fade" transparent>
        <View style={styles.loading}>
          <AnimatedLottieView source={waveLoader} autoPlay loop speed={0.9} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,0.65)",
    paddingHorizontal: 30,
    alignItems: "center",
    height: "100%",
  },
  profileContainer: {
    marginVertical: 25,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  profileIcon: {
    width: "35%",
    height: 120,
  },
  profileRowRight: {
    paddingHorizontal: 30,
    flexDirection: "column",
    justifyContent: "center",
  },
  name: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  text: {
    fontWeight: "500",
  },
  textStrong: {
    fontWeight: "bold",
  },
  buttonsContainer: {
    width: "100%",
  },
  buttons: {
    borderRadius: 6,
    padding: 20,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonsRowLeft: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  buttonsText: {
    fontWeight: "500",
  },
  signOutBtn: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.6)",
    borderRadius: 5,
    marginVertical: 30,
    paddingVertical: 10,
    width: 100,
    backgroundColor: "red",
    elevation: 3,
  },
  btnText: {
    textAlign: "center",
    fontWeight: "500",
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.65)",
  },
});
