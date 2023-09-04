import React from "react";
import Link from "next/link";

const Form = ({
    userData,
    setUserData,
    userDataRef,
    submitting,
    handleSubmit,
    handleDelete,
}) => {
    return (
        <section className="w-full max-w-full flex-col">
            {userDataRef?.current?.isNewUser && (
                <h1 className="head_text text-left">
                    <span className="blue_gradient"> Welcome New User</span>
                </h1>
            )}
            <div className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        User Name{" "}
                        <span className="font-normal">
                            {userDataRef?.current?.username}
                        </span>
                    </span>
                </label>
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Email{" "}
                        <span className="font-normal">
                            {userDataRef?.current?.email}
                        </span>
                    </span>
                </label>
                {userDataRef?.current?.age && (
                    <label>
                        <span className="font-satoshi font-semibold text-base text-gray-700">
                            Age{" "}
                            <span className="font-normal">
                                {userDataRef?.current?.age}
                            </span>
                        </span>
                    </label>
                )}
                {userDataRef?.current?.gender && (
                    <label>
                        <span className="font-satoshi font-semibold text-base text-gray-700">
                            Gender{" "}
                            <span className="font-normal">
                                {userDataRef?.current?.gender}
                            </span>
                        </span>
                    </label>
                )}
                {!userDataRef?.current?.age &&
                    !userDataRef?.current?.gender && (
                        <label>
                            <span className="font-satoshi font-semibold text-base text-gray-700">
                                Please fill below fields to complete your
                                profile
                            </span>
                            {!userDataRef?.current?.age && (
                                <input
                                    value={userData?.age}
                                    onChange={(e) =>
                                        setUserData({
                                            ...userData,
                                            age: e.target.value,
                                        })
                                    }
                                    type="number"
                                    placeholder="age"
                                    required
                                    className="form_input"
                                />
                            )}
                            {!userDataRef?.current?.gender && (
                                <input
                                    value={userData?.gender}
                                    onChange={(e) =>
                                        setUserData({
                                            ...userData,
                                            gender: e.target.value,
                                        })
                                    }
                                    type="text"
                                    placeholder="gender"
                                    required
                                    className="form_input"
                                />
                            )}
                        </label>
                    )}
                <div className="flex-end mx-3 mb-5 gap-4">
                    <button
                        type="submit"
                        disabled={
                            userDataRef?.current?.age &&
                            userDataRef?.current?.gender
                        }
                        onClick={handleSubmit}
                        className="px-5 py-1.5 text-sm bg-neutral-900 rounded-full text-white"
                    >
                        {submitting ? "Savinging..." : "Save"}
                    </button>

                    <button
                        onClick={handleDelete}
                        className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Form;
