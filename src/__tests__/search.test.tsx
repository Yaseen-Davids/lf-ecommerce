import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, describe, it } from "vitest";
import { Provider } from "react-redux";
import { Search } from "../pages/search/index";
import { setupListeners } from "@reduxjs/toolkit/query";
import { setupApiStore } from "./test-utils";
import { productApi } from "../services/products";

const store = setupApiStore(productApi).store;
setupListeners(store.dispatch);

describe("Search component", () => {
  it("renders search input and button", () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    expect(screen.getByPlaceholderText("Search…")).toBeInTheDocument();
  });

  it("updates search query based on input change", async () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText("Search…");
    fireEvent.change(searchInput, { target: { value: "Test" } });

    await waitFor(() => {
      expect(searchInput.value).toBe("Test");
    });
  });

  it("displays loading indicator when fetching", () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
