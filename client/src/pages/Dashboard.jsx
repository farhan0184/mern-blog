import DashboardProfile from "../components/DashboardProfile";
import { Sidebar } from "../components/Sidebar";
import SidebarDrawer from "../components/SidebarDrawer";

export default function Dashboard() {
  return (
    <div className="flex ">
      <div>
        {/* sider bar */}
        <Sidebar />
      </div>

      {/* main content */}
      <div className="w-full">
        <SidebarDrawer />
        <DashboardProfile />
      </div>
    </div>
  )
}
