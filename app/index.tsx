import { asyncStorageUtils } from "@/asyncStorageHelpers/asyncStorageHelpers";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const TodoItem = ({
  id,
  todoDoneHandler,
  checked,
  todo,
  deleteTodo,
}: {
  id: number;
  todoDoneHandler: (id: number) => void;
  checked: boolean;
  todo: any;
  deleteTodo: (id: number) => void;
}) => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        // marginBotto: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Text
          onPress={() => {
            todoDoneHandler(id);
          }}
          style={{
            maxWidth: "80%",
            textDecorationLine: checked ? "line-through" : "none",
          }}
        >
          {todo.title}
        </Text>
        <Text
          onPress={() => {
            deleteTodo(id);
          }}
        >
          Delete Todo
        </Text>
      </View>
    </View>
  );
};
interface Todo {
  id: number;
  title: string;
  checked: boolean;
}
export default function TodoList() {
  const [todoData, setTodoData] = useState<Todo[]>([]);
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  const [addTodoValue, setAddTodoValue] = useState("");
  const [search, setSearch] = useState("");

  const getAsyncTodoData = async () => {
    try {
      const data = await asyncStorageUtils.getAsyncStorageData("todos");
      if (data) {
        setTodoData(JSON.parse(data));
      }
    } catch (e) {}
  };

  const setAsyncTodoData = async (customData: Todo[]) => {
    try {
      await asyncStorageUtils.setAsyncStorageData(
        "todos",
        JSON.stringify(customData)
      );
    } catch (e) {}
  };

  const todoHandler = (id: number) => {
    const newTodoData = todoData.map((elem) => {
      if (elem.id === id) {
        return { ...elem, checked: !elem.checked };
      }
      return elem;
    });
    setAsyncTodoData(newTodoData);
    setTodoData(newTodoData);
  };

  const addTodo = () => {
    if (addTodoValue.length > 0) {
      const newTodo = {
        id: Date.now(),
        title: addTodoValue,
        checked: false,
      };
      setAsyncTodoData([...todoData, newTodo]);
      setTodoData([...todoData, newTodo]);
      setAddTodoValue("");
      Keyboard.dismiss();
    }
  };
  const deleteTodo = (id: number) => {
    const removedTodo = todoData.filter((elem) => elem.id !== id);
    setAsyncTodoData(removedTodo);
    setTodoData(removedTodo);
  };
  const filteredTodos = useMemo(() => {
    return todoData
      .filter((todo) => todo.title.toLowerCase().includes(search.toLowerCase()))
      .reverse();
  }, [todoData, search]);

  useEffect(() => {
    getAsyncTodoData();
  }, []);

  const EmptyListElem = () => {
    return <Text>Add Your Todos To Start Journey...😊</Text>;
  };

  return (
    <SafeAreaView
      style={{
        padding: 20,
        display: "flex",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <StatusBar />
      <View
        style={{
          marginBottom: 20,
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          {/* MENU BTN */}
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Entypo
              name="menu"
              size={40}
              style={{ position: "relative", top: -7 }}
              color="black"
              onPress={() => navigation?.openDrawer()}
            />
            <Text style={{ ...styles.mainTitle, marginBottom: 20 }}>Todos</Text>
          </View>
          {/* PROFILE ICON */}
          <View style={{ position: "relative", top: 7 }}>
            {/* <Image
              width={40}
              height={40}
              source={{
                uri: "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png",
              }}
            /> */}
            <Feather name="user" size={40} color="black" />
          </View>
        </View>
        <View>
          <TextInput
            value={search}
            onChangeText={(searchText) => setSearch(searchText)}
            placeholder="Search For Todos"
            placeholderTextColor={"#000"}
            style={{
              backgroundColor: "#fff",
              padding: 10,
              marginBottom: 20,
              height: 57,
              borderRadius: 10,
            }}
          />
        </View>
        <FlatList
          ListEmptyComponent={<EmptyListElem />}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 5,
            paddingBottom: Platform.OS === "ios" ? 160 : 200,
          }}
          keyExtractor={(item) => item.id.toString()}
          data={filteredTodos}
          renderItem={({ item }) => {
            return (
              <TodoItem
                id={item.id}
                checked={item.checked}
                todo={item}
                todoDoneHandler={todoHandler}
                deleteTodo={deleteTodo}
              />
            );
          }}
          ItemSeparatorComponent={() => <View style={{ height: 20 }}></View>}
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={20}
        style={{
          flexDirection: "row",
          gap: 20,
          width: "100%",
          alignSelf: "center",
          position: "absolute",
          bottom: 0,
          marginVertical: 30,
        }}
      >
        <TextInput
          value={addTodoValue}
          onChangeText={(text) => setAddTodoValue(text)}
          placeholderTextColor={"#c9c7c7"}
          style={{
            height: 57,
            flex: 1,
            paddingHorizontal: 20,
            backgroundColor: "#fff",
            borderRadius: 10,
          }}
          placeholder="Add Your Todos..."
        />
        <TouchableOpacity
          onPress={() => addTodo()}
          activeOpacity={0.7}
          style={{
            padding: 10,
            backgroundColor: "#000",
            borderRadius: 10,
            height: 57,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff" }}>ADD TODO</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 40,
    fontWeight: 700,
  },
});
