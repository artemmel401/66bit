import { createAction } from "@reduxjs/toolkit";
import { LinksWay, ThemeValues } from "../../types/state";

enum AppAction {
  changeActive = 'app/changeTheme',
  changeLinksWay = 'app/changeLinksWay'
}

export const changeTheme = createAction<ThemeValues>(AppAction.changeActive)

export const changeLinksWay = createAction<LinksWay>(AppAction.changeLinksWay)