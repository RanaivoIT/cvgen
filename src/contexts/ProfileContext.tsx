import { collection, getFirestore, onSnapshot, query, where } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { userConverter } from '../data/firebase/userConverter';
import User from '../data/models/User';
import { firebase } from '../firebase';


interface ProfileActions {
    getProfile: () => User | null
    updateProfile: (user: User) => void
    loginUser: (user: User) => void
    logoutUser: () => void
}

const ProfileContext = createContext<ProfileActions | null>(null);

const ProfileProvider = (props: any) => {

    const [profile, setProfile] = useState<User | null>(null)

    const db = getFirestore(firebase)

    useEffect(() => {
        const email = localStorage.getItem('Profile')
        
        if (email&&!profile) {

            const q = query(collection(db, 'users'), where('email', '==', email)).withConverter(userConverter)

            onSnapshot(q, (querySnapshot) => {
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        setProfile(doc.data())
                    })
                }
            })

            console.log('loadProfileFromFirebase !')
        }
    })


    return (
        <ProfileContext.Provider
            value={{
                getProfile: () => profile,
                updateProfile: (user: User) => {
                    setProfile(user)
                },
                loginUser: (user: User) => {
                    setProfile(user)
                    localStorage.setItem('Profile', user.email!)
                },
                logoutUser: () => {
                    setProfile({})
                    localStorage.removeItem('Profile')
                }

            }}>
            {props.children}
        </ProfileContext.Provider>
    )
}

export default ProfileProvider

export const useProfile = () => useContext(ProfileContext)
