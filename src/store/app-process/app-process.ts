import { createSlice } from '@reduxjs/toolkit';
import { AppProcess } from './../../types/state';
import { NameSpace } from '../../consts/name-space';
import { changeLinksWay, changeTheme } from './app-actions';
import { baseLinkWay } from '../../consts/links-way';

const initialState: AppProcess = {
  theme: 'light',
  linksWay: baseLinkWay
}

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(changeTheme, (state, action) => {
        state.theme = action.payload
      })
      .addCase(changeLinksWay, (state, action) => {
        state.linksWay = action.payload
      })
  }
})