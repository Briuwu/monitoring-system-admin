import { useState, useEffect } from "react";
import { auth, db } from "@/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

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

  type CreateUser = Omit<User, "id">;
  const createUser = async (userData: CreateUser & { password: string }) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );
    const user = userCredential.user;
    try {
      await addDoc(usersCollectionRef, {
        firstName: userData.firstName,
        middleName: userData.middleName || "N/A",
        lastName: userData.lastName,
        email: userData.email,
        department: userData.department,
        uid: user.uid,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    userList,
    createUser,
    getUserList,
  };
};
