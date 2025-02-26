import { columns } from "./columns";
import { users } from "./constant";
import { DataTable } from "./data-table";
import { AddUser } from "./add-user";

function UsersPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-bold uppercase text-xl">Users</h2>
        <AddUser />
      </div>
      <DataTable columns={columns} data={users} />
    </div>
  );
}
export default UsersPage;
