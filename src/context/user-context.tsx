import { createContext, ReactNode, useCallback, useEffect, useState } from 'react'
import { UserProps } from '../models/user'

interface UserContextProps {
    users: UserProps[]
}

interface UserProviderProps {
    children: ReactNode
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps)

export function UserContextProvider({ children }: UserProviderProps) {
    const [users, setUsers] = useState<UserProps[]>([])

    const getUsers = useCallback(async () => {
        const response = await fetch('http://localhost:3000/users')
        const data = await response.json()
        setUsers(data)
    }, [users])

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <UserContext.Provider value={{ users }}>
            {children}
        </UserContext.Provider>
    )
}