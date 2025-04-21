import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer initialRouteName="index">
        <Drawer.Screen
          name="index"
          options={{
            title: "Your Todos",
            headerShown: false,
            drawerActiveTintColor: "black",
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            title: "Settings",
            headerShown: false,
            drawerActiveTintColor: "black",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
