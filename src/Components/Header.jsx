import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../redux/useSlice";

function Header() {
    const userData = useSelector((state) => state.user)
    console.log("userData", userData);

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate('/')
            dispatch(removeUser())
        }).catch((error) => {
            console.log(error);

        });
    }

    useEffect(() => {
        const isSubscribe = onAuthStateChanged(auth, (user) => {
            const { uid, email, password, displayName, photoURL } = user
            console.log("user>>", user.uid);

            if (user) {
                dispatch(addUser({
                    id: uid,
                    email: email,
                    password: password,
                    displayName: displayName,
                    photoURL: photoURL
                }))
                navigate('/browse')
            } else {
                dispatch(removeUser())
                navigate('/')
            }
        });
        return () => isSubscribe()
    }, [])

    return <div className="flex">
        <div className="absolute top-0 left-0">
            <img src="/images/logo.png" alt="logo" className="w-56 h-24" />
        </div>
        {userData && (<div className="absolute top-5 right-10 flex gap-2">
            <img src={userData?.photoURL} alt="image" className="w-10" />
            <button className="cursor-pointer" onClick={handleSignOut}>Sign Out</button>
        </div>)}

    </div>;
}

export default Header;
