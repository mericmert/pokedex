import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext';
import { UserUtil } from '@/lib/utils/UserUtil';
import { TrainerUtil } from '@/lib/utils/TrainerUtil';


type CollectionContextData = {
    count?: number,
    setCount? : any
}


const CollectionContext = createContext<CollectionContextData>({});


export default function CollectionProvider({ children }: { children: React.ReactNode }) {
    
    const [count, setCount] = useState<number>(0);
    const {data : session} = useAuth();

    const fetchCatchList = async () => {
        let res = await TrainerUtil.getCatchList(session?.user.id);
        setCount(res.length);
    }

    useEffect(() => {
        fetchCatchList();
    }, [session]);


    
    return (
        <CollectionContext.Provider value={{count, setCount}}>
            {children}
        </CollectionContext.Provider>
    )
}

export const useCollection = () => useContext(CollectionContext);