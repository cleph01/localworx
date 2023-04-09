import {
    collectionGroup,
    doc,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { connect } from "react-redux";
import styled from "styled-components";
import { db } from "../../utils/db/firebaseConfig";
import GeneralLoading from "../loading/GeneralLoading";

const TwilioBalance = ({ businessId }) => {
    const [business, loading, error] = useDocument(
        doc(db, "businesses", businessId)
    );

    if (loading) return <GeneralLoading />;
    if (error) return <div>"error: " {error}</div>;

    return (
        <Container>
            <Count
                twilioNumber={business?.data().twilioNumber}
                currPurchasedCount={business?.data().twilioSmsPurchased}
            />
        </Container>
    );
};

const mapStateToProps = (state) => {
    return {
        business: state.business.business,
        message: state.message.message,
    };
};

export default connect(mapStateToProps, {})(TwilioBalance);

const Container = styled.div`
    padding: 0.5rem 2rem;
    font-size: var(--p-font);

    &&& {
        border-bottom: 1px solid var(--border-color);
    }
`;

const Count = ({ twilioNumber, currPurchasedCount }) => {
    // Get All messages sent both-ways from messages subcolllection in business/chat
    const twilioMsgsQuery = query(
        collectionGroup(db, `messages`),
        where("twilioNumber", "==", twilioNumber)
    );

    const [twilioMessagesSnapshot, loading, error] =
        useCollection(twilioMsgsQuery);

    if (error) {
        return <strong>Error: {JSON.stringify(error)}</strong>;
    }

    if (loading) {
        return <span>Document: Loading...</span>;
    }

    const twilioMessagesSent = twilioMessagesSnapshot?.docs?.length;

    const messagesRemaining = currPurchasedCount - twilioMessagesSent;

    return (
        <TextWrapper alert={messagesRemaining <= 100}>
            {messagesRemaining <= 100 ? (
                <>
                    <Text>Remaining Balance: {messagesRemaining * 0.01}</Text>
                    <BuyButton>Replenish</BuyButton>
                </>
            ) : (
                <>
                    <Text>Messages Remaining: {messagesRemaining}</Text>
                    <BuyButton>Replenish</BuyButton>
                </>
            )}
        </TextWrapper>
    );
};

const BuyButton = styled.div`
    padding: 1rem;
    border: 1px solid;
    border-radius: 1rem;
`;

const Text = styled.div``;

const TextWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${(props) => (props.alert ? "red" : "inherit")};
`;
