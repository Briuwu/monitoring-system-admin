import { db } from "@/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export type Requirement = {
  id: string;
  entity: string;
  department: string;
  complianceList: string;
  documentReference: string;
  typeOfCompliance: string;
  frequencyOfCompliance: string;
  expiration: string;
  renewal: string;
  dateSubmitted: string;
  personInCharge: string;
  status: string;
  uploadedFileUrl: string;
};

export const useRequirement = () => {
  const [requirementList, setRequirementList] = useState<Requirement[]>([]);

  const requirementsCollectionRef = collection(db, "Requirements");

  const getRequirementList = async () => {
    try {
      const data = await getDocs(requirementsCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Requirement[];

      setRequirementList(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRequirementList();
  }, []);

  const getSingleRequirement = async (id: string) => {
    const docRef = doc(requirementsCollectionRef, id);
    try {
      const data = await getDoc(docRef);
      const requirementData = data.data() as Requirement;

      return requirementData;
    } catch (error) {
      console.error(error);
    }
  };

  type CreateRequirement = Omit<Requirement, "id">;

  const addNewRequirement = async (requirements: CreateRequirement) => {
    try {
      await addDoc(collection(db, "Requirements"), {
        complianceList: requirements.complianceList,
        department: requirements.department,
        dateSubmitted: requirements.dateSubmitted,
        documentReference: requirements.documentReference,
        entity: requirements.entity,
        expiration: requirements.expiration,
        frequencyOfCompliance: requirements.frequencyOfCompliance,
        personInCharge: requirements.personInCharge,
        renewal: requirements.renewal,
        status: requirements.status,
        typeOfCompliance: requirements.typeOfCompliance,
        uploadedFileUrl: requirements.uploadedFileUrl
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteRequirement = async (id: string) => {
    const docRef = doc(requirementsCollectionRef, id);
    try {
      await deleteDoc(docRef);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    requirementList,
    getRequirementList,
    getSingleRequirement,
    deleteRequirement,
    addNewRequirement,
  };
};
