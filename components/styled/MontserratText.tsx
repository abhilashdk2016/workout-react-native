import { Text } from 'react-native';
export function MontserratText(props: Text["props"]) {
    return (
        <Text 
            {...props}
            style={[{ fontFamily: "montserrat"}, props.style ]} />
    )
}

//{ children }: { children: Text["props"]["children"] }