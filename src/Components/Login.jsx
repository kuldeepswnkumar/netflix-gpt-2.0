import React, { useState, useRef } from "react";
import Header from "./Header";
import { validateInput } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/useSlice";
import { DEFAULT_USER_LOGO } from "../utils/constant";

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [signUp, setSignUp] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const namerf = useRef(null)
    const emailrf = useRef(null)
    const passwordrf = useRef(null)

    const handleSignUpSignIn = () => {
        const validResult = validateInput(emailrf.current.value, passwordrf.current.value)
        setErrorMessage(validResult)
        if (validResult !== null) return;

        if (signUp) {
            createUserWithEmailAndPassword(auth, emailrf.current.value, passwordrf.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: namerf.current.value, photoURL: DEFAULT_USER_LOGO
                    }).then(() => {
                        navigate('/browse')
                        const { uid, email, displayName, photoURL } = auth.currentUser
                        dispatch(addUser({
                            id: uid,
                            email: email,
                            dispalyName: displayName,
                            photoURL: photoURL
                        }))

                    }).catch((error) => {
                        const errorMessage = error.message;
                        setErrorMessage(`${errorMessage}`)
                    });

                    console.log("userCredential", userCredential);

                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(`${errorCode} ${errorMessage}`)
                    // ..
                });
        } else {
            signInWithEmailAndPassword(auth, emailrf.current.value, passwordrf.current.value)
                .then((userCredential) => {
                    // Signed in 
                    navigate('/browse')
                    console.log("userCredential sign in", userCredential);

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(`${errorCode} ${errorMessage}`)
                });
        }
    }


    return <div>
        <Header />
        <div className="absolute inset-0 -z-10">
            <img
                src="/images/bgNetflix.jpg"
                alt="background"
                className="w-full h-full object-cover opacity-70"
            />
            <div className="w-full">
                <div className="absolute inset-0 bg-linear-to-r from-black to-black opacity-60 z-0"></div>
                <form onSubmit={(e) => e.preventDefault()} className="border-2 border-black w-1/3 absolute top-[7rem] left-[30rem] p-16 bg-black opacity-90 rounded-lg">
                    <h2 className="text-white text-3xl font-bold mb-7">{signUp ? "Sign Up" : "Sign In"}</h2>
                    {signUp && <div>
                        <input
                            ref={namerf}
                            type="text"
                            className="w-full mb-6 px-2 py-4 border border-gray-300 text-white rounded-[6px]"
                            placeholder="Enter Your Name"
                        />
                    </div>}
                    <div>
                        <input
                            ref={emailrf}
                            type="email"
                            className="w-full mb-6 px-2 py-4 border border-gray-300 text-white rounded-[6px]"
                            placeholder="Enter Your Email Id"
                        />
                    </div>
                    <div>
                        <input
                            ref={passwordrf}
                            type="password"
                            className="w-full mb-6 px-2 py-4 border border-gray-300 text-white rounded-[6px]"
                            placeholder="Enter Your Password"
                        />
                        <div className="text-red-500 mb-3">{errorMessage}</div>
                    </div>

                    <button onClick={() => handleSignUpSignIn()} className="bg-red-600 w-full text-white px-4 py-2 rounded hover:bg-red-500 font-bold">{signUp ? "Sign Up" : "Sign In"}</button>
                    <div className="text-white py-3 cursor-pointer" onClick={() => setSignUp(!signUp)}>
                        <span className="text-gray-300">New to Netflix?</span> Sign up now.
                    </div>
                </form>
            </div>
        </div>
    </div >;
}

export default Login;
