import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import Profile from "../pages/Profile/Profile";

const ProfileModal = ({open, toggle}) => {
    return (
        <Dialog open={open} className="addStaffModal" fullWidth scroll="body" onClose={() => toggle(false)}>
            <IconButton className="modalClose" onClick={() => toggle(false)}>
                {/*<CloseIcon/>*/}
            </IconButton>
            <DialogContent className="addStaffModal__content">
                <Profile />
            </DialogContent>
        </Dialog>
    );
};

export default ProfileModal;
