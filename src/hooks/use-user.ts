import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";

export type User = {
  id: string;
  department: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
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

  const getUser = async (id: string) => {
    const docRef = doc(usersCollectionRef, id);
    try {
      const data = await getDoc(docRef);
      const userData = data.data() as User;

      return userData;
    } catch (error) {
      console.error(error);
    }
  };

  type CreateUser = Omit<User, "id">;
  const createUser = async (userData: CreateUser & { password: string }) => {
    try {
      await addDoc(usersCollectionRef, {
        firstName: userData.firstName,
        middleName: userData.middleName || "N/A",
        lastName: userData.lastName,
        email: userData.email,
        department: userData.department,
        // uid: user.uid,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    userList,
    createUser,
    getUserList,
    getUser,
  };
};
