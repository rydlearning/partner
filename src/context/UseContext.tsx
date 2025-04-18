import React, { createContext, useState, useContext, ReactNode } from "react";


interface ParentDetails {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  state: string;
  phone: string;
  password: string;
  timezone: string;
  timeOffset: number;
  token: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PartnerDetails {
  organizationName: string;
  organizationAddress: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  password: string;
  token: string
  status: boolean
  createdAt: string
  updatedAt: string
  id: number
}

interface ContextType {
  parent: ParentDetails | null;
  setParent: (parent: ParentDetails | null) => void;
  partner: PartnerDetails | null;
  setPartner: (partner: PartnerDetails | null) => void;
}

// Create context with default values
const UserContext = createContext<ContextType | undefined>(undefined);

// Create a provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [parent, setParent] = useState<ParentDetails | null>(null);
  const [partner, setPartner] = useState<PartnerDetails | null>(null);

  return (
    <UserContext.Provider value={{ parent, setParent, partner, setPartner }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const ContextProvider = (): ContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
