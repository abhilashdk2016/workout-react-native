import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { View, Text, Button } from "react-native";

export default function PlannerScreen({ navigation }: NativeStackHeaderProps ) {
    return (
        <View>
            <Text>Planner Screen</Text>
            <Button title="Go to Home" onPress={e => navigation.navigate("Home")} />
        </View>
    )
}