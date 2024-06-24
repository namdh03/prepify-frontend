import { Outlet } from "react-router-dom";

import { Separator } from "~components/ui/separator";
import Container from "~layouts/MainLayout/components/Container";
import Footer from "~layouts/MainLayout/components/Footer";
import Header from "~layouts/MainLayout/components/Header";

import SidebarNav from "./components/SidebarNav";
import sidebarNavItems from "./data/sidebarNavItems";

const UserLayout = () => {
  return (
    <>
      <Header />

      <Container>
        <div className="flex flex-col min-h-[calc(100vh-88px)] py-14">
          <div className="space-y-0.5">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Cài đặt</h1>
            <p className="text-muted-foreground">Quản lý cài đặt tài khoản và thiết lập ưu tiên e-mail.</p>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-1 flex-col space-y-8 overflow-auto lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="sticky top-0 lg:w-1/5">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="w-full p-1 pr-4">
              <div className="pb-16">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Footer />
    </>
  );
};

export default UserLayout;
