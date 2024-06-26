import { create } from "zustand"
import produce from "immer";

type EntityType = {
  id: number;
  entityName: string;
  registrationAllowed: boolean;
  autoApproval: boolean;
};
interface Types {
  entities: EntityType[]
  setEntities : any
  setAllFormData : any 
  allFormData : any
  documentData : any[]
  setAllDocumentData : any
}

// Create your store, which includes both state and (optionally) actions
export const useDepositTakerRegistrationStore = create<Types>((set: any) => ({
  entities: [],
  allFormData : undefined,
  documentData : [],
  // Reducers
  setEntities : (data : EntityType[]) => set(() => ({ entities: data })),
  setAllFormData : (data : any) => set(() => ({ allFormData: data })),
  setAllDocumentData : (data : any) => set(() => ({ documentData: data })),
}))

