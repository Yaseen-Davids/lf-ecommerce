import { expect, describe, it } from "vitest";
import { productApi } from "../services/products";
import { setupApiStore } from "./test-utils";

describe("Product API", () => {
  const storeRef = setupApiStore(productApi);

  it("should fetch all products from category", async () => {
    const result = await storeRef.store.dispatch(
      productApi.endpoints.getAllProducts.initiate("smartphones")
    );

    expect(result.data).toBeDefined();
    expect(Array.isArray(result.data)).toBe(true);
    expect(result.data?.length).toBeGreaterThan(0);
    expect(result.data?.[0]).toHaveProperty("title");
    expect(result.data?.[0]).toHaveProperty("price");
  });

  it("should fetch a product by ID", async () => {
    const result = await storeRef.store.dispatch(
      productApi.endpoints.getProductById.initiate({ id: "1" })
    );

    expect(result.data).toBeDefined();
    expect(result.data).toHaveProperty("id", 1);
    expect(result.data).toHaveProperty("title");
    expect(result.data).toHaveProperty("price");
  });

  it("should search products by name", async () => {
    const result = await storeRef.store.dispatch(
      productApi.endpoints.getProductByName.initiate({
        search: "phone",
        limit: 5,
        sort: "price",
        order: "asc",
      })
    );

    expect(result.data).toBeDefined();
    expect(result.data?.products).toBeDefined();
    expect(Array.isArray(result.data?.products)).toBe(true);
    expect(result.data?.total).toBeDefined();
    expect(typeof result.data?.total).toBe("number");
  });
});
