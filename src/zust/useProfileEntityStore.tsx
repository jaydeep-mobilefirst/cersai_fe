import create from "zustand";
import { axiosTokenInstance } from "../utils/axios";

// Define the type for formData items
interface FormDataItem {
  fieldId: number;
  sectionCode: string;
  label: string;
  value: string;
}

// Define the type for the store state
interface ProfileRegulatorState {
  formData: FormDataItem[]; // Define formData as an array of FormDataItem
  setFormData: (data: FormDataItem[]) => void; // Function to update formData
  entitydetails: () => Promise<void>; // Async function to update entity details
}

const useProfileEntityStore = create<ProfileRegulatorState>((set, get) => ({
  formData: [], // Initial state for formData
  setFormData: (data: FormDataItem[]) => set({ formData: data }), // Function to update formData

  entitydetails: async () => {
    const { formData } = get(); // Get formData from the state
    try {
      await axiosTokenInstance.patch(
        `/deposit-taker/${sessionStorage.getItem("entityUniqueId")}`,
        { formData }
      );
      console.log("Entity details updated successfully.");
    } catch (error) {
      console.error("Failed to update entity details:", error);
    }
  },
}));

export default useProfileEntityStore;