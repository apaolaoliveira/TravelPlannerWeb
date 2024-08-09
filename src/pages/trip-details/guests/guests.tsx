import { CheckCircle2, CircleDashed, Plus } from "lucide-react";
import { Button } from "../../../components/button";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../../lib/axios";
import { InviteNewGuestModal } from "./invite-new-guest-modal";

interface Participant {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
  is_owner: boolean;
}

export function Guests(){
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<Participant[]>([]);
  
  useEffect(() => {
    api.get(`/trips/${tripId}/participants`)
    .then(response => setParticipants(response.data.participants))
  }, [tripId]);

  const [isInviteGuestModalOpen, setIsInviteGuestModalOpen] = useState(false);

  function toggleInviteGuestModalOpen(){
    setIsInviteGuestModalOpen(!isInviteGuestModalOpen);
  }
  
  return (
    <section className="space-y-6">
      <h2 className="font-semibold text-xl">Guests</h2>
      
      <div className="space-y-5">
        {participants.map((participant, index) => {
          return (
            <div key={participant.id} className="flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="block font-medium text-zinc-100">{participant.name ?? `Guest ${index}`}</span>
                  {participant.is_confirmed
                    ? <CheckCircle2 className="text-lime-300 size-4" />
                    : <CircleDashed className="text-zinc-400 size-4" />
                  }
                  <span className="block font-normal text-zinc-400 text-xs">{participant.is_owner ? `(owner)`: ''}</span>
                </div>
                <span className="block text-sm text-zinc-400 truncate">{participant.email}</span>
              </div>
          </div>
          )
        })}
      </div>

      <Button onClick={toggleInviteGuestModalOpen} variant="secondary" size="full">
        <Plus className="size-5 text-zinc-400"/>
        Invite guest
      </Button>

      {isInviteGuestModalOpen && (
        <InviteNewGuestModal closeModal={toggleInviteGuestModalOpen} />
      )}
    </section>
  )
}