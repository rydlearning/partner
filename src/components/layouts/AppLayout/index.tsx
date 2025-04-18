import { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-[100vw] h-[100vh] relative bg-[#F9F9F9]">
      <Navbar />
      <Sidebar />
      <div className="ml-[250px] pt-[70px] mr-12 ">{children}</div>
      <Footer />
    </div>
  );
};

export default AppLayout;
