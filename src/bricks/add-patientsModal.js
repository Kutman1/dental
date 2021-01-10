import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import DialogContent from "@material-ui/core/DialogContent";
import AddPatients from "../pages/addPatients/addPatients";
import Dialog from "@material-ui/core/Dialog";

const AddPatientsModal = ({open, handleClose}) => {
    return (
        <Dialog open={open} className="addStaffModal" fullWidth scroll="body" onClose={handleClose}>
            <IconButton className="modalClose" onClick={handleClose}>
                {/*<CloseIcon/>*/}
            </IconButton>
            <DialogContent className="addStaffModal__content">
                <AddPatients handleClose={handleClose}/>
            </DialogContent>
        </Dialog>
    );
};

export default AddPatientsModal;
