import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Product } from "../types/product";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], string>({
      query: (category: string) =>
        `/products/category/${category}?select=title,price,thumbnail,id,rating,reviews,description,images,shippingInformation&limit=10&sortBy=rating&order=desc`,
      transformResponse: (rawResult: { products: Product[] }) => {
        return rawResult.products;
      },
    }),
    getProductById: builder.query<Product, { id: string }>({
      query: ({ id }) => `/products/${id}`,
    }),
    getProductByName: builder.query<
      { products: Product[]; total: number },
      { search: string; limit: number; sort: string; order: string }
    >({
      query: ({ search, limit, sort, order }) =>
        `/products/search?q=${search}&limit=${limit}&sortBy=${sort}&order=${order}`,
      transformResponse: (rawResult: {
        products: Product[];
        total: number;
      }) => {
        return { products: rawResult.products, total: rawResult.total };
      },
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByNameQuery,
  useGetProductByIdQuery,
} = productApi;
