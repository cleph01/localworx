import { useEffect, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import * as ROUTES from "./routing/routes";
import * as COMPONENTS from "./routing/routeComponents";
import IsUserLoggedIn from "./routing/IsUserLoggedIn";
import PrivateRoute from "./routing/PrivateRoute";
import GeneralLoading from "./components/loading/GeneralLoading";

import useAuthListener from "./hooks/use-auth-listener";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./utils/db/firebaseConfig";

import { connect } from "react-redux";
import { loginSuccess } from "./redux/actions/authActions";

function App({ loginSuccess }) {
    const { authUser } = useAuthListener();

    useEffect(() => {
        // if user is logged in, then merge that info with
        // what already exists instead of overwriting
        // if user not in db, then creates a new doc
        if (authUser) {
            // Dispatch Action to update store with AuthUser (Google's Auth User)
            loginSuccess(authUser);

            // Default Merge-Set / Create new UserUid in DB with Google Auth specs
            const userRef = doc(db, "users", authUser.uid);
            setDoc(
                userRef,
                {
                    email: authUser.email,
                    lastSeen: serverTimestamp(),
                    photoURL: authUser.photoURL,
                    displayName: authUser.displayName,
                },
                { merge: true }
            );
        }
    }, [authUser]);

    console.log("AuthUser at App: ", authUser);

    return (
        <>
            <Suspense fallback={<GeneralLoading />}>
                <Switch>
                    <IsUserLoggedIn
                        authUser={authUser}
                        path={ROUTES.LOGIN}
                        loggedInPath={ROUTES.LOGGED_IN_LANDING_PAGE}
                    >
                        <COMPONENTS.Login />
                    </IsUserLoggedIn>

                    {/* Once Authorized, takes them to this landing page to choose where next  */}
                    <PrivateRoute
                        path={ROUTES.LOGGED_IN_LANDING_PAGE}
                        authUser={authUser}
                    >
                        <COMPONENTS.LoggedInLandingPage />
                    </PrivateRoute>

                    {/* SalesPerson Homepage  */}
                    <PrivateRoute path={ROUTES.SALES_HOME} authUser={authUser}>
                        <COMPONENTS.SalesHome />
                    </PrivateRoute>

                    {/* Business Live Chat Window */}
                    <PrivateRoute
                        path={ROUTES.BUSINESS_CHAT_WINDOW}
                        authUser={authUser}
                    >
                        <COMPONENTS.BusinessChatWindow />
                    </PrivateRoute>

                    {/* Business Owner Homepage */}
                    <PrivateRoute
                        path={ROUTES.SPECIFIC_BUSINESS_HOME}
                        authUser={authUser}
                    >
                        <COMPONENTS.SpecificBusinessHome />
                    </PrivateRoute>

                    {/* SmartSeed Admin Homepage */}
                    <PrivateRoute path={ROUTES.ADMIN_HOME} authUser={authUser}>
                        <COMPONENTS.AdminHome />
                    </PrivateRoute>

                    {/* LIVE CONTACT FORM */}
                    <Route
                        exact
                        path={ROUTES.PUBLIC_CONTACT_FORM}
                        component={COMPONENTS.LiveContactForm}
                    />

                    {/* Default Homepage, since not a webpage we enforce login */}
                    <IsUserLoggedIn
                        exact
                        authUser={authUser}
                        path="/"
                        loggedInPath={ROUTES.LOGGED_IN_LANDING_PAGE}
                    >
                        <COMPONENTS.Login />
                    </IsUserLoggedIn>

                    {/* Initial $300 Signup SuccessFul Page */}
                    {/* Used to set User business as available and redirect */}
                    {/* to User Add Business Page */}
                    <PrivateRoute
                        path={ROUTES.SIGNUP_SUCCESSFUL_PAGE}
                        authUser={authUser}
                    >
                        <COMPONENTS.SignupSuccessfulPage />
                    </PrivateRoute>

                    {/* User Add Business Page */}
                    <PrivateRoute
                        path={ROUTES.USER_PROFILE}
                        authUser={authUser}
                    >
                        <COMPONENTS.UserProfilePage />
                    </PrivateRoute>

                    {/* If Path not tied to any routes */}
                    <Route>
                        <COMPONENTS.NotFound />
                    </Route>
                </Switch>
            </Suspense>
        </>
    );
}

export default connect(null, { loginSuccess })(App);
