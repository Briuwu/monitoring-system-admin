import { Button } from "@/components/ui/button";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";

function SettingsPage() {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("User signed out successfully");
        // You might want to redirect the user to the login page here
      })
      .catch((error) => {
        // An error happened.
        console.error("Error signing out:", error);
      });
  };
  return (
    <div>
      <Button variant="destructive" onClick={handleSignOut}>
        Logout
      </Button>
    </div>
  );
}
export default SettingsPage;
