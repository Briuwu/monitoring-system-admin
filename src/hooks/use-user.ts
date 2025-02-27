import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

export type User = {
  id: string;
  department: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
};

export const useUser = () => {
  const [userList, setUserList] = useState<User[]>([]);

  const usersCollectionRef = collection(db, "Users");

  const getUserList = async () => {
    try {
      const data = await getDocs(usersCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as User[];

      setUserList(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  return {
    userList,
  };
};
