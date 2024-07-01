import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { GET_ME_QUERY_KEY, getMe } from "~apis/user.api";
import { signIn } from "~contexts/auth/auth.reducer";
import { GUEST_URLS } from "~utils/constants";
import { getAccessToken } from "~utils/cookies";

import useAuth from "./useAuth";

const WAIT_TEDDY_TIME = 2000;

const useDispatchAuth = () => {
  const idTimeOutRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  // Get current user info
  const { data } = useQuery({
    queryKey: [GET_ME_QUERY_KEY],
    queryFn: () => getMe(),
    enabled: Boolean(getAccessToken()),
    select: (data) => data.data.data.user,
  });

  useEffect(() => {
    if (data) {
      idTimeOutRef.current = setTimeout(() => {
        dispatch(signIn({ user: data }));
        if (!GUEST_URLS.includes(document.referrer)) navigate(-1);
      }, WAIT_TEDDY_TIME);
    }

    return () => {
      if (idTimeOutRef.current) {
        clearTimeout(idTimeOutRef.current);
      }
    };
  }, [data, dispatch, navigate]);
};

export default useDispatchAuth;
