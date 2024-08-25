import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import type { Api } from "@reduxjs/toolkit/query";

export function setupApiStore<A extends Api<any, any, any>>(api: A) {
  const getStore = () =>
    configureStore({
      reducer: { [api.reducerPath]: api.reducer },
      middleware: (gdm) => gdm().concat(api.middleware),
    });

  const store = getStore();
  const refObj = {
    api,
    store,
  };

  setupListeners(store.dispatch);

  return refObj;
}
