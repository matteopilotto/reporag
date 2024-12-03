// contexts/NamespaceContext.tsx
import { createContext, useContext, useState } from "react";

type NamespaceContextType = {
  currentNamespace: string;
  setCurrentNamespace: (namespace: string) => void;
};

const NamespaceContext = createContext<NamespaceContextType | undefined>(
  undefined
);

export function NamespaceProvider({ children }: { children: React.ReactNode }) {
  const [currentNamespace, setCurrentNamespace] = useState("");
  return (
    <NamespaceContext.Provider
      value={{ currentNamespace, setCurrentNamespace }}
    >
      {children}
    </NamespaceContext.Provider>
  );
}

export function useNamespace() {
  const context = useContext(NamespaceContext);
  if (!context) {
    throw new Error("useNamespace must be used within NamespaceProvider");
  }
  return context;
}
