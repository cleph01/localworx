import React, { Suspense, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import GeneralLoading from "../../components/loading/GeneralLoading";
import Header from "../../components/Header";
import { ButtonGroup, IconButton, TextField } from "@mui/material";
import {
    AccountCircle,
    AutoGraph,
    ContentCopy,
    Edit,
    FormatListNumbered,
    Storefront,
    Textsms,
} from "@mui/icons-material";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../utils/db/firebaseConfig";
import { connect } from "react-redux";

import { setBusiness } from "../../redux/actions/businessProfileActions";
import AvailableTwilioNumbers from "../../components/user/AvailableTwilioNumbers";
import ToolTip from "../../components/ToolTip";
import CopyToClipboard from "react-copy-to-clipboard";

const SpecificBusinessPage = ({ setBusiness }) => {
    const { businessId } = useParams();
    const history = useHistory();

    const [business, loading, error] = useDocument(
        doc(db, "businesses", businessId)
    );

    if (business) {
        setBusiness(business.data());
    }

    // handle menu choice click from icons
    const handleMenuIconClick = (menuChoice) => {
        setMenuChoice(menuChoice);
    };

    // menu selection state from icon clicks; determines which component we show below icon bar
    const [menuChoice, setMenuChoice] = useState();

    const showSelectionWindow = () => {
        switch (menuChoice) {
            case "msgLog":
                return <MessageLog />;
            case "stats":
                return <Stats />;
            default:
                return <Account />;
        }
    };
    return (
        <Suspense fallback={<GeneralLoading />}>
            <Header />
            <Container>
                <Inner>
                    <HeaderIcons>
                        <IconContainer
                            onClick={() => {
                                business.data().twilioNumber
                                    ? history.push(
                                          `/business/${businessId}/chat`
                                      )
                                    : alert("Select a Number Below to Enable");
                            }}
                        >
                            <IconButton>
                                <Textsms />
                            </IconButton>
                            <p>Live SMS </p>
                        </IconContainer>
                        <IconContainer
                            onClick={() => handleMenuIconClick("msgLog")}
                        >
                            <IconButton>
                                <FormatListNumbered />
                            </IconButton>
                            <p>Msg Log</p>
                        </IconContainer>
                        <IconContainer
                            onClick={() => handleMenuIconClick("stats")}
                        >
                            <IconButton>
                                <AutoGraph />
                            </IconButton>
                            <p>Stats</p>
                        </IconContainer>
                        <IconContainer
                            onClick={() => handleMenuIconClick("account")}
                        >
                            <IconButton>
                                <Storefront />
                            </IconButton>
                            <p>Account</p>
                        </IconContainer>
                    </HeaderIcons>

                    <Box>{showSelectionWindow()}</Box>
                </Inner>
            </Container>
        </Suspense>
    );
};

export default connect(null, { setBusiness })(SpecificBusinessPage);

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

const MessageLog = () => {
    return <div>Message Log</div>;
};

const Stats = () => {
    return <div>Stats</div>;
};

const Account = () => {
    const { businessId } = useParams();

    const [business, loading, error] = useDocument(
        doc(db, "businesses", businessId)
    );

    if (loading) return <GeneralLoading />;
    if (error) return <div>"error: " {error}</div>;

    console.log("business at profile: ", business.data());
    return (
        <Content>
            <h2>Account</h2>
            <ItemWrapper>
                <Title>Business Name: </Title>
                <TextInput>
                    <div>{business.data().businessName}</div>
                    <div>
                        <Edit />
                    </div>
                </TextInput>
            </ItemWrapper>
            <ItemWrapper>
                <Title>Website: </Title>
                <TextInput>
                    <div>{business.data().website} </div>
                    <div>
                        <Edit />
                    </div>
                </TextInput>
            </ItemWrapper>
            <ItemWrapper>
                <Title>Business Cell Phone: </Title>
                <TextInput>
                    <div>{business.data().businessCell} </div>
                    <div>
                        <Edit />
                    </div>
                </TextInput>
            </ItemWrapper>
            <ItemWrapper>
                <Title>Back Button Color: </Title>
                <TextInput>
                    <div>{business.data().backBtnColor} </div>
                    <div>
                        <Edit />
                    </div>
                </TextInput>
            </ItemWrapper>
            <ItemWrapper>
                <Title>Nav Bar Color: </Title>
                <TextInput>
                    <div>{business.data().navBarColor} </div>
                    <div>
                        <Edit />
                    </div>
                </TextInput>
            </ItemWrapper>
            <ItemWrapper>
                <Title>Logo Url: </Title>
                <TextInput>
                    <div>
                        {business.data().logoUrl.length > 25
                            ? business.data().logoUrl.slice(0, 25) + "..."
                            : business.data().logoUrl}{" "}
                    </div>
                    <div>
                        <Edit />
                    </div>
                </TextInput>
            </ItemWrapper>
            <ItemWrapper>
                <Title>Contact Form Link: </Title>

                {/* copy btn */}
                <div style={{ width: "100%" }}>
                    <CopyToClipboard
                        text={`${window.location.href.slice(
                            0,
                            window.location.href.lastIndexOf("/") - 9
                        )}/contact/${businessId}`}
                    >
                        <CopyInner
                            sx={{
                                display: "flex",
                                alignItems: "flex-end",

                                mt: 2,
                            }}
                        >
                            <div>
                                {`${window.location.href.slice(
                                    0,
                                    window.location.href.lastIndexOf("/") - 9
                                )}/contact/${businessId}`.length > 25
                                    ? `${window.location.href.slice(
                                          0,
                                          window.location.href.lastIndexOf(
                                              "/"
                                          ) - 9
                                      )}/contact/${businessId}`.slice(0, 25) +
                                      "..."
                                    : `${window.location.href.slice(
                                          0,
                                          window.location.href.lastIndexOf(
                                              "/"
                                          ) - 9
                                      )}/contact/${businessId}`}
                            </div>
                            <ToolTip content="Copied!" direction="top">
                                <ContentCopy
                                    sx={{
                                        color: "action.active",
                                        mr: 1,
                                        my: 0.5,
                                    }}
                                />
                            </ToolTip>
                        </CopyInner>
                    </CopyToClipboard>
                </div>
            </ItemWrapper>
            <ItemWrapper>
                <Title>Twilio Number: </Title>
                {business.data().twilioNumber ? (
                    <div>{business.data().twilioNumber} </div>
                ) : (
                    <AvailableTwilioNumbers business={business} /> //Passing in the whole businessObj
                )}
            </ItemWrapper>
        </Content>
    );
};

const CopyInner = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

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
