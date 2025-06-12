import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
  orderId: string | null;
  orderDetails: any | null; // You can define the structure of your order here
}

const initialState: OrderState = {
  orderId: null,
  orderDetails: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderDetails(state, action: PayloadAction<any>) {
      state.orderDetails = action.payload;
    },
    setOrderId(state, action: PayloadAction<string>) {
      state.orderId = action.payload;
    },
  },
});

export const { setOrderDetails, setOrderId } = orderSlice.actions;
export default orderSlice.reducer;
