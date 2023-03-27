import { createSlice } from '@reduxjs/toolkit';

import { carType } from '@/model/cars';
import { carServices, categoryType } from '@/service/carServices';
import { CapacityCategory, MAX_PRICE, TypeCategory } from '@/utils/constant';

import { AppThunk } from './store';

export type carReducerType = {
  searchKey: string;
  listAll: carType[];
  locations: [];
  isLoading: boolean;
  carDetail: carType | null;
  categoryValue: categoryType[];
};

const initialState: carReducerType = {
  searchKey: '',
  listAll: [],
  locations: [],
  isLoading: false,
  carDetail: null,
  categoryValue: [],
};

const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    changeSearchKey: (state, action) => {
      state.searchKey = action.payload;
    },
    updateListCar: (state, action) => {
      state.listAll = action.payload;
    },
    getLocation: (state, action) => {
      state.locations = action.payload;
    },
    changeIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    updateCarDetail: (state, action) => {
      state.carDetail = action.payload;
    },
    updateCategoryValue: (state, action) => {
      state.categoryValue = action.payload;
    },
  },
});

export const {
  changeSearchKey,
  updateListCar,
  getLocation,
  changeIsLoading,
  updateCarDetail,
  updateCategoryValue,
} = carSlice.actions;
export default carSlice.reducer;

// ******************************** ACTION THUNK **************************** //
export const getListCarsApi = (searchKey: string): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(changeIsLoading(true));
      const listCar = await carServices.getSearchCar(searchKey);
      const listAll = listCar.data;
      dispatch(updateListCar(listAll));
      dispatch(changeIsLoading(false));
    } catch (_error) {
      // console.log(error)
    }
  };
};

export const filterByCategory = (filterQuery = ''): AppThunk => {
  return async (dispatch, getState) => {
    const { carReducer } = getState();
    const listCar = await carServices.getSearchCar(carReducer.searchKey);
    let data = [];

    // Group of filter Sport=true&SUV=true&Two=true&price=10
    const queryObject = Object.fromEntries([...new URLSearchParams(filterQuery)]);
    const groupType = Object.keys(TypeCategory).reduce((result, typeItem) => {
      if (
        Object.entries(queryObject).find((item) => item[0].toLowerCase() === typeItem.toLowerCase())
      ) {
        return { ...result, [typeItem]: queryObject[typeItem] };
      }
      return { ...result };
    }, {});
    const groupCapacity = Object.keys(CapacityCategory).reduce((result, typeItem) => {
      if (
        Object.entries(queryObject).find((item) => item[0].toLowerCase() === typeItem.toLowerCase())
      ) {
        return { ...result, [typeItem]: queryObject[typeItem] };
      }
      return { ...result };
    }, {});
    const groupPrice = Object.entries(queryObject).reduce(
      (result, priceItem) => {
        if (priceItem[0] === 'price') {
          return { price: priceItem[1] };
        }
        return { ...result };
      },
      { price: `${MAX_PRICE}` },
    );

    if (filterQuery) {
      data = listCar.data.filter((item: carType) => {
        return (
          (Object.entries(groupType).length
            ? Object.entries(groupType).find((listItemQuery) => {
                return item.type.toLowerCase() === listItemQuery[0].toLowerCase();
              })
            : true) &&
          (Object.entries(groupCapacity).length
            ? Object.entries(groupCapacity).find((listItemQuery) => {
                return (
                  item.capacity.toString().toLowerCase() ===
                  CapacityCategory[listItemQuery[0] as keyof typeof CapacityCategory]
                );
              })
            : true) &&
          (Object.entries(groupPrice).length
            ? Object.entries(groupPrice).find((listItemQuery) => {
                return (
                  item.price < parseInt(listItemQuery[1]) ||
                  item.priceWithoutDisCount < parseInt(listItemQuery[1])
                );
              })
            : true)
        );
      });
    } else {
      data = [...listCar.data];
    }
    dispatch(updateListCar(data));
  };
};

export const getListLocation = (): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(changeIsLoading(true));
      const location = await carServices.getLocationList();
      dispatch(getLocation(location.data));
      dispatch(changeIsLoading(false));
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
      dispatch(updateListCar(listAllUpdate));
    }
  };
};

export const updateCarDetailThunk = (carId: string): AppThunk => {
  return async (dispatch, getState) => {
    const { carReducer } = getState();
    const carUpdate = carReducer.listAll.find((carItem: carType) => carItem.id === carId);
    dispatch(updateCarDetail(carUpdate));
  };
};

export const getCategoryData = (): AppThunk => {
  return async (dispatch) => {
    const data = await carServices.getCategory();
    dispatch(
      updateCategoryValue([
        ...data.data,
        { name: 'Price', value: 0, section: 'PRICE', isSelected: true },
      ]),
    );
  };
};

export const changeCategoryValue = (isSelected: boolean, itemCheckBox: categoryType): AppThunk => {
  return async (dispatch, getState) => {
    const { carReducer } = getState();
    const itemIndex = carReducer.categoryValue.findIndex((item) => {
      return item.name.trim() === itemCheckBox.name.trim();
    });
    const valueUpdate = [...carReducer.categoryValue];
    if (itemIndex !== -1) {
      valueUpdate[itemIndex] =
        itemCheckBox.name !== 'Price'
          ? { ...valueUpdate[itemIndex], isSelected: isSelected }
          : { ...valueUpdate[itemIndex], value: itemCheckBox.value };
      dispatch(updateCategoryValue(valueUpdate));
    }
  };
};

export const carActionThunk = {
  getListCarsApi,
  getListLocation,
  changeIsLikeStatus,
  updateCarDetailThunk,
  getCategoryData,
  changeCategoryValue,
  filterByCategory,
};
