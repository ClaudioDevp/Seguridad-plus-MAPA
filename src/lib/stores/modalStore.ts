import { create } from "zustand";

interface ModalStore {
  id: string;
  openModal: (id:string) => void;
  closeModal: () => void;
}


export const useModalStore = create<ModalStore>((set)=>({
  id:"",
  openModal(id) {
    set({id})
  },
  closeModal() {
    set({id:""})
  },

}))