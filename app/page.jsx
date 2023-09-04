"use client";

import { getRedirectResult, signInWithRedirect } from "firebase/auth";
import { auth, provider } from "../lib/firebase-config";
import { useEffect, useRef, useState } from "react";
import Form from "@components/Form";

const page = () => {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const userDataRef = useRef(null);

    useEffect(() => {
        if (!userData) {
            getRedirectResult(auth).then(async (userCred) => {
                if (!userCred) {
                    return;
                }
                setLoading(true);
                try {
                    const response = await fetch("/api/login", {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${await userCred.user.getIdToken()}`,
                        },
                        body: JSON.stringify(userCred?.user),
                    });
                    const data = await response.json();
                    userDataRef.current = data;
                    setUserData(data);
                    setLoading(false);
                } catch (error) {
                    setLoading(false);
                    console.log(error);
                }
            });
        }
    }, []);

    function signIn() {
        signInWithRedirect(auth, provider);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        console.log("hit", userData);
        try {
            const response = await fetch("/api/login", {
                method: "PATCH",
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            userDataRef.current = data;
            setUserData(data);
            setSubmitting(false);
        } catch (error) {
            setSubmitting(false);
            console.log(error);
        }
    }

    async function handleDelete(e) {
        e.preventDefault();
        try {
            await fetch("/api/login", {
                method: "DELETE",
                body: JSON.stringify(userData),
            });

            setUserData(null);
            userDataRef.current = null;
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
                <span className="orange_gradient text-center">
                    Firebase Authentication Test
                </span>
            </h1>
            {!userData ? (
                <button
                    onClick={signIn}
                    className="w-40 h-10 mt-10 text-sm bg-primary-orange rounded-md text-white"
                >
                    {loading ? "Logging you in" : "Log In"}
                </button>
            ) : (
                <Form
                    userData={userData}
                    setUserData={setUserData}
                    userDataRef={userDataRef}
                    submitting={submitting}
                    handleSubmit={handleSubmit}
                    handleDelete={handleDelete}
                />
            )}
        </section>
    );
};

export default page;
