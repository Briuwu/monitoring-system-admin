import { Logout } from "@/components/logout";
import { UpdatePasswordModal } from "./update-password-modal";

export const Nav = () => {
  return (
    <nav className="p-5 shadow flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-8 aspect-square rounded-full">
          <img src="../skpi-logo.webp" alt="" />
        </div>
        <h1 className="font-bold text-sm font-logo">
          Seiwa Kaiun Philippines, Inc.
        </h1>
      </div>
      <ul className="flex items-center gap-2">
        <li>
          <UpdatePasswordModal />
        </li>
        <li>
          <Logout />
        </li>
      </ul>
    </nav>
  );
};
