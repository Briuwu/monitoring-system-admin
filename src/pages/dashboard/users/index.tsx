import { columns } from "./columns";
import { DataTable } from "./data-table";
import { AddUser } from "./add-user";
import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { ComboboxFilter } from "../components/combobox-filter";
import { Separator } from "@/components/ui/separator";
import { useUser, User } from "@/hooks/use-user";

function UsersPage() {
  const { userList, getUserList } = useUser();
  const [filteredData, setFilteredData] = useState<User[]>(userList);
  const [globalSearch, setGlobalSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");

  const handleFilter = useCallback(() => {
    let result = userList;

    if (departmentFilter) {
      result = result.filter((user) => user.department === departmentFilter);
    }

    if (globalSearch) {
      result = result.filter((user) =>
        ["firstName", "middleName", "lastName", "email", "department"].some(
          (value) => {
            const data = user[value as keyof User] as string;
            return data.toLowerCase().includes(globalSearch.toLowerCase());
          }
        )
      );
    }

    setFilteredData(result);
  }, [globalSearch, departmentFilter, userList]);

  useEffect(() => {
    handleFilter();
    getUserList();
  }, [handleFilter]);

  const departmentOptions = Array.from(
    new Set(userList.map((user) => user.department))
  ).map((department) => ({
    value: department.toLowerCase(),
    label: department,
  }));

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-bold uppercase text-xl">Users</h2>
        <AddUser />
      </div>
      <Separator className="my-5" />
      <div className="flex gap-5 mb-5 items-center">
        <div className="relative max-w-xs flex-1">
          <Input
            placeholder="Search..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            className="w-full"
          />
          <SearchIcon className="absolute top-1/2 right-2 transform -translate-y-1/2" />
        </div>
        <ComboboxFilter
          onFilter={setDepartmentFilter}
          options={departmentOptions}
          placeholder="Filter by dept..."
        />
      </div>
      <DataTable columns={columns} data={filteredData} />
    </div>
  );
}
export default UsersPage;
