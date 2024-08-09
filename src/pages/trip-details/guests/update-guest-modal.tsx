import { User, AtSign } from "lucide-react";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import { useParams } from "react-router-dom";
import { Modal } from '../../../components/modal';
import { guestService } from "./guestService.ts";
import { useEffect, useState } from "react";
import { api } from "../../../lib/axios.ts";

interface EditGuestModalProps {
  closeModal: () => void;
  guestName: string;
  guestEmail: string;
  setGuestName: (name: string) => void;
  setGuestEmail: (email: string) => void;
  participantId: string | null;
}

export interface SelectedParticipant {
  id: string;
  name: string;
  email: string;
  is_confirmed: boolean;
}

export function UpdateGuestModal({
  closeModal,
  participantId,
  guestName,
  guestEmail,
  setGuestName,
  setGuestEmail,
}: EditGuestModalProps){
  const { tripId } = useParams();
  const [selectedParticipant, setSelectedParticipant] = useState<SelectedParticipant>();

  useEffect(() =>{
    api.get(`/trips/participant/${participantId}`)
    .then(response => {
      const participant = response.data.participant;
      setSelectedParticipant(participant);
      setGuestName(participant.name);
      setGuestEmail(participant.email);
    })
  }, [tripId]);

  return (
    <Modal
        title="Update guest's information"
        description="The guest will receive an email to confirm participation on the trip :)"
        closeModal={closeModal}
        size="large"
      > 
        <form onSubmit={(event) => guestService.editGuest(event, tripId, participantId, guestName, guestEmail)} className="space-y-3">
          <Input 
            type="text" 
            name="name" 
            placeholder="Guest's name"
            value={guestName}
            onChange={event => setGuestName(event.target.value)}
            minLength={4} 
            required
          >
            <User className="text-zinc-400 size-5"/>
          </Input>

          {selectedParticipant?.is_confirmed ? (
              <>
                <Input 
                  type="email" 
                  name="email" 
                  placeholder="Guest's email" 
                  value={guestEmail}
                  readOnly={true}
                >
                  <AtSign className="text-zinc-400 size-5"/>
                </Input>
                <p className="text-gray-500">
                  * You can't change the guest's email, they are already confirmed.
                </p>
              </>
            ) : (
              <Input 
                type="email" 
                name="email" 
                placeholder="Guest's email" 
                value={guestEmail}
                onChange={event => setGuestEmail(event.target.value)}
                readOnly={false}
                required
              >
                <AtSign className="text-zinc-400 size-5"/>
              </Input>
            )            
          }

          <Button variant="primary" size="full">
            Save
          </Button>
        </form>
    </Modal>
  )
}