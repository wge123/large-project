import { Text, View } from "react-native";

import CustomButton from "../CustomButton";
import LabeledInput from "../LabeledInput";
import { getStyles } from "../styles";
import { useState } from "react";
import { useTheme } from "@react-navigation/native";

import { Auth as CognitoAuth } from "aws-amplify";

/* ConfirmRegister page */
// TODO: Connect to backend
export default function ConfirmRegister({ navigation, route }) {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const [verificationCode, setVerificationCode] = useState("");

  async function confirmSignUp() {
    try {
      const user = await CognitoAuth.confirmSignUp(route.params.username, verificationCode);
      navigation.navigate("InitialPage");
    } catch (error) {
      console.log("Error confirming sign up:", error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Verify Email</Text>
      <View
        style={{
          alignSelf: "stretch",
        }}
      >
        <LabeledInput
          value={verificationCode}
          label={"VERIFICATION CODE"}
          onChangeText={setVerificationCode}
          placeholder={"Enter verification code sent to your email"}
        />
        <View style={{ height: 24 }}></View>
        <CustomButton
          title={"VERIFY"}
          onPress={async () => await confirmSignUp()}
        />
      </View>
    </View>
  );
}
