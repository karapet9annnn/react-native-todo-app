import { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";

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

export default function Index() {
  const [todoData, setTodoData] = useState([
    {
      id: 1,
      title: "Todo 1",
      checked: false,
    },
    {
      id: 2,
      title: "Todo 2",
      checked: false,
    },
    {
      id: 3,
      title: "Todo 3",
      checked: false,
    },
    {
      id: 4,
      title: "Todo 1",
      checked: false,
    },
    {
      id: 5,
      title: "Todo 2",
      checked: false,
    },
    {
      id: 6,
      title: "Todo 3",
      checked: false,
    },
    {
      id: 7,
      title: "Todo 1",
      checked: false,
    },
    {
      id: 8,
      title: "Todo 2",
      checked: false,
    },
    {
      id: 9,
      title: "Todo 3",
      checked: false,
    },
    {
      id: 10,
      title: "Todo 2",
      checked: false,
    },
    {
      id: 11,
      title: "Todo Last",
      checked: false,
    },
  ]);
  const [addTodoValue, setAddTodoValue] = useState("");
  const [search, setSearch] = useState("");
  const todoHandler = (id: number) => {
    const newTodoData = todoData.map((elem) => {
      if (elem.id === id) {
        return { ...elem, checked: !elem.checked };
      }
      return elem;
    });
    setTodoData(newTodoData);
  };

  const addTodo = () => {
    if (addTodoValue.length > 0) {
      const newTodo = {
        id: todoData.length + 1,
        title: addTodoValue,
        checked: false,
      };
      setTodoData((prev) => [...prev, newTodo]);
      setAddTodoValue("");
      Keyboard.dismiss();
    }
  };
  const deleteTodo = (id: number) => {
    const removedTodo = todoData.filter((elem) => elem.id !== id);
    setTodoData(removedTodo);
  };
  const filteredTodos = useMemo(() => {
    return todoData
      .filter((todo) => todo.title.toLowerCase().includes(search.toLowerCase()))
      .reverse();
  }, [todoData, search]);
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
            marginBottom: 20,
          }}
        >
          {/* MENU BTN */}
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <Entypo name="menu" size={40} color="black" />
          </View>
          {/* PROFILE ICON */}
          <View style={{ alignSelf: "flex-end" }}>
            <Image
              width={40}
              height={40}
              source={{
                uri: "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png",
              }}
            />
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
        // keyboardVerticalOffset={200}
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
          placeholderTextColor={"#000"}
          style={{
            height: 57,
            flex: 1,
            paddingHorizontal: 20,
            backgroundColor: "#fff",
            borderRadius: 10,
          }}
          placeholder="Add Todo"
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
