import { createSlice } from '@reduxjs/toolkit';

export type carReducerType = {
  searchKey: string;
  listPopularCar: [];
  listRecommendCar: [];
};

const initialState: carReducerType = {
  searchKey: '',
  listPopularCar: [],
  listRecommendCar: [],
};

const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    changeSearchKey: (state, action) => {
      return { ...state, searchKey: action.payload };
    },
    updateListCar: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        listPopularCar: action.payload.listPopularCar,
        listRecommendCar: action.payload.listRecommendCar,
      };
    },
  },
});

export const { changeSearchKey, updateListCar } = carSlice.actions;
export default carSlice.reducer;
