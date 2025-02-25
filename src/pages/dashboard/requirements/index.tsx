import { columns } from "./columns";
import { payments } from "./constant";
import { DataTable } from "./data-table";

function RequirementsPage() {
  const data = payments;
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
export default RequirementsPage;
