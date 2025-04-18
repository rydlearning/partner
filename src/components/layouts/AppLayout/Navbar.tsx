import { useLocation } from "react-router-dom";
import notification from "../../../assets/icons/navNotification.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";
import { getPlayerData } from "../../custom-hooks";
import { useState } from "react";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const partner = getPlayerData()
  const firstName = partner?.firstName
  const lastName = partner?.lastName

  const location = useLocation();
  const pathParts = location.pathname.split("/");
  const lastPathPart = pathParts[2];

  const partnerLogout = () => {
    toast.error("Logged out successfully!");
    localStorage.clear();
    window.location.href = "/partner/login";
  };

  return (
    <nav className=" w-full fixed  left-0 bg-[#fff] h-[70px] border z-10 border-b-[#DADCE0]">
      <section className=" flex items-center justify-between mt-2">
        <div className=" font-semibold text-xl ml-[250px]">
          {lastPathPart.charAt(0).toUpperCase() + lastPathPart.slice(1)}
        </div>

        <div className="flex items-center mr-16">
          <img src={notification} alt="notification" />
          <div className="flex items-center space-x-7 ml-5 relative">
              {/* // I USE DUMMY DATA SO THAT YOU CAN SEE HOW IT IS DISPLAY */}
              <div className="w-10 h-10">

            <img
              src={`https://api.dicebear.com/9.x/initials/svg?seed=${firstName}+${lastName}&backgroundColor=A8518A`}
              alt="avatar"
              className="rounded-full"
            />
              </div>
            <div>
              <p className="font-semibold">{firstName+" "+lastName}</p>
              <p className="text-[#838383] text-xs">{partner?.email}</p>
            </div>
            <img
              src={arrowDown}
              alt="arrow"
              onClick={toggleDropdown}
              className={`duration-300 cursor-pointer   ${
                isDropdownOpen ? "-rotate-180" : "rotate-0"
              }`}
            />
            {isDropdownOpen && (
              <div
                className="absolute border top-12 border-gray-300 w-[120px] -right-10 bg-white py-2 rounded-xl"
                onClick={partnerLogout}
              >
                <p className="hover:bg-gray-100 px-4 py-2 text-sm w-full text-center cursor-pointer">
                  Logout
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;

// import { useLocation } from "react-router-dom";
// import notification from "../../../assets/icons/navNotification.svg";
// import arrowDown from "../../../assets/icons/arrowDown.svg";
// import { getPlayerData } from "../../custom-hooks";
// import { useState } from "react";
// import { toast } from "react-toastify";

// const Navbar = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsDropdownOpen((prev) => !prev);
//   };

//   const partner = getPlayerData()
//   const firstName = partner.firstName
//   const lastName = partner.lastName

//   const location = useLocation();
//   const pathParts = location.pathname.split("/");
//   const lastPathPart = pathParts[2];

//   const partnerLogout = () => {
//     localStorage.clear();
//     window.location.href = "/partner/login";
//     toast.error('Logged out successfully!');
//   };

//   return (
//     <nav className=" w-full fixed  left-0 bg-[#fff] h-[70px] border z-10 border-b-[#DADCE0]">
//       <section className=" flex items-center justify-between mt-2">
//         <div className=" font-semibold text-xl ml-[250px]">
//           {lastPathPart.charAt(0).toUpperCase() + lastPathPart.slice(1)}
//         </div>

//         <div className="flex items-center mr-16">
//           <img src={notification} alt="notification" />
//           <div className="flex items-center space-x-7 ml-5 relative">
//             {/* use am like this  https://api.dicebear.com/9.x/initials/svg?seed={firstName}+{lastName}&backgroundColor=A8518A */}
//             <img
//               src="https://api.dicebear.com/9.x/initials/svg?seed=godwin+asuquo&backgroundColor=A8518A"
//               alt="avatar"
//               className="rounded-full"
//             />
//             <div>
//               <p className="font-semibold">{firstName+" "+lastName}</p>
//               <p className="text-[#838383] text-xs">{partner.email}</p>
//             </div>
//             <img
//               src={arrowDown}
//               alt="arrow"
//               onClick={toggleDropdown}
//               className={`duration-300 cursor-pointer   ${
//                 isDropdownOpen ? "-rotate-180" : "rotate-0"
//               }`}
//             />
//             {isDropdownOpen && (
//               <div className="absolute border top-12 border-gray-300 w-[120px] -right-10 bg-white py-2 rounded-xl" onClick={partnerLogout}>
//                 <p className="hover:bg-gray-100 px-4 py-2 text-sm w-full text-center cursor-pointer">
//                   Logout
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </section>
//     </nav>
//   );
// };

// export default Navbar;
