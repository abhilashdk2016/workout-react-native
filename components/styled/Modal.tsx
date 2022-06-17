import { FunctionComponent, ReactNode, useState } from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import { PressableText } from "./PressableText";

type ModalProps = {
    children: FunctionComponent<{
        handleOpen: () => void,
        handleClose: () => void
    }>,
    activator?: FunctionComponent<
        {
            handleOpen: () => void
        }
    >
}

export function ScheduleModal({ activator: Activator, children } : ModalProps) {
    const [isModalVisible, setModalVisible] = useState(false);
    const handleOpen = () => setModalVisible(true)
    const handleClose = () => setModalVisible(false)
    return (
        <>
        { Activator ? <Activator
            handleOpen={() => setModalVisible(true)}
        /> : <PressableText onPress={() => handleOpen} text="Open" /> }
        <Modal
            visible={isModalVisible}
            animationType="slide"
        >
            <View style={styles.centeredView}>
                <View style={styles.contentView}>
                    {children({ handleOpen, handleClose})}
                </View>
                
                <PressableText onPress={() => handleClose} text="Close" />
            </View>
        </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    contentView: {
        marginBottom: 10
    }
})