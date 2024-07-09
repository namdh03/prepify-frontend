import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";
import { Link } from "react-router-dom";

import { useQueryClient } from "@tanstack/react-query";

import { GET_ME_QUERY_KEY } from "~apis/user.api";
import { Avatar, AvatarFallback, AvatarImage } from "~components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~components/ui/dropdown-menu";
import configs from "~configs";
import { signOut } from "~contexts/auth/auth.reducer";
import useAuth from "~hooks/useAuth";

import Button from "../Button";

export default function UserNav() {
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
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar || ""} alt="@shadcn" />
            <AvatarFallback>{user?.fullname.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.fullname}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <Link to={configs.routes.adminProfile}>
            <DropdownMenuItem className="cursor-pointer">
              Hồ sơ
              <DropdownMenuShortcut>
                <CgProfile size={14} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          Đăng xuất
          <DropdownMenuShortcut>
            <IoMdLogOut size={14} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
