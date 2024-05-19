import Modal from '@mui/material/Modal';
import { ReactNode } from 'react';

const Modals = ({ handleClose, open, children }:
    { handleClose: () => void; open: boolean, children: ReactNode }) => {

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div>
                    {children}
                </div>

            </Modal>
        </>
    )
}
export default Modals;