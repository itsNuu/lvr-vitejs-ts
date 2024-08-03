import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Product {
  id: number;
  product_name: string;
  category: string;
  price: number;
  discount?: number;
}

interface ProductState {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  status: "idle",
  error: null,
};

export type { ProductState };

// Fetch products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/products");
    return response.data;
  }
);

// Add a new product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product: Omit<Product, "id">) => {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/products",
      product
    );
    return response.data;
  }
);

// Update a product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product: Product) => {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/products/${product.id}`,
      product
    );
    return response.data;
  }
);

// Delete a product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: number) => {
    await axios.delete(`http://127.0.0.1:8000/api/products/${id}`);
    return id;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      });
  },
});

export default productSlice.reducer;
