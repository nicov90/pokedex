import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileMain from "../screens/Profile/ProfileMain";
import AccountInformation from "../screens/Profile/AccountInformation";
import About from "../screens/Profile/About";

export type ProfileScreens =
  "AccountInformation" |
  "About"

export default function ProfileNavigation () {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name='ProfileMain' component={ProfileMain} options={{
        headerTitle: "My Account",
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerBackButtonMenuEnabled: false,
        headerBackVisible: false,
        headerLeft: () => (null),
        gestureEnabled: false,
      }}/>
      <Stack.Screen name='AccountInformation' component={AccountInformation} options={{
        headerTitle: "Account Information",
        headerShadowVisible: false,
        animation: "slide_from_right",
      }}/>
      <Stack.Screen name='About' component={About} options={{
        headerTitle: "About",
        headerShadowVisible: false,
        animation: "slide_from_right",
      }}/>
    </Stack.Navigator>
  );
};