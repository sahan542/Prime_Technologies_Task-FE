export const API_ENDPOINTS = {
  LOGING: "auth/login",
  REGISTER: "auth/signup",
  RESET_PASSWORD_REQUEST: "auth/reset-password-request",
  RESET_OTP: "auth/request-otp",
  VERIFY_PHONE_NUMBER: "auth/verify-mobile",
  RESET_PASSWORD: "auth/reset-password",
  CREATE_ORDER: "lead/create-order",
  DELETE_ORDER: "admin/orders/${orderId}",
  GET_AUTH: "auth/auth-data",
  GET_CLIENT_ORDERS: "lead/get-all-client-orders-paginated",
  GET_ADMIN_ORDERS: "admin/orders?page=${currentPage}&limit=8",

  GET_PRODUCT_BY_SLUG: (slug: string) => `products/${slug}`,
  GET_PRODUCTS_BY_CATEGORY: (categoryName: string) => `products/category/${encodeURIComponent(categoryName)}`,

  ASK_QUESTIONS: "qna/ask",
  GET_QUESTIONS_BY_ID: (productId: number) => `qna/product/${productId}`,
  ADD_REVIEW: "reviews/add-new",
  GET_REVIEWS_BY_ID: (productId: number) => `reviews/product/${productId}`,


  GET_ALL_USERS: "admin/users?page=${currentPage}&limit=8",
  EXPORT_ALL_USERS: "admin/users/export",
  TOGGLE_ADMIN_STATUS: "admin/users/${id}/admin-status",
  DELETE_USER: "admin/users/${id}",

  GET_ALL_REVIEWS: "admin/reviews?page=${currentPage}&limit=8",
  UPDATE_REVIEW_PUBLIC_STATUS: "admin/reviews/${reviewId}?is_public=${updatedIsPublic}",
  DELETE_REVIEW_BYID: "admin/reviews/${reviewId}",

  PRODUCTS: "/api/products",
  PRODUCTS_SET: "/products",





  STATUS_CHANGE: "lead/update-order-status",
  PAYMENT_STATUS_UPDATE: "admin/orders/${orderId}/payment_status",
};

