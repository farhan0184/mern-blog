import { useEffect, useState } from "react";
import DashboardProfile from "../components/DashboardProfile";
import { Sidebar } from "../components/Sidebar";
import SidebarDrawer from "../components/SidebarDrawer";
import { useLocation } from "react-router-dom";
import DashPost from "../components/DashPost";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('profile')
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])
  return (
    <div className="flex ">
      <div>
        {/* sider bar */}
        <Sidebar />
      </div>

      {/* main content */}
      <div className="w-full">
        <SidebarDrawer />
        {tab==='profile' &&<DashboardProfile />}
        {tab==='posts' &&<DashPost/>}
      </div>
    </div>
  )
}
