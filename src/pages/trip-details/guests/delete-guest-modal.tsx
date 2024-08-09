import { useParams } from "react-router-dom";
import { Modal } from "../../../components/modal";
import { Button } from "../../../components/button";
import { guestService } from "./guestService";

interface DeleteGuestModalProps {
  closeModal: () => void;
  participantId: string | null;
}

export function DeleteGuestModal({
  closeModal,
  participantId
}: DeleteGuestModalProps){
  const { tripId } = useParams();

  return (
    <Modal
      title="Remove guest"
      description="Are you sure about removing this guest?"
      closeModal={closeModal}
      size="max"
    >
      <Button size="full" variant="primary" onClick={() => guestService.deleteGuest(tripId, participantId)}>
        Confirm
      </Button>
    </Modal>
  )
}