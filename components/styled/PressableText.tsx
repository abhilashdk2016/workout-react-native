import { Text, Pressable, PressableProps } from "react-native";
type PressableTextProps = {
    text: string;
}
type PressableTextPropsType = PressableProps & PressableTextProps;
export function PressableText(props: PressableTextPropsType) {
    return (<Pressable {...props}>
        <Text style={{ textDecorationLine: "underline" }}>{props.text}</Text>
    </Pressable>)
}