import { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

import DemoNavBar from "../../components/DemoNavBar";

import AddBusiness from "./AddBusiness";
import Text from "./DemoContactForm";
import ClientList from "./ClientList";
import UnauthorizedUser from "../../components/UnauthorizedUser";

import { db } from "../../utils/db/firebaseConfig";
import styled from "styled-components";

function Demo({ authUser }) {
    const [user, setuser] = useState(null);

    const userState = {
        authorized: true,
    };
    // useEffect(() => {
    //     // Try and Refactor with Async/Await

    //     // Check if User Exists

    //     if (!userState.userId) {
    //         db.collection("users")
    //             .doc(authUser.uid)
    //             .get()
    //             .then((user) => {
    //                 // If User exists,
    //                 //Set User Context with Reducer

    //                 if (user.exists) {
    //                     userDispatch({
    //                         type: "USER/SET_EXISTING_USER",
    //                         payload: {
    //                             userId: user.id,
    //                             role: user.data().role,
    //                             displayName: user.data().displayName,
    //                             authorized: user.data().authorized,
    //                         },
    //                     });

    //                     setuser(user);
    //                 } else {
    //                     // If doesn't Exist, Create New User and set State with Reducer

    //                     const newUserData = {
    //                         displayName: authUser.email,
    //                         avatarUrl: authUser.photoURL,
    //                         role: "0",
    //                         email: authUser.email,
    //                         phoneNumber: authUser.phoneNumber,
    //                         timestamp: Date.now(),
    //                         userId: authUser.uid,
    //                         authorized: false,
    //                     };

    //                     db.collection("users")
    //                         .doc(authUser.uid)
    //                         .set(newUserData)
    //                         .then((docRef) => {
    //                             userDispatch({
    //                                 type: "USER/CREATE_NEW_USER",
    //                                 payload: newUserData,
    //                             });

    //                             console.log(
    //                                 "Created User with Id: ",
    //                                 authUser.uid
    //                             );

    //                             setuser({
    //                                 salespersonId: authUser.uid,
    //                                 authorized: false,
    //                             });
    //                         })
    //                         .catch((error) => {
    //                             console.log("Error Creating New User: ", error);
    //                         });
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.log("Error Checking User Exists: ", error);
    //             });
    //     }
    // }, []);

    return (
        <Container>
            {userState.authorized && <DemoNavBar user={userState} />}
            {!userState.authorized && <UnauthorizedUser />}

            <Route path="/demo/text">
                <Text />
            </Route>

            <Route path="/demo/business/add/:userId">
                <AddBusiness />
            </Route>

            <Route path="/demo/clients/all/:userId">
                <ClientList user={userState} />
            </Route>
        </Container>
    );
}

export default Demo;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background-repeat: no-repeat;
    background-attachment: fixed;

    background-position: center;
    background-image: url("/logo192.png");
`;
