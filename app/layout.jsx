import "@styles/globals.css";
import Provider from "@components/Provider";

export const metadata = {
    title: "Next-auth",
    description: "Discover and share AI content",
};

const Rootlayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <Provider>
                    <div className="main">
                        <div className="gradient" />
                    </div>
                    <main className="app">{children}</main>
                </Provider>
            </body>
        </html>
    );
};

export default Rootlayout;
