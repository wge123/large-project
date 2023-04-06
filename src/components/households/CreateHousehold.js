import { Pressable, Text, View } from "react-native";
import { getStyles } from "../styles";
import { useTheme } from "@react-navigation/native";
import LabeledInput from "../LabeledInput";
import CustomButton from "../CustomButton";
import ProfileIcon from "../ProfileIcon";
import { useState } from "react";

export default function CreateHousehold({ navigation, route }) {
  const invitedUsers = [];
  //TODO:

  const { colors } = useTheme();
  const styles = getStyles(colors);
  const [householdName, setHouseholdName] = useState("");
  const [addUsername, setAddUsername] = useState("");
  const [list, setList] = useState(invitedUsers);

  function handleAdd() {
    const newList = list.concat({ name: addUsername });
    setList(newList);
    setAddUsername("");
  }
  function handleDelete(username) {
    setList(
      list.filter(function (el) {
        return el.name != username;
      })
    );
  }

  return (
    <View style={styles.createHouseholdContainer}>
      <View>
        <Text style={styles.p}>Hi there,</Text>
        <Text style={styles.header}>John Doe</Text>
      </View>
      <View
        style={{
          alignSelf: "stretch",
        }}
      >
        <View style={{ height: 100 }}></View>
        <Text style={styles.p}>Create a new household</Text>
        <View style={{ height: 22 }}></View>
        <LabeledInput
          label={"HOUSEHOLD NAME"}
          placeholder={"Apartment"}
          onChangeText={setHouseholdName}
        />
        <View style={{ height: 22 }}></View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={{ height: 22 }}></View>
          <LabeledInput
            label={"INVITE BY USERNAME"}
            placeholder={"Username"}
            onChangeText={setAddUsername}
            value={addUsername}
          />
          <View style={{ width: 100 }}></View>
          <Pressable
            style={styles.createHouseholdButtonContainer}
            android_ripple={{ color: colors.highlight }}
            onPress={handleAdd}
          >
            <Text style={styles.buttonText}>INVITE</Text>
          </Pressable>
        </View>
        <View style={{ height: 22 }}></View>
        <Text style={[styles.label, { marginBottom: 4 }]}>
          INVITED MEMBERS:
        </Text>
        <View style={{ height: 22 }}></View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            alignContent: "flex-start",
          }}
        >
          {list.map((item) => (
            <ProfileIcon username={item.name} deleteFunc={handleDelete} />
          ))}
          <View style={{ flexBasis: "100%", height: 50 }}></View>
          <View style={{ width: "100%" }}>
            <CustomButton title="CREATE HOUSEHOLD" />
          </View>
        </View>
      </View>
    </View>
  );
}