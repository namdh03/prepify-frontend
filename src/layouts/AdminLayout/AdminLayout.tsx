import { Outlet } from "react-router-dom";

import useIsCollapsed from "~hooks/useIsCollapsed";

import { Layout, LayoutBody, LayoutHeader } from "./components/Layout";
import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";

const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed();
  return (
    <Layout>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id="content"
        className={`overflow-x-hidden pt-16 transition-[margin]  md:pt-0 ${isCollapsed ? "md:ml-14" : "md:ml-64"} h-full`}
      >
        <LayoutHeader>
          <div className="flex w-full items-center justify-end">
            <div className="flex items-center space-x-4">
              <TopNav />
            </div>
          </div>
        </LayoutHeader>

        <LayoutBody>
          <Outlet />
        </LayoutBody>
      </main>
    </Layout>
  );
};

export default AdminLayout;
