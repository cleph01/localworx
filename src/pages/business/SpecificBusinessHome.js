import React, { Suspense } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import GeneralLoading from "../../components/loading/GeneralLoading";
import Header from "../../components/Header";
import { ButtonGroup, IconButton } from "@mui/material";
import {
    AccountCircle,
    AutoGraph,
    FormatListNumbered,
    Textsms,
} from "@mui/icons-material";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../utils/db/firebaseConfig";
import { connect } from "react-redux";

import { setBusiness } from "../../redux/actions/businessProfileActions";

const SpecificBusinessPage = ({ setBusiness }) => {
    const { businessId } = useParams();
    const history = useHistory();

    const [business, loading, error] = useDocument(
        doc(db, "businesses", businessId)
    );

    if (business) {
        setBusiness(business.data());
    }

    return (
        <Suspense fallback={<GeneralLoading />}>
            <Header />
            <Container>
                <Inner>
                    <HeaderIcons>
                        <IconContainer
                            onClick={() =>
                                history.push(`/business/${businessId}/chat`)
                            }
                        >
                            <IconButton>
                                <Textsms />
                            </IconButton>
                            <p>Live SMS </p>
                        </IconContainer>
                        <IconContainer tabindex="0">
                            <IconButton>
                                <FormatListNumbered />
                            </IconButton>
                            <p>Msg Log</p>
                        </IconContainer>
                        <IconContainer tabindex="1">
                            <IconButton>
                                <AutoGraph />
                            </IconButton>
                            <p>Stats</p>
                        </IconContainer>
                        <IconContainer>
                            <IconButton>
                                <AccountCircle />
                            </IconButton>
                            <p>Profile</p>
                        </IconContainer>
                    </HeaderIcons>

                    <h1>Choose an account</h1>
                    <h3>to continue to your admin panel</h3>

                    <Box></Box>
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
