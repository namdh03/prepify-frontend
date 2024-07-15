import { useLocation } from "react-router-dom";

const useCheckActiveNav = () => {
  const { pathname } = useLocation();

  const checkActiveNav = (nav: string) => pathname === nav;

  return { checkActiveNav };
};

export default useCheckActiveNav;
