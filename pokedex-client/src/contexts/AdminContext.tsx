import React, { createContext, useContext, useState } from 'react'

type AdminContextData = {
    refreshUsers? : boolean,
    refreshPokemons? : boolean,
    setRefreshUsers? : any,
    setRefreshPokemons? : any
}


const AdminContext = createContext<AdminContextData>({})

export default function AdminProvider({children} : {children : React.ReactNode}) {

    const [refreshUsers, setRefreshUsers] = useState<boolean>(false);
    const [refreshPokemons, setRefreshPokemons] = useState<boolean>(false);

  return (
    <AdminContext.Provider value={{refreshUsers, setRefreshUsers, refreshPokemons, setRefreshPokemons}}>
        {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => useContext(AdminContext);