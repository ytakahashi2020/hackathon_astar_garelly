import React from 'react';

// 新たなContextを作成
export const ContractsContext = React.createContext({
    searchContract: '', 
    setSearchContract: (value: string) => {},
  });