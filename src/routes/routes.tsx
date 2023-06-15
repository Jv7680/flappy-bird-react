import HomeScreen from "../components/screens/HomeScreen";
import PlayScreen from "../components/screens/PlayScreen";

export const ROUTES = [
    {
        route: "/",
        screen: <HomeScreen />,
    },
    {
        route: "/play",
        screen: <PlayScreen />,
    },
];