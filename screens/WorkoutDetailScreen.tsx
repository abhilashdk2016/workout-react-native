import { FontAwesome } from "@expo/vector-icons";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { View, StyleSheet, Modal, Text } from "react-native";
import { ScheduleModal } from "../components/styled/Modal";
import { PressableText } from "../components/styled/PressableText";
import WorkoutItem from "../components/WorkoutItem";
import { useWorkoutBySlug } from "../hooks/useWorkoutBySlug";
import { formatSec } from "../utils/time";
import { useEffect, useState } from 'react';
import { SequenceItem } from "../types/data";
import { useCountDown } from "../hooks/useCountDown";
type DetailPrams = {
    route: {
        params: {
            slug: string
        }
    }
}

type NavigationType = NativeStackHeaderProps & DetailPrams;

export default function WorkoutDetailScreen({ route }: NavigationType) {
    const [ sequence, setSequence] = useState<SequenceItem[]>([]);
    const [ trackerIdx, setTrackerIdx] = useState(-1);
    const workout = useWorkoutBySlug(route.params.slug);
    const { countDown, isRunning, stop, start } = useCountDown(trackerIdx);
    const startSeq = ["G0", "1", "2", "3"];
    const addItemToSequence = (idx: number) => {
        let newSequence = [];
        if(idx > 0) {
            newSequence = [...sequence, workout!.sequence[idx]];
        } else {
            newSequence = [workout!.sequence[idx]]
        }
        setSequence(newSequence);
        setTrackerIdx(idx);
        start(newSequence[idx].duration + startSeq.length);
    }

    useEffect(() => {
        if(!workout) return;
        if(trackerIdx === workout.sequence.length - 1) return;
        if(countDown === 0) {
            addItemToSequence(trackerIdx + 1);
        }

    }, [countDown]);

    if(!workout) {
        return null;
    }

    const hasReachedEnd = sequence.length === workout.sequence.length && countDown === 0;

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
            <View style={styles.wrapper}>
                <View style={styles.counterUI}>
                    <View style={styles.counterItem}>
                        { sequence.length === 0  
                            ?   <FontAwesome name="play-circle-o" size={100} onPress={() => addItemToSequence(0)} />
                            : isRunning 
                            ?    <FontAwesome name="stop-circle-o" size={100} onPress={() => stop()} />
                            : <FontAwesome name="play-circle-o" size={100} onPress={() => {
                                    if(hasReachedEnd) {
                                        addItemToSequence(0)
                                    } else {
                                        start(countDown);
                                    }
                                }} 
                            />
                        }
                    </View>
                    {
                        sequence.length > 0 && countDown >= 0 &&
                        <View style={styles.counterItem}>
                            <View>
                                <Text style={{ fontSize: 55 }}>
                                    {
                                        countDown > sequence[trackerIdx].duration 
                                        ? startSeq[countDown - sequence[trackerIdx].duration - 1]
                                        : countDown
                                    }
                                </Text>
                            </View>
                        </View>
                    }
                </View>
                <View style={{ alignItems: "center"}}>
                    <Text style={{ fontSize: 60, fontWeight: "bold" }}>
                        {
                            sequence.length === 0 ?
                                "Prepare" :
                                hasReachedEnd ?
                                "Great Job!" : sequence[trackerIdx].name
                        }
                    </Text>
                </View>
            </View>
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
    },
    counterUI: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 20
    },
    counterItem: {
        flex: 1,
        alignItems: "center"
    },
    wrapper: {
        borderRadius: 10,
        borderColor: "rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        borderWidth: 1,
        padding: 10
    }
});