import storage from "redux-persist/lib/storage";

export const createExpireStorage = (expiryTimeInMs: number) => {
  return {
    async setItem(key: string, value: string) {
      const item = {
        value,
        expiry: new Date().getTime() + expiryTimeInMs,
      };
      return storage.setItem(key, JSON.stringify(item));
    },
    async getItem(key: string) {
      const itemStr = await storage.getItem(key);
      if (!itemStr) {
        return null;
      }

      try {
        const item = JSON.parse(itemStr);
        if (new Date().getTime() > item.expiry) {
          await storage.removeItem(key); 
          return null;
        }
        return item.value;
      } catch (e: any) {
        return null;
      }
    },
    async removeItem(key: string) {
      return storage.removeItem(key);
    },
  };
};
