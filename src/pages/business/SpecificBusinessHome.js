import React, { Suspense, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import GeneralLoading from "../../components/loading/GeneralLoading";
import Header from "../../components/Header";
import { ButtonGroup, IconButton } from "@mui/material";
import {
    AccountCircle,
    AutoGraph,
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
            <div>
                <span>Business Name: </span>
                <span>
                    {business.data().businessName}{" "}
                    <span>
                        <Edit />
                    </span>
                </span>
            </div>
            <div>
                <span>Website: </span>
                <span>
                    {business.data().website}{" "}
                    <span>
                        <Edit />
                    </span>
                </span>
            </div>
            <div>
                <span>Business Cell Phone: </span>
                <span>
                    {business.data().businessCell}{" "}
                    <span>
                        <Edit />
                    </span>
                </span>
            </div>
            <div>
                <span>Back Button Color: </span>
                <span>
                    {business.data().backBtnColor}{" "}
                    <span>
                        <Edit />
                    </span>
                </span>
            </div>
            <div>
                <span>Nav Bar Color: </span>
                <span>
                    {business.data().navBarColor}{" "}
                    <span>
                        <Edit />
                    </span>
                </span>
            </div>
            <div>
                <span>Logo Url: </span>
                <span>
                    {business.data().logoUrl}{" "}
                    <span>
                        <Edit />
                    </span>
                </span>
            </div>
            <div>
                <span>Contact Form Link: </span>
                <span>
                    {`${window.location.href.slice(
                        0,
                        window.location.href.lastIndexOf("/") - 9
                    )}/contact/${businessId}`}
                    <span>
                        {/* TODO: Add the copy btn */}
                        {"  "}[Copy Button]
                    </span>
                </span>
            </div>
            <div>
                <span>Twilio Number: </span>
                {business.data().twilioNumber ? (
                    <span>
                        {business.data().twilioNumber}{" "}
                        <span>
                            <Edit />
                        </span>
                    </span>
                ) : (
                    <AvailableTwilioNumbers business={business} /> //Passing in the whole businessObj
                )}
            </div>
        </Content>
    );
};

const Content = styled.div`
    margin: 3rem 0;
`;
