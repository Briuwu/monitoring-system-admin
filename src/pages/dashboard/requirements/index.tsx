import { useCallback, useEffect, useState } from "react";
import { columns } from "./columns";
import { Requirements, requirements } from "./constant";
import { DataTable } from "./data-table";
import { ComboboxFilter } from "../components/combobox-filter";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

function RequirementsPage() {
  const [filteredData, setFilteredData] = useState(requirements);
  const [statusFilter, setStatusFilter] = useState("");
  const [entityFilter, setEntityFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [globalSearch, setGlobalSearch] = useState("");

  const handleFilter = useCallback(() => {
    let result = requirements;
    if (statusFilter) {
      result = result.filter(
        (requirement) =>
          requirement.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (entityFilter) {
      result = result.filter(
        (requirement) =>
          requirement.entity.toLowerCase() === entityFilter.toLowerCase()
      );
    }

    if (departmentFilter) {
      result = result.filter(
        (requirement) =>
          requirement.department.toLowerCase() ===
          departmentFilter.toLowerCase()
      );
    }

    if (globalSearch) {
      result = result.filter((requirement) =>
        ["compliance_list", "entity", "person_in_charge"].some((value) => {
          const data = requirement[value as keyof Requirements] as string;
          return data.toLowerCase().includes(globalSearch.toLowerCase());
        })
      );
    }

    setFilteredData(result);
  }, [statusFilter, entityFilter, globalSearch, departmentFilter]);

  const statusOptions = requirements.map((requirement) => ({
    value: requirement.status.toLowerCase(),
    label: requirement.status,
  }));

  const entityOptions = requirements.map((requirement) => ({
    value: requirement.entity.toLowerCase(),
    label: requirement.entity,
  }));

  const departmentOptions = requirements.map((requirement) => ({
    value: requirement.department.toLowerCase(),
    label: requirement.department,
  }));

  useEffect(() => {
    handleFilter();
  }, [handleFilter]);

  return (
    <div>
      <h2 className="font-bold text-xl uppercase text-center">
        Legal and other requirement documents
      </h2>
      <div className="mt-10 mb-5 flex gap-5 items-center">
        <div className="max-w-sm flex-1 relative">
          <Input
            placeholder="Search by compliance, entity, or person in charge..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            className="w-full pr-10"
          />
          <SearchIcon className="absolute top-1/2 right-3 transform -translate-y-1/2" />
        </div>
        <ComboboxFilter
          onFilter={setStatusFilter}
          options={statusOptions}
          placeholder="Filter by status..."
        />
        <ComboboxFilter
          onFilter={setEntityFilter}
          options={entityOptions}
          placeholder="Filter by entity..."
        />
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
export default RequirementsPage;
