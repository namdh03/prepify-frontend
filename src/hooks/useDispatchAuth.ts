import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { getMe, getMeQueryKey } from "~/apis/users.api";
import { signIn } from "~/contexts/auth/auth.reducer";
import { getToken } from "~/utils/cookies";

import useAuth from "./useAuth";

const WAIT_TEDDY_TIME = 2000;

const useDispatchAuth = () => {
  const { dispatch } = useAuth();

  // Get current user info
  const { data: userData } = useQuery({
    queryKey: [getMeQueryKey],
    queryFn: () => getMe(),
    enabled: Boolean(getToken()),
  });

  useEffect(() => {
    if (userData) {
      setTimeout(() => {
        const user = userData.data.data.user;
        dispatch(signIn({ isAuthenticated: true, user }));
      }, WAIT_TEDDY_TIME);
    }
  }, [dispatch, userData]);
};

export default useDispatchAuth;
