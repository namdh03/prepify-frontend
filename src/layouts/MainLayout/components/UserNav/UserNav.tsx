import { Link } from "react-router-dom";

import { useQueryClient } from "@tanstack/react-query";

import { GET_ME_QUERY_KEY } from "~apis/user.api";
import { Avatar, AvatarFallback, AvatarImage } from "~components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~components/ui/dropdown-menu";
import configs from "~configs";
import { signOut } from "~contexts/auth/auth.reducer";
import useAuth from "~hooks/useAuth";

const UserNav = () => {
  const { user, dispatch } = useAuth();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    dispatch(signOut());
    queryClient.removeQueries({
      queryKey: [GET_ME_QUERY_KEY],
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage className="object-cover" src={user?.image || ""} alt={user?.fullname} />
          <AvatarFallback>{user?.fullname.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <Link to={configs.routes.userProfile}>
            <DropdownMenuItem className="cursor-pointer">Tài Khoản Của Tôi</DropdownMenuItem>
          </Link>

          <Link to={configs.routes.userPurchase}>
            <DropdownMenuItem className="cursor-pointer">Đơn Mua</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          Đăng Xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
