import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SetModelProps {
    isSetup: boolean;
    setIsSetup: () => void;
}

export const useSetModel = create<SetModelProps>()(persist(
    (set) => ({
        isSetup: false,
        setIsSetup: () => set((state) => ({ isSetup: !state.isSetup }))
    }),
    { name: "setup" }
));