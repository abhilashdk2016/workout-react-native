import { FontAwesome } from "@expo/vector-icons";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { View, StyleSheet, Modal, Text } from "react-native";
import { ScheduleModal } from "../components/styled/Modal";
import { MontserratText } from "../components/styled/MontserratText";
import { PressableText } from "../components/styled/PressableText";
import WorkoutItem from "../components/WorkoutItem";
import { useWorkoutBySlug } from "../hooks/useWorkoutBySlug";
import { formatSec } from "../utils/time";
type DetailPrams = {
    route: {
        params: {
            slug: string
        }
    }
}

type NavigationType = NativeStackHeaderProps & DetailPrams;

export default function WorkoutDetailScreen({ route }: NavigationType) {
    const workout = useWorkoutBySlug(route.params.slug);
    if(!workout) {
        return null;
    }
    return (
        <View style={styles.container}>
            <WorkoutItem item={workout} childStyles={{ marginTop: 10 }}>
                <ScheduleModal activator={({ handleOpen }) => <PressableText onPress={handleOpen} text="Check Sequence" />}>
                    <View>
                        {
                            workout.sequence.map((si, index) => 
                                <View key={si.slug} style={styles.sequenceItem}>
                                    <Text>
                                        {si.name} | {si.type} | {formatSec(si.duration)}
                                    </Text>
                                    {index !== workout.sequence.length - 1 ?
                                        <FontAwesome 
                                            name="arrow-down"
                                            size={20}
                                        /> 
                                        : null 
                                    }
                                </View>
                            )
                        }
                    </View>
                </ScheduleModal>
            </WorkoutItem>
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
    },
    sequenceItem: {
        alignItems: "center"
    }
});