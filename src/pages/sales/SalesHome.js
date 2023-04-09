import { useParams } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import { setBusinessId } from "../../redux/actions/businessProfileActions";
import GeneralLoading from "../../components/loading/GeneralLoading";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "../../utils/db/firebaseConfig";
import Header from "../../components/Header";

const SalesHome = () => {
    const { userId } = useParams();

    const [currUser, loading, error] = useDocument(doc(db, "users", userId));

    if (loading) return <GeneralLoading />;
    if (error) return <div>"error: " {error}</div>;

    console.log("userId, user", userId, currUser.data());
    return (
        <>
            <Header />
            <CardContainer>
                <h2>Sales Clients</h2>
                {currUser?.data().sales.map((userId, idx) => (
                    <LandingPageSalesCard key={userId} userId={userId} />
                ))}
            </CardContainer>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        message: state.message.message,
    };
};

export default connect(null, {})(SalesHome);

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

const LandingPageSalesCard = ({ userId }) => {
    const [user, loading, error] = useDocument(doc(db, "users", userId));

    if (loading) return <GeneralLoading />;
    if (error) return <div>"error: " {error}</div>;

    return (
        <Container>
            <ImageWrapper>
                <img src={user?.data().photoURL} alt="avatar" />
            </ImageWrapper>
            <Content>
                <ContentRow>
                    <ContentHeader>Name</ContentHeader>
                    <ContentHeader>Phone</ContentHeader>
                    <ContentHeader>Listings</ContentHeader>
                </ContentRow>
                <LastRow>
                    <div>{user?.data().displayName}</div>
                    <div>{user?.data().cellPhone}</div>
                    <div>
                        {user?.data().businesses?.length
                            ? user?.data().businesses.length
                            : "0"}
                    </div>
                </LastRow>
                <ContentRow>
                    <ContentHeader>Amount</ContentHeader>
                    <ContentHeader>Status</ContentHeader>
                    <ContentHeader>Date</ContentHeader>
                </ContentRow>
                <LastRow>
                    <div>300</div>
                    <div>paid</div>
                    <div>Apr. 17, 2023</div>
                </LastRow>
            </Content>
        </Container>
    );
};

const ContentHeader = styled.div`
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 0.3rem; ;
`;

const LastRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    div {
        flex: 0.3;
    }
`;

const ContentRow = styled.div`
    display: flex;
    justify-content: space-between;

    div {
        flex: 0.3;
    }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const ImageWrapper = styled.div`
    width: 2.5rem;
    height: auto;
    text-align: center;

    > img {
        width: 100%;
        height: auto;
    }
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1.4rem;

    background: var(--bg-color);
    border-bottom: 1px solid #ccc;
    /* box-shadow: 0.25rem 0.25rem 1.5rem #657689; */

    padding: 0rem 0rem 0 1rem;
    cursor: pointer;
    transition: all 0.45s ease;

    :hover {
        transform: translateX(1rem);
    }
`;
