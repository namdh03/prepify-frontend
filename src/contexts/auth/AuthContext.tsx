import { createContext, FC, PropsWithChildren, useEffect, useReducer } from "react";

import { useQuery } from "@tanstack/react-query";

import { getMe, getMeQueryKey } from "~/apis/users.api";
import { getToken } from "~/utils/cookies";

import { initialize, reducer } from "./auth.reducer";
import { AuthContextType, AuthState } from "./auth.type";

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const AuthContext = createContext<AuthContextType>({
  ...initialState,
  dispatch: () => null,
});

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { refetch } = useQuery({
    queryKey: [getMeQueryKey],
    queryFn: () => getMe(),
    enabled: false,
  });

  useEffect(() => {
    (async () => {
      const accessToken = getToken();
      if (!accessToken) {
        return dispatch(initialize({ isAuthenticated: false, user: null }));
      }

      try {
        const { data } = await refetch();
        if (data) {
          const user = data.data.data.user;
          dispatch(initialize({ isAuthenticated: true, user }));
        }
      } catch (error) {
        dispatch(initialize({ isAuthenticated: false, user: null }));
      }
    })();
  }, [refetch]);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
