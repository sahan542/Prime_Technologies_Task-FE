import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

// const BACKED_URL = process.env.NEXT_PUBLIC_BACKED_URL;
const BACKED_URL = "http://64.227.146.100:8000/";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BACKED_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "user",
    "blog",
    "category",
    "product",
    "cart",
    "wishlist",
    "order",
    "review",
  ],
});
