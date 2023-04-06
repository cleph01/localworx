import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { db } from "../../utils/db/firebaseConfig";
import styled from "styled-components";

const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 355,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

function BlockModal({
    openBlockModal,
    setOpenBlockModal,
    targetBusiness,
    setOpenSnackBar,
    setAlertMsg,
    setBusinesses,
    isBlocked,
}) {
    const handleBlock = () => {
        db.collection("businesses")
            .doc(targetBusiness.businessId)
            .update({
                isBlocked: !isBlocked,
            })
            .then(() => {
                setBusinesses((prevState) => {
                    return prevState.map((business) => {
                        var temp = Object.assign({}, business);
                        if (business.businessId === targetBusiness.businessId) {
                            temp.isBlocked = !isBlocked;
                        }

                        return temp;
                    });
                });

                setAlertMsg({
                    message: `Successfully ${
                        isBlocked ? "UnBlocked" : "Blocked"
                    } Business`,
                    severity: "success",
                });

                setOpenSnackBar(true);
            })
            .catch((error) => {
                setAlertMsg({
                    message: "Error Blocking Business",
                    severity: "error",
                });

                setOpenSnackBar(true);

                console.log("Error updating Text Page Url: ", error);
            });

        setOpenBlockModal(false);
    };

    const handleCloseBlockModal = () => setOpenBlockModal(false);

    return (
        <Modal
            open={openBlockModal}
            onClose={handleCloseBlockModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    sx={{ textAlign: "center", borderColor: "#f0f0f0" }}
                >
                    {isBlocked ? "UnBlock" : "Block"} Client
                </Typography>
                <Typography
                    id="modal-modal-description"
                    sx={{ mt: 2, textAlign: "center" }}
                >
                    Sure About Blocking Client?
                </Typography>

                <h3>Cannot Be Reversed</h3>
                <ButtonGroup>
                    <BlockButton onClick={handleBlock}>
                        Yes, {isBlocked ? "UnBlock" : "Block"}
                    </BlockButton>
                    <CancelButton
                        
                        onClick={handleCloseBlockModal}
                    >
                        Cancel
                    </CancelButton>
                </ButtonGroup>
            </Box>
        </Modal>
    );
}

export default BlockModal;

const ButtonGroup = styled.div`
    display: "flex";
    flex-direction: row;
    justify-content: "space-around";
    align-items: "center";
    margin-top: "15px";
`;

const Button = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #fcfcfc;
    border: none;
    border-radius: 5px;
    padding: 10px;
    margin-top: 20px;
`;

const BlockButton = styled(Button)`
    background: #68cb61;
`;

const CancelButton = styled(Button)`
    background: #bb3133;
`;
