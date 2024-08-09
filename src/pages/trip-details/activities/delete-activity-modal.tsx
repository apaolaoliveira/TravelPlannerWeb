import { useParams } from "react-router-dom";
import { Modal } from "../../../components/modal";
import { api } from "../../../lib/axios";
import { Button } from "../../../components/button";

interface DeleteActivityModalProps {
  closeDeleteActivityModal: () => void;
  activityId: string | null;
}

export function DeleteActivityModal({
  closeDeleteActivityModal,
  activityId
}: DeleteActivityModalProps){
  const { tripId } = useParams();

  async function deleteActivity(){
    if(!activityId) return;
    await api.delete(`/trips/${tripId}/activities/${activityId}`);
    window.document.location.reload();
  }

  return (
    <Modal
      title="Delete Activity"
      description="Are you sure about deleting this activity?"
      closeModal={closeDeleteActivityModal}
      size="max"
    >
      <Button size="full" variant="primary" onClick={deleteActivity}>
        Confirm
      </Button>
    </Modal>
  )
}