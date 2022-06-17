import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { View, StyleSheet, FlatList, Modal, Text } from "react-native";
import slugify from "slugify";
import ExerciseItem from "../components/ExerciseItem";
import { ScheduleModal } from "../components/styled/Modal";
import { PressableText } from "../components/styled/PressableText";
import ExerciseForm from "../components/ExerciseForm";
import { ExerciseFormData, SequenceItem, SequenceType, WorkoutFormData, Workout } from "../types/data";
import WorkoutForm from "../components/WorkoutForm";
import { storeWorkout } from "../storage/workout";
import { PressableThemeText } from "../components/styled/PressableThemeText";

export default function PlannerScreen({ navigation }: NativeStackHeaderProps ) {
    const [ sequenceItems, setSequenceItems ] = useState<SequenceItem[]>([])
    const handleExerciseSubmit = (form: ExerciseFormData) => {
        const sequenceItem: SequenceItem = {
            slug: slugify(form.name + " " + Date.now(), { lower: true}),
            name: form.name,
            type: form.type as SequenceType,
            duration: Number(form.duration)
        }
        if(form.reps) {
            sequenceItem.reps = Number(form.reps);
        }

        setSequenceItems([...sequenceItems, sequenceItem]);
    }

    const computeDiff = (exercisesCount: number, workoutDuration: number) => {
        const intensity = workoutDuration / exercisesCount;
    
        if (intensity <= 60) {
          return "hard";
        } else if (intensity <= 100) {
          return "normal";
        } else {
          return "easy";
        }
    
      }

    const handleWorkoutSubmit = async (form: WorkoutFormData) => {
        if (sequenceItems.length > 0) {

            const duration = sequenceItems.reduce((acc, item) => {
              return acc + item.duration;
            }, 0)
      
            const workout: Workout = {
              name: form.name,
              slug: slugify(form.name + " " + Date.now(), {lower: true}),
              difficulty: computeDiff(sequenceItems.length, duration),
              sequence: [...sequenceItems],
              duration,
            }
      
            await storeWorkout(workout);
      }
    }

    return (
        <View style={styles.container}>
            <ExerciseForm onSubmit={handleExerciseSubmit}/>
            <View>
                <ScheduleModal
                    activator={({ handleOpen }) =>
                    <PressableThemeText 
                        style={{ marginTop: 15 }}
                        text="Create Workout"
                        onPress={handleOpen}
                    />
                }>
                    {
                        ({handleClose}) =>
                        <View>
                            <WorkoutForm
                                onSubmit={async (data) => {
                                    await handleWorkoutSubmit(data)
                                    handleClose()
                                    navigation.navigate("Home");
                                }}
                            />
                        </View>
                    }
                </ScheduleModal>
            </View>
            <FlatList
                data={sequenceItems}
                renderItem={({item, index}) =>
                    <ExerciseItem item={item}>
                        <PressableText
                            onPress={() => {
                              const items = [...sequenceItems]
                              items.splice(index, 1)
                              setSequenceItems(items)  
                            }}
                            text="Remove"
                        />
                    </ExerciseItem>}
                keyExtractor={item => item.slug}
            />
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    }
})