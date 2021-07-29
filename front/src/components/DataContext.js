import React, { createContext, useContext, useState } from 'react'

const DataContext = createContext()

export const useDataContext = () => useContext(DataContext);

const DataProvider = ({children}) => {
    const [dataAnalysis, setDataAnalysis] = useState([]);

    return (
        <DataContext.Provider value={{dataAnalysis, setDataAnalysis}}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;