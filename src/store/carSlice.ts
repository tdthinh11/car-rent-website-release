import { createSlice } from '@reduxjs/toolkit';

import { carType } from '@/assets/data/cars';
import { carServices } from '@/service/carServices';

import { AppThunk } from './store';

export type carReducerType = {
  searchKey: string;
  listPopularCar: [];
  listRecommendCar: [];
  listAll: [];
  locations: [];
  isLoading: boolean;
};

const initialState: carReducerType = {
  searchKey: '',
  listPopularCar: [],
  listRecommendCar: [],
  listAll: [],
  locations: [],
  isLoading: false,
};

const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    changeSearchKey: (state, action) => {
      state.searchKey = action.payload;
    },
    updateListCar: (state, action) => {
      state.listPopularCar = action.payload.listPopularCar;
      state.listRecommendCar = action.payload.listRecommendCar;
      state.listAll = action.payload.listAll;
    },
    getLocation: (state, action) => {
      state.locations = action.payload;
    },
    changeIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { changeSearchKey, updateListCar, getLocation, changeIsLoading } = carSlice.actions;
export default carSlice.reducer;

// ******************************** ACTION THUNK **************************** //
export const getListCarsApi = (searchKey: string): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(changeIsLoading(true));
      const listCar = await carServices.getSearchCar(searchKey);
      const listAll = listCar.data;
      const listPopularCar = listCar.data.filter((car: carType) => car.typeBusiness === 'popular');
      const listRecommendCar = listCar.data.filter(
        (car: carType) => car.typeBusiness === 'recommend',
      );
      dispatch(
        updateListCar({
          listPopularCar,
          listRecommendCar,
          listAll,
        }),
      );
      dispatch(changeIsLoading(false));
    } catch (_error) {
      // console.log(error)
    }
  };
};

export const getListLocation = (): AppThunk => {
  return async (dispatch) => {
    try {
      const location = await carServices.getLocationList();
      dispatch(getLocation(location.data));
    } catch (_error) {
      // console.log(error)
    }
  };
};

export const changeIsLikeStatus = (car: carType): AppThunk => {
  return async (dispatch, getState) => {
    const { carReducer } = getState();
    const index = carReducer.listAll.findIndex((carItem: carType) => carItem.id === car.id);
    if (index != -1) {
      const listAllUpdate: carType[] = [...carReducer.listAll];
      listAllUpdate[index] = { ...car, isLiked: !car.isLiked };
      const listPopularCar = listAllUpdate.filter((car: carType) => car.typeBusiness === 'popular');
      const listRecommendCar = listAllUpdate.filter(
        (car: carType) => car.typeBusiness === 'recommend',
      );
      dispatch(
        updateListCar({
          listAll: listAllUpdate,
          listPopularCar,
          listRecommendCar,
        }),
      );
    }
  };
};

export const carActionThunk = {
  getListCarsApi,
  getListLocation,
  changeIsLikeStatus,
};
