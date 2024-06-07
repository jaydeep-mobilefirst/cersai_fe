// import { create } from "zustand";
// import produce from "immer";

// type EntityType = {
//   id: number;
//   entityName: string;
//   registrationAllowed: boolean;
//   autoApproval: boolean;
// };
// interface Types {
//   entities: EntityType[];
//   setEntities: any;
//   setAllFormData: any;
//   allFormData: any;
//   documentData: any[];
//   setAllDocumentData: any;
//   sections: any[];
//   setSections: any;
// }

// // Create your store, which includes both state and (optionally) actions
// export const useDepositTakerRegistrationStore = create<Types>((set: any) => ({
//   entities: [],
//   allFormData: undefined,
//   documentData: [],
//   sections: [],
//   // Reducers
//   setEntities: (data: EntityType[]) => set(() => ({ entities: data })),
//   setAllFormData: (data: any) => set(() => ({ allFormData: data })),
//   setAllDocumentData: (data: any) => set(() => ({ documentData: data })),
//   setSections: (data: any[]) => set(() => ({ sections: data })),
// }));

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
}

export const useDepositTakerRegistrationStore = create<Types>()(
  persist(
    (set) => ({
      entities: [],
      allFormData: undefined,
      documentData: [],
      sections: [],
      // Reducers
      setEntities: (data: EntityType[]) => set({ entities: data }),
      setAllFormData: (data: any) => set({ allFormData: data }),
      setAllDocumentData: (data: any[]) => set({ documentData: data }),
      setSections: (data: any[]) => set({ sections: data }),
    }),
    {
      name: "deposit-taker-registration-store",
      getStorage: () => localStorage,
    } as PersistOptions<Types>
  )
);
