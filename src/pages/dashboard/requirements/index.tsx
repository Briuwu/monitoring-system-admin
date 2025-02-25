import { columns } from "./columns";
import { requirements } from "./constant";
import { DataTable } from "./data-table";

function RequirementsPage() {
  return (
    <div className="space-y-5">
      <h2 className="font-bold text-xl uppercase text-center">
        Legal and other requirement documents
      </h2>
      <DataTable columns={columns} data={requirements} />
    </div>
  );
}
export default RequirementsPage;
