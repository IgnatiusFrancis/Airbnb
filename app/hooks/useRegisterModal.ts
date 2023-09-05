import { create } from "zustand";

interface RegisterModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRegisterModal = create<RegisterModalStore>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));

export default useRegisterModal;

// REDUX EQUIVALENT

// import { createSlice, configureStore } from '@reduxjs/toolkit';

// // Define a slice with Redux Toolkit
// const registerModalSlice = createSlice({
//   name: 'registerModal',
//   initialState: {
//     isOpen: false,
//   },
//   reducers: {
//     openModal: (state) => {
//       state.isOpen = true;
//     },
//     closeModal: (state) => {
//       state.isOpen = false;
//     },
//   },
// });

// // Extract the action creators
// export const { openModal, closeModal } = registerModalSlice.actions;

// // Create a Redux store using configureStore
// export const store = configureStore({
//   reducer: {
//     registerModal: registerModalSlice.reducer,
//   },
// });

// export default store;
