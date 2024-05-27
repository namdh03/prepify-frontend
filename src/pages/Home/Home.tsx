import { Link, useNavigate } from "react-router-dom";

import { useQueryClient } from "@tanstack/react-query";

import { Button } from "~/components/ui/button";
import configs from "~/configs";
import { signOut } from "~/contexts/auth/auth.reducer";
import useAuth from "~/hooks/useAuth";
import useDocumentTitle from "~/hooks/useDocumentTitle";

const Home = () => {
  useDocumentTitle("Prepify");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, dispatch } = useAuth();

  const handleLogout = () => {
    dispatch(signOut());
    queryClient.removeQueries({
      queryKey: ["me"],
    });
    navigate(configs.routes.login);
  };

  return (
    <div className="flex gap-4">
      <Button>
        <Link to={configs.routes.login}>Login</Link>
      </Button>
      <Button>
        <Link to={configs.routes.register}>Register</Link>
      </Button>
      <Button onClick={handleLogout}>Logout</Button>

      <p>{user?.fullname}</p>
    </div>
  );
};

export default Home;
