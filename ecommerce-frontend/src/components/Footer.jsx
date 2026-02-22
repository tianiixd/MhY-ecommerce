import { Link } from "react-router";
import dayjs from "dayjs";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-300 bg-slate-100 py-5">
      <p className="text-sm text-neutral-500 text-center">
        &copy; {dayjs().format("YYYY")} MhY Store. All rights reserved.
      </p>
    </footer>
  );
}
