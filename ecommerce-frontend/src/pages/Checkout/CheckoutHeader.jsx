import { NavLink } from "react-router";
import logo from "../../assets/cartLogo.png";
import { Lock } from "lucide-react";

export default function CheckOutHeader({ itemsCount }) {
  return (
    <header className="sticky top-0 z-50 w-full bg-slate-100 shadow-md">
      <div className="flex h-16 w-full items-center p-4 md:p-6 gap max-w-6xl mx-auto">
        <NavLink to={"/"} className="flex items-center">
          <img
            src={logo}
            alt="Logo of the business"
            className="h-[50px] w-auto object-contain"
          />
          <span className="text-xl font-bold tracking-tight text-neutral-900 relative w-fit after:block after:content-[''] after:absolute after:bottom-[1px] after:h-[2px] after:bg-blue-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left ">
            MhY
          </span>
        </NavLink>

        <div className="mx-auto">
          <h2 className="text-xl font-medium text-neutral-700">
            Checkout (
            <NavLink
              to={"/"}
              className="text-blue-600 hover:text-blue-400 no-underline hover:underline transition-all ease-in-out"
            >
              <span>{itemsCount ? itemsCount : 0} items</span>
            </NavLink>
            )
          </h2>
        </div>

        <div>
          <Lock className="text-neutral-400 h-6 w-6" />
        </div>
      </div>
    </header>
  );
}
