import { createContext, FC, PropsWithChildren, useEffect, useReducer } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { GET_ME_QUERY_KEY, getMe } from "~apis/users.api";
import Loading from "~components/common/Loading";
import configs from "~configs";
import { SYSTEM_MESSAGES } from "~utils/constants";

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
  const [cookies] = useCookies([configs.cookies.accessToken]);
  const queryClient = useQueryClient();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, refetch: userRefetch } = useQuery({
    queryKey: [GET_ME_QUERY_KEY],
    queryFn: () => getMe(),
    enabled: Boolean(cookies[configs.cookies.accessToken]),
    select: (data) => data.data.data.user,
    refetchOnWindowFocus: false,
  });

  // Listen to the cookies to control the authentication state
  useEffect(() => {
    if (!cookies[configs.cookies.accessToken]) {
      queryClient.removeQueries({ queryKey: [GET_ME_QUERY_KEY] });
      return dispatch(initialize({ isAuthenticated: false, user: null }));
    }
  }, [cookies, queryClient]);

  // Get current user info when the app is initialized
  useEffect(() => {
    (async () => {
      if (!cookies[configs.cookies.accessToken]) {
        queryClient.removeQueries({ queryKey: [GET_ME_QUERY_KEY] });
        return dispatch(initialize({ isAuthenticated: false, user: null }));
      }

      try {
        const { data } = await userRefetch();
        if (data) {
          dispatch(initialize({ isAuthenticated: true, user: data }));
        }
      } catch (error) {
        toast.error(SYSTEM_MESSAGES.SOMETHING_WENT_WRONG);
        dispatch(initialize({ isAuthenticated: false, user: null }));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update the user info when the user info is fetched
  useEffect(() => {
    if (data) dispatch(initialize({ isAuthenticated: true, user: data }));
  }, [data]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {state.isInitialized ? children : <Loading />}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
