import { initializeApp, getApps, cert } from "firebase-admin/app";

const firebaseAdminConfig = {
    credential: cert({
        projectId: process.env.project_id,
        clientEmail: process.env.client_email,
        privateKey: process.env.private_key.replace(/\\n/gm, "\n"),
    }),
};

export function customInitApp() {
    if (getApps().length <= 0) {
        initializeApp(firebaseAdminConfig);
    }
}
