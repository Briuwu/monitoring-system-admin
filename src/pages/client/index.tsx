import { useFetchUser } from "@/hooks/users";
import { Nav } from "./nav";
import RequirementsTable from "./requirements-table";

function ClientPage() {
  const user = JSON.parse(localStorage.getItem("user")!);

  const { data, isLoading } = useFetchUser(user.uid);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Nav />
      <div className="p-5">
        <RequirementsTable department={data!.department} />
      </div>
    </div>
  );
}
export default ClientPage;
