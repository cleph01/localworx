import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import GeneralLoading from "../../components/loading/GeneralLoading";
import styled from "styled-components";

import Header from "../../components/Header";
import { db } from "../../utils/db/firebaseConfig";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";

import { connect } from "react-redux";
import { setFullUser } from "../../redux/actions/authActions";
import { IconButton } from "@mui/material";
import {
    AccountCircle,
    Add,
    AddAPhoto,
    AutoGraph,
    Edit,
    FormatListNumbered,
    ListAlt,
    PlusOne,
} from "@mui/icons-material";

import AddBusiness from "../../components/user/AddBusiness";

const UserProfilePage = ({ user }) => {
    const { userId } = useParams();
    const history = useHistory();
    // menu selection state from icon clicks; determines which component we show below icon bar
    const [menuChoice, setMenuChoice] = useState();

    // handle menu choice click from icons
    const handleMenuIconClick = (menuChoice) => {
        setMenuChoice(menuChoice);
    };

    const [userDoc, loading, error] = useDocument(doc(db, "users", user.id));

    if (loading) return <GeneralLoading />;
    if (error) return <div>"error: " {error}</div>;

    const showSelectionWindow = (user) => {
        switch (menuChoice) {
            case "addBusiness":
                return <AddBusiness />;
            case "stats":
                return <Stats />;

            default:
                return <Profile user={user} />;
        }
    };

    return (
        <>
            <Header />
            <Container>
                <Inner>
                    <HeaderIcons>
                        <IconContainer>
                            <IconButton>
                                <AddAPhoto />
                            </IconButton>
                            <p>Profile Photo</p>
                        </IconContainer>
                        <IconContainer
                            onClick={() => handleMenuIconClick("addBusiness")}
                        >
                            <IconButton>
                                <Add />
                            </IconButton>
                            <p>Add Business</p>
                        </IconContainer>

                        <IconContainer onClick={() => history.push("/hub")}>
                            <IconButton>
                                <FormatListNumbered />
                            </IconButton>
                            <p>Businesses</p>
                        </IconContainer>
                        <IconContainer
                            onClick={() => handleMenuIconClick("profile")}
                        >
                            <IconButton>
                                <AccountCircle />
                            </IconButton>
                            <p>Profile</p>
                        </IconContainer>
                    </HeaderIcons>

                    <Box>{showSelectionWindow(user)}</Box>
                </Inner>
            </Container>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        message: state.message.message,
    };
};
export default connect(mapStateToProps, { setFullUser })(UserProfilePage);

const IconContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;

    > p {
        font-size: 1.2rem;
    }

    > .MuiButtonBase-root > .MuiSvgIcon-root {
        font-size: 2.6rem;
    }
`;
const HeaderIcons = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0.5rem 2rem 0.5rem;
    background: whitesmoke;
`;

const CardContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.6rem;
    align-items: center;
    margin-top: 0.4rem;
    width: 100%;

    > h2 {
        line-height: 1.5rem;
        padding: 1rem;
        background: whitesmoke;
        border-radius: 0.8rem;
    }
    @media (min-width: 380px) {
        width: 35rem;
    }
`;

const Box = styled.div`
    width: 100%;
    height: 100%;
    overflow: scroll;

    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
`;
const Inner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #ccc;
    margin: 2rem 8% 2rem;
    padding: 1rem 2% 1rem;
    border-radius: 0.8rem;
    box-shadow: 5px 5px 20px rgba(68, 68, 68, 0.6);
    width: 35rem;
    height: calc(var(--vh, 1vh) * 80);
    max-height: calc(var(--vh, 1vh) * 80);

    > h3 {
        color: var(--second-color);
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

//
// Sub Components
//

const MessageLog = () => {
    return <div>Message Log</div>;
};

const Stats = () => {
    return <div>Stats</div>;
};

const Profile = ({ user }) => {
    return (
        <Content>
            <h2>Profile</h2>
            <ItemWrapper>
                <Title>Display Name: </Title>
                <TextInput>
                    <div>{user.displayName}</div>
                    <div>
                        <Edit />
                    </div>
                </TextInput>
            </ItemWrapper>
            <ItemWrapper>
                <Title>Pofile Pic Url: </Title>
                <TextInput>
                    <div>
                        {user?.photoURL?.length > 25
                            ? user.photoURL.slice(0, 25) + "..."
                            : user.photoURL}
                    </div>
                    <div>
                        <Edit />
                    </div>
                </TextInput>
            </ItemWrapper>
            <ItemWrapper>
                <Title>Cell Phone: </Title>
                <TextInput>
                    <div>{user.cellPhone}</div>
                    <div>
                        <Edit />
                    </div>
                </TextInput>
            </ItemWrapper>
        </Content>
    );
};

const TextInput = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding-left: 0.5rem;
`;

const Title = styled.div`
    background: whitesmoke;
    padding: 0.8rem;
    border-radius: 0.8rem;
`;

const ItemWrapper = styled.div`
    display: flex;
    align-items: center;

    font-size: var(--p-font);
    margin: 0 0.5rem 1rem;
`;

const Content = styled.div`
    padding: 1rem 1rem;
`;
