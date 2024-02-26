import { store } from "../store";

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type ThemeValues = 'light' | 'dark'

export type LinksWay = { name: string, link: string }[]

export type AppProcess = {
  theme: ThemeValues,
  linksWay: LinksWay
}