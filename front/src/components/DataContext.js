import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const useDataContext = () => useContext(DataContext);

const DataProvider = ({ children }) => {
  const [input, setInput] = useState({});
  const [dataAnalysis, setDataAnalysis] = useState({});

  return (
    <DataContext.Provider
      value={{ dataAnalysis, setDataAnalysis, input, setInput }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
