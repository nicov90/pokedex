import { ScrollView ,View, Text, StyleSheet, Image, Linking } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function About() {
  const cvUrl =
    "https://nicov90.github.io/Portfolio/files/VALDEZ%20NICOLAS%20CV_english.pdf";
  const portfolioUrl = "https://nicov90.github.io/Portfolio/";

  const goToUrl = (url: string) =>
    Linking.canOpenURL(url).then(() => {
      Linking.openURL(url);
    });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.subContainer}>
          <View style={styles.authorPicDiv}>
            <Image
              source={require("../../../assets/author-pic.jpg")}
              style={styles.authorPic}
            />
          </View>
          <Text style={styles.authorName}>Nicolas Valdez</Text>
          <Text style={styles.description}>
            I am a full-stack programming student seeking my first work
            experience in the field. With a passion for technology and a drive
            to constantly learn, I am eager to bring my skills and enthusiasm to
            a company that values innovation and growth.
          </Text>
          <View style={styles.linksContainer}>
            <Icon
              name="github"
              size={40}
              onPress={() => goToUrl("https://github.com/nicov90")}
            />
            <Icon
              name="linkedin"
              size={40}
              onPress={() => goToUrl("https://www.linkedin.com/in/nicov90/")}
            />
            <Icon
              name="envelope"
              size={40}
              solid
              onPress={() => Linking.openURL("mailto:nico_v99@hotmail.com")}
            />
            <Icon
              name="globe"
              size={40}
              solid
              onPress={() => goToUrl(portfolioUrl)}
            />
            <Icon
              name="file-download"
              color="#222"
              size={40}
              onPress={() => goToUrl(cvUrl)}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  content: {
    paddingBottom: 50,
    height: "100%",
    alignItems: "center",
  },
  subContainer: {
    width: "80%",
    alignItems: "center",
  },
  authorPicDiv: {
    borderColor: "rgba(50,0,0,0.8)",
    borderWidth: 2,
    borderRadius: 200,
    elevation: 15,
  },
  authorPic: {
    width: 250,
    height: 250,
    borderRadius: 200,
  },
  authorName: {
    width: "100%",
    textAlign: "center",
    color: "#300",
    marginTop: 35,
    fontSize: 26,
    fontWeight: "bold",
    borderColor: "#543",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    paddingTop: 20,
    paddingBottom: 15,
  },
  description: {
    fontWeight: "500",
    lineHeight: 19,
    textAlign: "justify",
    marginVertical: 40,
  },
  linksContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  links: {
    width: 50,
    height: 50,
  },
});
