import { Outlet } from "react-router-dom";

import useIsCollapsed from "~hooks/useIsCollapsed";

import { Layout, LayoutHeader } from "./components/Layout";
import Sidebar from "./components/Sidebar";
import UserNav from "./components/UserNav";

const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed();
  return (
    <div className="relative h-full bg-background">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id="content"
        className={`pt-16 transition-[margin] md:pt-0 ${isCollapsed ? "md:ml-14" : "md:ml-64"} h-full`}
      >
        <Layout>
          {/* ===== Top Heading ===== */}
          <LayoutHeader className="sticky top-0 shadow z-10">
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </LayoutHeader>

          <Outlet />
        </Layout>
      </main>
    </div>
  );
};

export default AdminLayout;
