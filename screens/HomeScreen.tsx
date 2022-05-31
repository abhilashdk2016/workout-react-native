import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { View, Text, Button } from "react-native";

export default function HomeScreen({ navigation }: NativeStackHeaderProps) {
    return (
        <View>
            <Text>Home Screen</Text>
            <Button title="Go to Planner" onPress={e => navigation.navigate("Planner")} />
        </View>
    )
}