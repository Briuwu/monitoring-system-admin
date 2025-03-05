import { Nav } from "./nav";
import RequirementsTable from "./requirements-table";
import useAuth from "@/context/use-auth";

function ClientPage() {
  const { user: userAuth } = useAuth();

  return (
    <div>
      <Nav />
      <div className="p-5">{userAuth && <RequirementsTable />}</div>
    </div>
  );
}
export default ClientPage;
