import { Logout } from "@/components/logout";
import { Notification } from "./notification";

export const Nav = () => {
  return (
    <nav className="p-5 shadow flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-neutral-500"></div>
        <h1 className="font-bold text-sm font-logo">
          Seiwa Kaiun Philippines, Inc.
        </h1>
      </div>
      <ul className="flex items-center gap-2">
        <li>
          <Notification />
        </li>
        <li>
          <Logout />
        </li>
      </ul>
    </nav>
  );
};
