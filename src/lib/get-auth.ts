import { account } from "@/appwrite";

export default async function fetchAuthUser(user: boolean) {
  try {
    if (!user) return false;

    try {
      const session = await account.getSession("current");

      if (session && session.current) {
        localStorage.setItem("session", JSON.stringify(session.current));
        user = session.current;

        const data = await account.get();

        localStorage.setItem("user-department", JSON.stringify(data.labels[1]));
        localStorage.setItem("name", JSON.stringify(data.name));
        return user;
      } else {
        await cleanupSession();
        return false;
      }
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("Session not found")
      ) {
        console.log("Session not found in Appwrite");
      } else {
        console.error("Session error:", error);
      }

      await cleanupSession();
      return false;
    }
  } catch (outerError) {
    console.error("Unexpected error in fetchAuthUser:", outerError);
    await cleanupSession();
    return false;
  }
}

async function cleanupSession() {
  try {
    localStorage.clear();
    await account.deleteSession("current");
  } catch (cleanupError) {
    console.error("Error deleting session:", cleanupError);
    localStorage.clear();
  }
}
