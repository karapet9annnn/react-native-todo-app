import React, { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import TodoList from "./todoList";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "expo-router";
import { asyncStorageUtils } from "@/asyncStorageHelpers/asyncStorageHelpers";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";

// SETTINGS
export default function Index() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const [loader, setLoader] = useState<boolean>(false);

  const [showAcceptanceModal, setShowAcceptanceModal] =
    useState<boolean>(false);

  const clearTodos = async () => {
    setLoader(true);
    try {
      await asyncStorageUtils.clearAllAsyncStorage();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setShowAcceptanceModal(false);
    } catch (e) {
    } finally {
      setLoader(false);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar />
      {/* TOP BAR */}
      <View style={{ marginTop: 20, flexDirection: "row", gap: 10 }}>
        <Entypo
          style={{ position: "relative", top: 5 }}
          name="menu"
          size={40}
          color="black"
          onPress={() => navigation?.openDrawer()}
        />
        <Text onPress={() => navigation.openDrawer()} style={styles.mainTitle}>
          Settings
        </Text>
      </View>
      {/* MAIN CONTENT */}
      <View style={styles.mainContent}>
        <Pressable
          onPress={() => {
            setShowAcceptanceModal(true);
          }}
          style={({ pressed }) =>
            pressed
              ? { ...styles.clearTodoBtn, backgroundColor: "red" }
              : styles.clearTodoBtn
          }
        >
          {({ pressed }) => (
            <Text
              style={[
                styles.clearTodoBtnText,
                pressed && { color: "white" }, // Change text color when pressed
              ]}
            >
              CLEAR ALL TODOS
            </Text>
          )}
        </Pressable>
      </View>
      {/* ACCEPT MODAL */}
      <Modal
        visible={showAcceptanceModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowAcceptanceModal(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowAcceptanceModal(false)}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              {/* LOADER ON CLEAR BTN */}
              {loader && (
                <ActivityIndicator
                  style={{ position: "absolute", top: "50%", left: "50%" }}
                />
              )}

              {/* ////////// */}
              {/* CLOSE BTN */}
              <TouchableOpacity
                style={{ display: "flex", alignItems: "flex-end" }}
              >
                <AntDesign
                  style={{ outline: "none" }}
                  name="closecircleo"
                  size={24}
                  color="black"
                  onPress={() => setShowAcceptanceModal(false)}
                />
              </TouchableOpacity>

              {/* ////////// */}

              <View style={styles.modalContainer}>
                <View style={{ alignItems: "center" }}>
                  <Text style={{ fontSize: 15, textAlign: "center" }}>
                    Are You Sure To Clear All Todos?
                  </Text>
                </View>
                <Pressable
                  onPress={() => clearTodos()}
                  style={styles.clearTodoBtn}
                >
                  <Text style={styles.clearTodoBtnText}>Clear All Todos!</Text>
                </Pressable>
                {/* <Text>asdasd</Text> */}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  mainTitle: {
    fontSize: 40,
    fontWeight: 700,
  },
  clearTodoBtn: {
    transitionDuration: "3s",
    transitionTimingFunction: "ease",
    borderRadius: 15,
    paddingVertical: 10,
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    borderColor: "red",
    borderWidth: 2,
  },
  clearTodoBtnText: {
    color: "red",
    textAlign: "center",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // red with transparency
    justifyContent: "center",
    alignItems: "center",
  },
  mainContent: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 30,
  },
  modalContent: {
    padding: 20,
    borderRadius: 20,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
    backgroundColor: "#fff",
    width: 300,
    height: 300,
  },
  modalContainer: {
    flex: 1,
    // backgroundColor: "red",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
});
