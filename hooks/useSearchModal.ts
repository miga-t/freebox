import { create } from "zustand";

export interface ModalStoreInterface {
	isSearchOpen: boolean;
	openSearchModal: () => void;
	closeSearchModal: () => void;
}

const useSearchModal = create<ModalStoreInterface>((set) => ({
	isSearchOpen: false,
	openSearchModal: () => set({ isSearchOpen: true }),
	closeSearchModal: () => set({ isSearchOpen: false })
}));
export default useSearchModal;
