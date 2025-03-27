import { useState, useMemo } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { ComboboxFilter } from "../components/combobox-filter";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useFetchRequirements } from "@/hooks/requirements";
import { Requirement } from "@/lib/types";
import { getRemainingDays } from "@/lib/utils";

function RequirementsPage() {
  const { data: requirementList, isLoading } = useFetchRequirements("");
  const [statusFilter, setStatusFilter] = useState("");
  const [entityFilter, setEntityFilter] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [globalSearch, setGlobalSearch] = useState("");

  const filteredData = useMemo(() => {
    if (!requirementList) return [];
    let result = requirementList;

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
        [
          "complianceList",
          "entity",
          "personInCharge",
          "department",
          "documentReference",
          "frequencyOfCompliance",
          "typeOfCompliance",
        ].some((value) => {
          const data = requirement[value as keyof Requirement] as string;
          return data.toLowerCase().includes(globalSearch.toLowerCase());
        })
      );
    }

    // Automatically sort by remaining days
    return result.sort((a, b) => {
      const remainingDaysA = getRemainingDays(a.expiration);
      const remainingDaysB = getRemainingDays(b.expiration);
      return remainingDaysA - remainingDaysB;
    });
  }, [
    statusFilter,
    entityFilter,
    globalSearch,
    departmentFilter,
    requirementList,
  ]);

  if (isLoading) {
    return <div>Loading requirements...</div>;
  }

  if (!requirementList) {
    return <div>No data found</div>;
  }

  const statusOptions = Array.from(
    new Set(requirementList.map((requirement) => requirement.status))
  ).map((status) => ({
    value: status,
    label: status,
  }));

  const entityOptions = Array.from(
    new Set(requirementList.map((requirement) => requirement.entity))
  ).map((entity) => ({
    value: entity,
    label: entity,
  }));

  const departmentOptions = Array.from(
    new Set(requirementList.map((requirement) => requirement.department))
  ).map((department) => ({
    value: department,
    label: department,
  }));

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-xl uppercase">
          Legal and other requirement documents
        </h2>
        <Button asChild>
          <Link to="/dashboard/requirements/add">+ Add Document</Link>
        </Button>
      </div>
      <Separator className="my-5" />
      <div className="mb-5 flex gap-5 items-center">
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
