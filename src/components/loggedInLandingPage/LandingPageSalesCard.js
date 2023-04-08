import { doc } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import { useDocument } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { db } from "../../utils/db/firebaseConfig";
import GeneralLoading from "../loading/GeneralLoading";

const LandingPageCard = ({ userId, setBusinessId }) => {
    const history = useHistory();
    const [user, loading, error] = useDocument(doc(db, "users", userId));

    if (loading) return <GeneralLoading />;
    if (error) return <div>"error: " {error}</div>;

    const handleRedirect = () => {
        // setBusinessId(businessId);
        // history.push(`/business/${businessId}`);
    };

    return (
        <Container onClick={() => handleRedirect()}>
            <ImageWrapper>
                <img src={user?.data().photoURL} alt="avatar" />
            </ImageWrapper>
            <Content>
                <ContentRow>
                    <ContentHeader>Name</ContentHeader>
                    <ContentHeader>Phone</ContentHeader>
                    <ContentHeader>Listings</ContentHeader>
                </ContentRow>
                <ContentRow>
                    <div>{user?.data().displayName}</div>
                    <div>{user?.data().cellPhone}</div>
                    <div>
                        {user?.data().businesses?.length
                            ? user?.data().businesses.length
                            : "0"}
                    </div>
                </ContentRow>
            </Content>
        </Container>
    );
};

export default LandingPageCard;

const RegisteredBusinesses = styled.div``;

const CellPhone = styled.div``;

const DisplayName = styled.div`
    font-size: 1.2rem;
    font-weight: 500;
`;

const ContentHeader = styled.div`
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 0.3rem; ;
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

    height: 5rem;
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
