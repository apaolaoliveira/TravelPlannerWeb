import { Tag, Calendar } from "lucide-react";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import { FormEvent } from "react";
import { api } from "../../../lib/axios";
import { useParams } from "react-router-dom";
import { Modal } from '../../../components/modal';

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void;
}

export function CreateActivityModal({
  closeCreateActivityModal
}: CreateActivityModalProps){
  const { tripId } = useParams();

  async function createActivity(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const title = data.get('title')?.toString();
    const occurs_at = data.get('occurs_at')?.toString();
    
    await api.post(`/trips/${tripId}/activities`, {
      title,
      occurs_at,
    });

    window.document.location.reload();
  }

  return (
    <Modal
        title="Create activity"
        description="All the guests can visualize this activity"
        closeModal={closeCreateActivityModal}
        size="large"
      > 
        <form onSubmit={createActivity} className="space-y-3">
          <Input type="text" name="title" placeholder="Activity's title" minLength={4} required>
            <Tag className="text-zinc-400 size-5"/>
          </Input>

          <Input type="datetime-local" name="occurs_at" placeholder="Date and time" required>
            <Calendar className="text-zinc-400 size-5"/>
          </Input>

          <Button variant="primary" size="full">
            Save activity
          </Button>
        </form>
    </Modal>
  )
}