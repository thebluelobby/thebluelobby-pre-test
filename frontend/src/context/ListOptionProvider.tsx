import { ReactNode, useReducer } from "react";
import {
  FilterTypes,
  ListOptionContext,
  SortTypes,
  listOptionReducer,
} from "./ListOptionContext";

type CountProviderProps = { children: ReactNode };

function ListOptionProvider({ children }: CountProviderProps) {
  const [state, dispatch] = useReducer(listOptionReducer, {
    filter: FilterTypes.ALL,
    sort: {
      by: SortTypes.CREATION_DATE,
      isAscendingOrder: true,
    },
  });

  const value = { state, dispatch };
  return (
    <ListOptionContext.Provider value={value}>
      {children}
    </ListOptionContext.Provider>
  );
}

//
export { ListOptionProvider };
