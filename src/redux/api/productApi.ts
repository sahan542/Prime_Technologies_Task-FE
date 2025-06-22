import { baseApi } from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (args: Record<string, any>) => ({
        url: "/products",
        method: "GET",
        params: args,
      }),
      providesTags: ["product"],
    }),
    getSingleProduct: builder.query({
      query: (slug: string) => ({
        url: `http://localhost:8000/api/products/${slug}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    addProduct: builder.mutation({
      query: (productData) => ({
        url: "/products/create-product",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["product"],
    }),
    updateProduct: builder.mutation({
      query: (payload) => ({
        url: `/products/${payload.productId}`,
        method: "PATCH",
        body: payload.updatedData,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: (productId: string) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
