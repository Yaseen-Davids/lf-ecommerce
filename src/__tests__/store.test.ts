import { expect, describe, it } from "vitest";
import { store } from "../store";
import { productApi } from "../services/products";

describe("Redux Store", () => {
  it("should have the correct reducer paths", () => {
    const state = store.getState();
    expect(state).toHaveProperty(productApi.reducerPath);
    expect(state).toHaveProperty("cart");
  });

  it("should have the productApi middleware applied", () => {
    expect(store.getState()).toHaveProperty(productApi.reducerPath);
    store.dispatch(productApi.endpoints.getAllProducts.initiate("smartphones"));

    const state = store.getState();
    expect(state[productApi.reducerPath].queries).toBeDefined();
    expect(Object.keys(state[productApi.reducerPath].queries)).toHaveLength(1);
  });
});
