import { useParams } from "react-router-dom";
import { Modal } from "../../../components/modal";
import { FormEvent } from "react";
import { api } from "../../../lib/axios";
import { Input } from "../../../components/input";
import { Button } from "../../../components/button";
import { Link, Tag } from "lucide-react";

interface CreateLinkModalProps {
  closeModal: () => void;
}

export function CreateLinkModal({ closeModal }: CreateLinkModalProps){
  const { tripId } = useParams();

  async function createActivity(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const title = data.get('title')?.toString();
    const url = data.get('url')?.toString();
    
    await api.post(`/trips/${tripId}/links`, {
      title,
      url,
    });
    
    window.document.location.reload();
  } 

  return (
    <Modal
      title="Create link"
      description="All the guests can visualize this link"
      closeModal={closeModal}
      size="large"
    >
      <form onSubmit={createActivity} className="space-y-3">
          <Input type="text" name="title" placeholder="Links's title" minLength={4} required>
            <Tag className="text-zinc-400 size-5"/>
          </Input>

          <Input type="url" name="url" placeholder="Link's url" required>
            <Link className="text-zinc-400 size-5"/>
          </Input>

          <Button variant="primary" size="full">
            Save link
          </Button>
        </form>
    </Modal>
  )
}