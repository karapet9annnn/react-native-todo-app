import AsyncStorage from "@react-native-async-storage/async-storage";

const getAsyncStorageData = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data !== null) {
      console.log("Data goten successfuly");
      return data;
    }
  } catch (e) {
    console.log(e, `error getting data of ${key}`);
  }
};

// SET DATA WITH JSON.stringify
const setAsyncStorageData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log("Data setted successfuly");
  } catch (e) {
    console.log(e, `error setting data of ${key}, with value ${value}`);
  }
};

const deleteAsyncStorageDataByKey = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Data Deleted Successfuly, ${key}`);
  } catch (e) {
    console.log(e, `error deleting data with key: ${key}`);
  }
};

// CAUTION, DELETS ALL ASYNC STORAGE DATA
const clearAllAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log(`All Data Deleted Successfuly`);
  } catch (e) {
    console.log(e, `error deleting all data with key`);
  }
};

export const asyncStorageUtils = {
  getAsyncStorageData,
  setAsyncStorageData,
  deleteAsyncStorageDataByKey,
  clearAllAsyncStorage,
};
