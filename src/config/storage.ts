import AsyncStorage from '@react-native-async-storage/async-storage';
export default {
  setItem: async (key: any, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {}
  },
  getItem: async (key: any) => {
    try {
      const item = await AsyncStorage.getItem(key);
      return item != null ? JSON.parse(item) : null;

    } catch (error) {}
  },
  removeItem: async (key: any) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {}
  },
  updateItem: async (key: any, value: any) => {
    try {
      const item = await AsyncStorage.getItem(key);
      const result = {...JSON.parse(item), ...value};

      await AsyncStorage.setItem(key, JSON.stringify(result));
    } catch (error) {}
  },
};