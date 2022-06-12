import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { View, StyleSheet, FlatList, Pressable } from "react-native";
import { MontserratText } from "../components/styled/MontserratText";
import WorkoutItem from "../components/WorkoutItem";
import data from '../data.json';
import { Workout } from '../types/data';

export default function HomeScreen({ navigation }: NativeStackHeaderProps) {
    return (
        <View style={styles.container}>
            <MontserratText style={{ fontSize: 30, marginBottom: 20, fontWeight: "bold" }}>New Workouts</MontserratText>
            <FlatList 
                data={data as Workout[]}
                keyExtractor={item => item.slug}
                renderItem={({ item }) => {
                    return (
                        <Pressable
                            onPress={() => navigation.navigate("WorkoutDetail", { slug: item.slug})}
                        >
                            <WorkoutItem item={item} />
                        </Pressable>
                    )
                }}
            />
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