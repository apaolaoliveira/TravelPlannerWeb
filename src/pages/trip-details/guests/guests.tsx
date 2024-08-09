import { CheckCircle2, CircleDashed, Pencil, Plus, X } from "lucide-react";
import { Button } from "../../../components/button";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../../lib/axios";
import { InviteNewGuestModal } from "./invite-new-guest-modal";
import { UpdateGuestModal } from "./update-guest-modal";
import { DeleteGuestModal } from "./delete-guest-modal";

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

  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');

  const [isInviteGuestModalOpen, setIsInviteGuestModalOpen] = useState(false);
  const [isUpdateGuestModalOpen, setIsUpdateGuestModalOpen] = useState(false);
  const [isDeleteGuestModalOpen, setIsDeleteGuestModalOpen] = useState(false);

  const [ selectedGuestId, setSelectedGuestId ] = useState<string | null>(null);

  function toggleInviteGuestModalOpen(){
    setIsInviteGuestModalOpen(!isInviteGuestModalOpen);
  }

  function openEditGuestModal(participantId: string) {
    setSelectedGuestId(participantId);
    setIsUpdateGuestModalOpen(true);
  }

  function closeEditGuestModal() {
    setIsUpdateGuestModalOpen(false);
    setSelectedGuestId(null);
  }

  function openDeleteGuestModal(participantId: string) {
    setSelectedGuestId(participantId);
    setIsDeleteGuestModalOpen(true);
  }

  function closeDeleteGuestModal() {
    setIsDeleteGuestModalOpen(false);
    setSelectedGuestId(null);
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
              <div className="flex items-center gap-2">
                <button onClick={() => openEditGuestModal(participant.id)}>
                  <Pencil className="text-zinc-400 hover:text-amber-400 size-3"/>
                </button>
                <button onClick={() => openDeleteGuestModal(participant.id)}>
                  <X className="text-zinc-400 hover:text-red-400 size-4"/>
                </button>
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
        <InviteNewGuestModal 
          setGuestName={setGuestName}
          setGuestEmail={setGuestEmail}
          guestName={guestName}
          guestEmail={guestEmail}
          closeModal={toggleInviteGuestModalOpen} 
        />
      )}

      {isUpdateGuestModalOpen && (
        <UpdateGuestModal
          setGuestName={setGuestName}
          setGuestEmail={setGuestEmail}
          guestName={guestName}
          guestEmail={guestEmail}
          closeModal={closeEditGuestModal} 
          participantId={selectedGuestId}
        />
      )}

      {isDeleteGuestModalOpen && (
        <DeleteGuestModal
          closeModal={closeDeleteGuestModal} 
          participantId={selectedGuestId}
        />
      )}
    </section>
  )
}