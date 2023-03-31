import { createSlice } from '@reduxjs/toolkit';

export type DrawerType = {
  isShowDrawer: boolean;
};

const initialState: DrawerType = {
  isShowDrawer: false,
};

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    toggleIsShow: (state, action) => {
      state.isShowDrawer = action.payload !== 'reset' ? !state.isShowDrawer : false;
    },
  },
});

export const { toggleIsShow } = drawerSlice.actions;
export default drawerSlice.reducer;
