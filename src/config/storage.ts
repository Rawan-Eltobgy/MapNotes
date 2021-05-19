import AsyncStorage from '@react-native-async-storage/async-storage';
let storage= {
  setItem: async (key: any, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log("Fail setting item: ",error)
    }
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
  
  updateItemAtIndex: async (key: any, value: any, index: number) => {
    try {
      const item = await storage.getItem(key);
      const parsedResult  = JSON.parse(item)
      parsedResult[index] = value
      parsedResult[index].location = value.location
      await AsyncStorage.clear()
      await storage.setItem(key, JSON.stringify(parsedResult));
    } catch (error) {}
  },

  deleteItemAtIndex: async (key: any, index: number) => {
    try {
      const item = await storage.getItem(key);
      const parsedResult  = JSON.parse(item)
      let updatedLocation = parsedResult.splice(index,1)
      await AsyncStorage.clear()
      await storage.setItem(key, JSON.stringify(parsedResult));
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
export default storage;