import { auth } from "firebase-admin";
import { customInitApp } from "@lib/firebase-admin-config";
import { cookies, headers } from "next/headers";
import User from "@models/user";
import { connectToDB } from "@utils/database";

customInitApp();

export async function POST(request, response) {
    const userInfo = await request.json();
    const authorization = headers().get("Authorization");

    if (authorization?.startsWith("Bearer ")) {
        const idToken = authorization.split("Bearer ")[1];
        const decodedToken = await auth().verifyIdToken(idToken);

        if (decodedToken) {
            //Generate session cookie
            const expiresIn = 60 * 60 * 24 * 5 * 1000;
            const sessionCookie = await auth().createSessionCookie(idToken, {
                expiresIn,
            });
            const options = {
                name: "session",
                value: sessionCookie,
                maxAge: expiresIn,
                httpOnly: true,
                secure: true,
            };

            //Add the cookie to the browser
            cookies().set(options);
        }
    }
    await connectToDB();

    // check if user already exists
    let user = await User.findOne({ email: userInfo?.email });

    // if not, create a new document and save user in MongoDB
    if (!user) {
        user = await User.create({
            email: userInfo.email,
            username: userInfo.displayName,
            image: userInfo.photoURL,
            gender: "",
            isNewUser: true,
        });
        user.age = null;
    } else {
        user.isNewUser = false;
        user.age = user.age || null;
    }

    return new Response(JSON.stringify(user), { status: 200 });
}

export const PATCH = async (request, response) => {
    const userData = await request.json();

    try {
        await connectToDB();
        console.log(userData?._id);

        // Find the existing user by ID
        const existingUser = await User.findById(userData?._id);

        if (!existingUser) {
            return new Response("user not found", { status: 404 });
        }

        // Update the user with new data
        existingUser.age = userData?.age;
        existingUser.gender = userData?.gender;
        await existingUser.save();

        return new Response(JSON.stringify(existingUser), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error), { status: 500 });
    }
};

export const DELETE = async (request, response) => {
    const userData = await request.json();
    try {
        await connectToDB();

        // Find the user by ID and remove it
        await User.findByIdAndRemove(userData?._id);

        return new Response("User deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting user", { status: 500 });
    }
};
