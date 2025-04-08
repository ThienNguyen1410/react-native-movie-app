import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailScreen from "../screens/DetailScreen";
import HomeScreen from "../screens/HomeScreen";

export type HomeStackParamList = {
    Home: undefined;
    Detail: { movie_id: number };
}

export const HomeNavigator = () => {
    const Stack = createNativeStackNavigator<HomeStackParamList>();
    
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
    )
}