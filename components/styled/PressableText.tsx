import { Text, Pressable, PressableProps, TextStyle, StyleProp } from "react-native";
export type PressableTextProps = {
    text: string;
    style?: StyleProp<TextStyle>
}
type PressableTextPropsType = PressableProps & PressableTextProps;
export function PressableText(props: PressableTextPropsType) {
    return (<Pressable {...props}>
        <Text style={[props.style, { textDecorationLine: "underline" }]}>{props.text}</Text>
    </Pressable>)
}