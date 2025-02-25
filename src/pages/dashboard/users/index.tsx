import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { users } from "./constant";
import { DataTable } from "./data-table";

function UsersPage() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-bold uppercase text-xl">Users</h2>
        <Button>+ Add User</Button>
      </div>
      <DataTable columns={columns} data={users} />
    </div>
  );
}
export default UsersPage;
