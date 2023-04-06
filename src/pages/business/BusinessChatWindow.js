import { useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import Sidebar from "../../components/businessChat/Sidebar";
import { Route, useParams } from "react-router-dom";
import ChatScreen from "../../components/businessChat/ChatScreen";

const BusinessChatWindow = () => {
    const { businessId } = useParams();
    const [openChatScreen, setOpenChatScreen] = useState(false);
    return (
        <Container>
            <Helmet>
                <title>SmartSeed Text | Live SMS Chat</title>
            </Helmet>
            <Sidebar
                openChatScreen={openChatScreen}
                setOpenChatScreen={setOpenChatScreen}
            />
            <Route path="/business/:businessId/chat/:chatId">
                <ChatContainer openChatScreen={openChatScreen}>
                    <ChatScreen
                        openChatScreen={openChatScreen}
                        setOpenChatScreen={setOpenChatScreen}
                    />
                </ChatContainer>
            </Route>
        </Container>
    );
};

export default BusinessChatWindow;

const ChatContainer = styled.div`
    flex: 1;
    overflow: scroll;
    /* height: 100%; */
    // this is what makes screen full viewport height
    height: calc(var(--vh, 1vh) * 100);

    transition: all 0.45s ease;
    // gives chat screen full with and fixed position
    position: fixed;
    width: 100%;
    // pushes chat screen out of viewport to the right
    left: ${(props) => (props.openChatScreen ? "0" : "100%")};

    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    @media (min-width: 420px) {
        // set postion static and resets left and width to normal page flow
        // on big screens
        position: static;
        left: auto;
        width: auto;
    }
`;

const Container = styled.div`
    display: flex;
    /* background-color: var(--chatscreen-bg-color); */
`;
