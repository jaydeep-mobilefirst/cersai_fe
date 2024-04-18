import { create } from "zustand"

interface verificationStateTypes {
    verificationFormData : any[]
    entityFormData  : any[]
    regulatorFormData : any[]
    setVerificationFormData : (data : any[]) => void
    setEntityFormData : (data : any[]) => void
    setRegulatorFormData : (data : any[]) => void
    
}

// Create your store, which includes both state and (optionally) actions
export const useDTStore = create<verificationStateTypes>((set) => ({
    verificationFormData : [],
    entityFormData : [],
    regulatorFormData : [],
    setVerificationFormData: (data : any[]) => set(() => ({ verificationFormData: data })),
    setEntityFormData: (data : any[]) => set(() => ({ entityFormData: data })),
    setRegulatorFormData: (data : any[]) => set(() => ({ regulatorFormData: data })),
  }))

