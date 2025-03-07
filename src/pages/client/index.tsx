import { Nav } from "./nav";
import RequirementsTable from "./requirements-table";

function ClientPage() {
  return (
    <div>
      <Nav />
      <div className="p-5">
        <RequirementsTable />
      </div>
    </div>
  );
}
export default ClientPage;
