import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { View, StyleSheet } from "react-native";
import { MontserratText } from "../components/styled/MontserratText";
type DetailPrams = {
    route: {
        params: {
            slug: string
        }
    }
}

type NavigationType = NativeStackHeaderProps & DetailPrams;

export default function WorkoutDetailScreen({ route }: NavigationType) {
    return (
        <View style={styles.container}>
            <MontserratText style={styles.header }>Slug - {route.params.slug}</MontserratText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
    },
    header: {
        fontSize: 20,
        marginBottom: 20,
        fontWeight: "bold",
        fontFamily: "montserrat-bold"
    }
});