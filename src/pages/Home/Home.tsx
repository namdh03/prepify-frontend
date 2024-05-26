import { Link } from "react-router-dom";

import { Button } from "~/components/ui/button";
import routes from "~/configs/routes";
import useDocumentTitle from "~/hooks/useDocumentTitle";

const Home = () => {
  useDocumentTitle("Prepify");

  return (
    <div className="flex gap-4">
      <Link to={routes.login}>
        <Button>Login</Button>
      </Link>
      <Link to={routes.register}>
        <Button>Register</Button>
      </Link>
    </div>
  );
};

export default Home;
