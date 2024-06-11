import { useEffect, useRef } from "react";

import { useQuery } from "@tanstack/react-query";

import { GET_ME_QUERY_KEY, getMe } from "~apis/users.api";
import { signIn } from "~contexts/auth/auth.reducer";
import { getToken } from "~utils/cookies";

import useAuth from "./useAuth";

const WAIT_TEDDY_TIME = 2000;

const useDispatchAuth = () => {
  const idTimeOutRef = useRef<NodeJS.Timeout | null>(null);
  const { dispatch } = useAuth();

  // Get current user info
  const { data } = useQuery({
    queryKey: [GET_ME_QUERY_KEY],
    queryFn: () => getMe(),
    enabled: Boolean(getToken()),
    select: (data) => data.data.data.user,
  });

  useEffect(() => {
    if (data) {
      idTimeOutRef.current = setTimeout(() => {
        dispatch(signIn({ isAuthenticated: true, user: data }));
      }, WAIT_TEDDY_TIME);
    }

    return () => {
      if (idTimeOutRef.current) {
        clearTimeout(idTimeOutRef.current);
      }
    };
  }, [data, dispatch]);
};

export default useDispatchAuth;
