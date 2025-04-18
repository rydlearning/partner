import { Link, useLocation } from "react-router-dom";
import { AppLinks } from "../../../utils/constants";
import { useState } from "react";
import logo from "../../../assets/images/logo.svg";
import logout from "../../../assets/icons/logout.svg";
import settings from "../../../assets/icons/settings.svg";
import { toast } from "react-toastify";
import { getPlayerData } from "../../custom-hooks";

const Sidebar = () => {
  const location = useLocation();
  const [currentHover, setCurrentHover] = useState<number | null>(null);

  const partner = getPlayerData();
  const email = partner?.email;

  const partnerPassword = () => {
    window.location.href = `/partner/${email}/set-password`;
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <aside className="w-[220px] fixed bg-[#FFFFFF] h-full z-20 border-r border-r-[#DADCE0]">
      <div className="w-full h-[53px] border-b border-b-[#DADCE0]">
        <div className="flex h-fit mt-4 justify-center">
          <img src={logo} alt="logo" width={150} />
        </div>
      </div>

      <div className="mt-5 space-y-5">
        {AppLinks.map((item, i) => {
          const targetRoute = location.pathname.includes(item.route);

          if (item.name === "Parent List") {
            return (
              <div key={i}>
                <div className="mx-3 mt-3 mb-1 text-sm px-3  text-gray-500">
                  Parent Management
                </div>
                <Link
                  className={`flex items-center hover:bg-[#FFECF8] hover:text-[#A8518A] space-x-2 mx-3 mt-1 py-3 px-3 rounded-xl ${
                    targetRoute && "bg-[#FFECF8]"
                  }`}
                  to={item.route}
                  onMouseOver={() => setCurrentHover(item.id)}
                  onMouseOut={() => setCurrentHover(null)}
                >
                  <img
                    src={
                      targetRoute || currentHover === item.id
                        ? item.activeImg
                        : item.img
                    }
                    alt={item.name}
                  />
                  <div
                    className={`text-sm ${
                      targetRoute || currentHover === item.id
                        ? "text-[#A8518A]"
                        : "text-black"
                    }`}
                  >
                    {item.name}
                  </div>
                </Link>
              </div>
            );
          }

          if (item.name === "Invoices") {
            return (
              <div key={i}>
                <div className="mx-3 mt-3 mb-1 text-sm px-3 text-gray-500">
                  Financial Management
                </div>
                <Link
                  className={`flex items-center hover:bg-[#FFECF8] hover:text-[#A8518A] space-x-2 mx-3 py-3 px-3 rounded-xl ${
                    targetRoute && "bg-[#FFECF8]"
                  }`}
                  to={item.route}
                  onMouseOver={() => setCurrentHover(item.id)}
                  onMouseOut={() => setCurrentHover(null)}
                >
                  <img
                    src={
                      targetRoute || currentHover === item.id
                        ? item.activeImg
                        : item.img
                    }
                    alt={item.name}
                  />
                  <div
                    className={`text-sm ${
                      targetRoute || currentHover === item.id
                        ? "text-[#A8518A]"
                        : "text-black"
                    }`}
                  >
                    {item.name}
                  </div>
                </Link>
              </div>
            );
          }

          return (
            <Link
              className={`flex items-center hover:bg-[#FFECF8] hover:text-[#A8518A] space-x-2 mx-3 mt-1 py-3 px-3 rounded-xl ${
                targetRoute && "bg-[#FFECF8]"
              }`}
              key={i}
              to={item.route}
              onMouseOver={() => setCurrentHover(item.id)}
              onMouseOut={() => setCurrentHover(null)}
            >
              <img
                src={
                  targetRoute || currentHover === item.id
                    ? item.activeImg
                    : item.img
                }
                alt={item.name}
              />
              <div
                className={`text-sm ${
                  targetRoute || currentHover === item.id
                    ? "text-[#A8518A]"
                    : "text-black"
                }`}
              >
                {item.name}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="border-t border-[#DADCE0] absolute bottom-14 w-full pt-4 ">
        <div
          className="flex items-center text-sm hover:bg-[#FFECF8] hover:text-[#A8518A] space-x-2 mx-3 mt-1 py-3 px-3 rounded-xl cursor-pointer"
          onClick={toggleDropdown}
        >
          <img src={settings} alt="" />
          <p>Settings</p>
        </div>
        {isDropdownOpen && (
          <div
            className="absolute border  border-gray-300 right-10 bg-white py-2 rounded-xl"
            onClick={partnerPassword}
          >
            <p className="hover:bg-gray-100 px-4 py-2 text-sm w-full text-center cursor-pointer">
              Change Password
            </p>
          </div>
        )}

        <div
          className="flex items-center text-sm cursor-pointer hover:bg-[#FFECF8] hover:text-[#A8518A] h-fit space-x-2 mx-3 py-3 px-3 mt-5 rounded-xl "
          onClick={() => {
            //clear session
            if (confirm("Do you really want to logout ?")) {
              localStorage.clear();
              toast.error("Logged out successfully!");
              window.location.href = "/partner/login";
            }
          }}
        >
          <img src={logout} alt="" />
          <p>Log out</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
