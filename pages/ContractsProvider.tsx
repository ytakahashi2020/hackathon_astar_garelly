import React, { useState, ReactNode } from 'react';
import { ContractsContext } from './ContractsContext';

interface ContractsProviderProps {
  children: ReactNode;
}

export const ContractsProvider: React.FC<ContractsProviderProps> = ({ children }) => {
  const [searchContract, setSearchContract] = useState('');

  return (
    <ContractsContext.Provider value={{ searchContract, setSearchContract }}>
      {children}
    </ContractsContext.Provider>
  );
};