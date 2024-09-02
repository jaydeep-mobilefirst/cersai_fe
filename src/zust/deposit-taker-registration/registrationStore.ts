import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

type EntityType = {
  id: number;
  entityName: string;
  registrationAllowed: boolean;
  autoApproval: boolean;
};

interface Types {
  entities: EntityType[];
  setEntities: (data: EntityType[]) => void;
  setAllFormData: (data: any) => void;
  allFormData: any;
  documentData: any[];
  setAllDocumentData: (data: any[]) => void;
  sections: any[];
  setSections: (data: any[]) => void;
  setMasterEntityId: (data: string | number | undefined) => void;
  masterEntityId: string | number | undefined;
}

export const useDepositTakerRegistrationStore = create<Types>()(
  persist(
    (set) => ({
      entities: [],
      allFormData: undefined,
      documentData: [],
      sections: [],
      masterEntityId: undefined,
      setEntities: (data: EntityType[]) => set({ entities: data }),
      setAllFormData: (data: any) => set({ allFormData: data }),
      setAllDocumentData: (data: any[]) => set({ documentData: data }),
      setSections: (data: any[]) => set({ sections: data }),
      setMasterEntityId: (data: string | number | undefined) =>
        set({ masterEntityId: data }),
    }),
    {
      name: "deposit-taker-registration-store",
      getStorage: () => sessionStorage,
    } as PersistOptions<Types>
  )
);
