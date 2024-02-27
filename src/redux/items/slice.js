import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchHeader } from '../../utils/common';

export const getAllIds = createAsyncThunk(
  'items/getAllIds',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.post(import.meta.env.VITE_API_URL, {
        "action": "get_ids",
        "params": { "offset": 0 }
      }, fetchHeader)
      return data.result
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCurrentIds = createAsyncThunk(
  'items/getCurrentIds',
  async (offset, thunkAPI) => {
    try {
      const { data } = await axios.post(import.meta.env.VITE_API_URL, {
        "action": "get_ids",
        "params": { "offset": offset, "limit": 50 }
      }, fetchHeader)
      return data.result
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getItems = createAsyncThunk(
  'items/getItems',
  async (ids, thunkAPI) => {
    try {
      const { data } = await axios.post(import.meta.env.VITE_API_URL, {
        "action": "get_items",
        "params": { "ids": [...ids] }
      }, fetchHeader)
      return data.result
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getFields = createAsyncThunk(
  'items/getFields',
  async (ids, thunkAPI) => {
    try {
      const { data } = await axios.post(import.meta.env.VITE_API_URL, {
        "action": "get_fields",
        "params": { "field": "brand" }
      }
        , fetchHeader)
      return data.result
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const swapFilter = createAsyncThunk(
  'items/swapFilter',
  async (params, thunkAPI) => {
    try {
      console.log(params, 'params')
      const { data } = await axios.post(import.meta.env.VITE_API_URL, {
        "action": "filter",
        "params": params
      }
        , fetchHeader)
      return data.result
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error);
    }
  }
);


const initialState = {
  isLoading: false,
  isFiltering: false,
  allIds: [],
  currentIds: [],
  items: [],
  currentItems: [],
  pageCount: null,
  brands: [],
  itemOffset: 0,
  searchValue: '',
  priceValue: '',
}

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setCurrentItems: (state, { payload }) => {
      state.currentItems = payload
    },
    setSearchValue: (state, { payload }) => {
      state.searchValue = payload;
    },
    setPageCount: (state, { payload }) => {
      state.pageCount = payload;
    },
    setItemOffset: (state, { payload }) => {
      state.itemOffset = payload;
    },
    setPriceValue: (state, { payload }) => {
      state.priceValue = payload;
    },
    clearFilters: (state) => {
      state.isFiltering = false;
    },

  },
  extraReducers: (builder) => {
    builder.addCase(getAllIds.fulfilled, (state, { payload }) => {
      state.allIds = payload;
    });

    builder.addCase(getCurrentIds.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCurrentIds.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.currentIds = payload;
    });
    builder.addCase(getCurrentIds.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getItems.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.items = payload;
    });
    builder.addCase(getItems.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(swapFilter.pending, (state) => {
      state.isFiltering = true;
    });
    builder.addCase(swapFilter.fulfilled, (state, { payload }) => {
      state.currentIds = payload;
    });

    builder.addCase(getFields.fulfilled, (state, { payload }) => {
      state.brands = payload;
    });

  }
})

export const { setCurrentItems, setSearchValue, setPageCount, clearFilters, setItemOffset, setPriceValue } = itemsSlice.actions

export default itemsSlice.reducer