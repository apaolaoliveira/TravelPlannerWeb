import { User, AtSign, Plus } from "lucide-react";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import { useParams } from "react-router-dom";
import { Modal } from '../../../components/modal';
import { guestService } from "./guestService";

interface InviteNewGuestModalProps {
  closeModal: () => void;
  setGuestName: (guestName: string) => void;
  setGuestEmail: (guestEmail: string) => void;
  guestName: string;
  guestEmail: string;
}

export function InviteNewGuestModal({
  closeModal,
  setGuestName,
  setGuestEmail,
  guestName,
  guestEmail,
}: InviteNewGuestModalProps){
  const { tripId } = useParams();
  

  return (
    <Modal
        title="Invite new guest"
        description="The new guest will receive an email to confirm participation on the trip :)"
        closeModal={closeModal}
        size="large"
      > 
        <form onSubmit={(event) => guestService.inviteNewGuest(event, tripId, guestName, guestEmail)} className="space-y-3">
          <Input 
            type="text" 
            name="name" 
            placeholder="Guest's name" 
            minLength={4} 
            onChange={event => setGuestName(event.target.value)}
            required
          >
            <User className="text-zinc-400 size-5"/>
          </Input>

          <Input 
            type="email" 
            name="email" 
            placeholder="Guest's email" 
            onChange={event => setGuestEmail(event.target.value)}
            required
          >
            <AtSign className="text-zinc-400 size-5"/>
          </Input>

          <Button variant="primary" size="full">
            <Plus className="size-5"/>
            Invite
          </Button>
        </form>
    </Modal>
  )
}