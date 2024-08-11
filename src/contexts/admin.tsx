import React, { useState,createContext, ReactNode } from 'react';

// Define the type for the context value
interface AdminBooleanContextType {
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

// Create the context with a default value
const AdminBooleanContext = createContext<AdminBooleanContextType | undefined>(undefined);

// Define the provider component
export const AdminBooleanProvider: React.FC<{ children: ReactNode; currAdminStatus: boolean }> = ({ children, currAdminStatus }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(currAdminStatus);

  return (
    <AdminBooleanContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AdminBooleanContext.Provider>
  );
};

// Optionally define a Consumer if needed
// export const AdminBooleanConsumer = AdminBooleanContext.Consumer;
export default AdminBooleanContext;
