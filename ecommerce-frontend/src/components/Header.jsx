import { NavLink, Link } from "react-router";
import { ShoppingCart, Search, Menu } from "lucide-react";
import { Button } from "./ui/button";
import logo from "../assets/cartLogo.png";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router";

export default function Header({ cart = [] }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get("search");
  const [search, setSearch] = useState(searchText || "");

  const updateSearchInput = (e) => {
    setSearch(e.target.value);
  };

  const onSubmitSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/?search=${search}`);
    }
  };

  let totalQuantity = 0;

  (cart || []).forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-100 shadow-md">
      <div className="flex h-16 w-full justify-between items-center p-4 md:p-6 gap-4">
        <div className="flex items-center justify-start">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <NavLink to="/" className="flex items-center cursor-pointer">
            <img
              src={logo}
              alt="Logo of the Bussiness"
              className="h-[50px] w-auto object-contain "
            />
            <span className="text-xl font-bold tracking-tight text-neutral-900 relative w-fit after:block after:content-[''] after:absolute after:bottom-[1px] after:h-[2px] after:bg-blue-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left ">
              MhY
            </span>
          </NavLink>
        </div>

        <div className="hidden md:flex flex-1 max-w-lg mx-auto">
          <div className="relative w-full">
            <input
              type="text"
              value={search}
              onChange={updateSearchInput}
              onKeyDown={onSubmitSearch}
              placeholder="Search"
              className=" w-full h-10 px-3 border-2 border-gray-300 outline-none placeholder:text-gray-500 rounded-lg transition duration-300 ease-out focus:ring-1 focus:ring-blue-300 focus:border-blue-300"
            />
            <Button
              onClick={() => navigate(`/?search=${search}`)}
              className="absolute right-0 top-0 h-10 rounded-l-none bg-neutral-950 hover:brightness-90 transition duration-300 ease-in-out"
            >
              <Search className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>

        <ul className="flex pr-8 items-center gap-5 text-sm font-medium text-neutral-700">
          <li>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `hidden md:flex items-center relative w-fit transition-colors after:block after:content-[''] after:absolute after:bottom-[-4px] after:h-[2px] after:bg-blue-600 after:w-full after:transition-transform after:duration-300 after:origin-left
                ${
                  isActive
                    ? "text-neutral-900 after:scale-x-100 font-bold"
                    : "text-neutral-600 hover:text-neutral-900 after:scale-x-0 hover:after:scale-x-100"
                }`
              }
            >
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/checkout"
              className="flex items-center gap-2 relative w-fit after:block after:content-[''] after:absolute after:bottom-[-4px] after:h-[2px] after:bg-blue-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
            >
              <span className="relative">
                <ShoppingCart className="h-5 w-5"></ShoppingCart>
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-neutral-100">
                  {totalQuantity ?? 0}
                </span>
              </span>
              <span className="hidden md:block">Cart</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}
