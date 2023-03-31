import { createSlice } from '@reduxjs/toolkit';

import { IPickDropValue } from '@/components/PickDrop/PickDrop';
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
  pickUpValue: IPickDropValue;
  dropOffValue: IPickDropValue;
  pickChecked: boolean;
  dropChecked: boolean;
};

const initialState: carReducerType = {
  searchKey: '',
  listAll: [],
  locations: [],
  isLoading: false,
  carDetail: null,
  categoryValue: [],
  pickUpValue: {
    location: null,
    date: '',
    time: '',
  },
  dropOffValue: {
    location: null,
    date: '',
    time: '',
  },
  pickChecked: false,
  dropChecked: false,
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
    updatePickUpValue: (state, action) => {
      state.pickUpValue = action.payload;
    },
    updateDropOffValue: (state, action) => {
      state.dropOffValue = action.payload;
    },
    updatePickChecked: (state) => {
      state.pickChecked = !state.pickChecked;
    },
    updateDropChecked: (state) => {
      state.dropChecked = !state.dropChecked;
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
  updatePickUpValue,
  updateDropOffValue,
  updatePickChecked,
  updateDropChecked,
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

    const data = listCar.data.filter((item: carType) => {
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
                item.price <= parseInt(listItemQuery[1]) ||
                item.priceWithoutDisCount <= parseInt(listItemQuery[1])
              );
            })
          : true) &&
        filterByPickUp(carReducer, item) &&
        filterByDropOff(carReducer, item)
      );
    });
    dispatch(updateListCar(data));
  };
};

const filterByPickUp = (carReducer: carReducerType, car: carType) => {
  if (carReducer.pickChecked) {
    return (
      (carReducer.pickUpValue.location?.value
        ? car.pickLocation.find((locationItem) => {
            return locationItem.value === carReducer.pickUpValue.location?.value;
          })
        : true) &&
      (carReducer.pickUpValue.date
        ? car.pickDate.find((date) => {
            return date === carReducer.pickUpValue.date;
          })
        : true) &&
      (carReducer.pickUpValue.time
        ? car.pickTime.find((time) => {
            return time === carReducer.pickUpValue.time;
          })
        : true)
    );
  }

  return true;
};

const filterByDropOff = (carReducer: carReducerType, car: carType) => {
  if (carReducer.dropChecked) {
    return (
      (carReducer.dropOffValue.location?.value
        ? car.dropLocation.find((location) => {
            return location.value === carReducer.dropOffValue.location?.value;
          })
        : true) &&
      (carReducer.dropOffValue.date
        ? car.dropDate.find((date) => {
            return date === carReducer.dropOffValue.date;
          })
        : true) &&
      (carReducer.dropOffValue.time
        ? car.dropTime.find((time) => {
            return time === carReducer.dropOffValue.time;
          })
        : true)
    );
  }

  return true;
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
        { name: 'Price', value: MAX_PRICE, section: 'PRICE', isSelected: true },
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
