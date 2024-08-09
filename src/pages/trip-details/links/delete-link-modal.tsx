import { useParams } from "react-router-dom";
import { Button } from "../../../components/button";
import { Modal } from "../../../components/modal";
import { api } from "../../../lib/axios";

interface DeleteLinkModalProps {
  closeModal: () => void;
  linkId: string | null;
}

export function DeleteLinkModal({
  closeModal,
  linkId
}: DeleteLinkModalProps){
  const { tripId } = useParams();

  async function deleteLink(){
    if(!linkId) return;
    await api.delete(`/trips/${tripId}/links/${linkId}`);
    window.document.location.reload();
  }

  return (
    <Modal
      title="Delete Link"
      description="Are you sure about deleting this link?"
      closeModal={closeModal}
      size="max"
    >
      <Button size="full" variant="primary" onClick={deleteLink}>
        Confirm
      </Button>
    </Modal>
  )
}