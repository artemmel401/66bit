import { NameSpace } from "../../consts/name-space";
import { State } from "../../types/state";

export const getThemeAction = (state: Pick<State, typeof NameSpace.App>) => 
  state[NameSpace.App].theme;
export const getLinksWayAction = (state: Pick<State, typeof NameSpace.App>) => 
  state[NameSpace.App].linksWay;