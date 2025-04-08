import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailScreen from "../screens/movie-detail-screen";
import HomeScreen from "../screens/home-screen";
import WatchListScreen from "../screens/watch-list-screen";

export type WatchListStackParamList = {
    WatchList: undefined;
    Detail: { movie_id: number };
}

export const WatchListNavigator = () => {
    const Stack = createNativeStackNavigator<WatchListStackParamList>();
    
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="WatchList" component={WatchListScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
    )
}