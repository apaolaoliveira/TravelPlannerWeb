import { User, AtSign } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../../components/button";
import { Input } from '../../../components/input';
import { Modal } from '../../../components/modal';

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
  setOwnerName: (ownerName: string) => void;
  setOwnerEmail: (ownerEmail: string) => void;
  destination: string;
  displayedDate: string | null;
}

export function ConfirmTripModal({ 
  closeConfirmTripModal, 
  createTrip,
  setOwnerName,
  setOwnerEmail,
  destination,
  displayedDate
}: ConfirmTripModalProps){
  return (
    <Modal
      title="Confirm booking details"
      description={
        <>
          Please enter your information below to finalize your trip to
          <span className="font-semibold text-zinc-100"> {destination} </span>
          scheduled for <span className="font-semibold text-zinc-100"> {displayedDate}.</span>
        </>
      }
      closeModal={closeConfirmTripModal}
      size="large"
    >
      <form onSubmit={createTrip} className="space-y-3">
          <Input 
            placeholder="Full name" 
            type="text" 
            name="name" 
            onChange={event => setOwnerName(event.target.value)}
          >
            <User className="text-zinc-400 size-5"/>
          </Input>

          <Input 
            placeholder="Personal Email" 
            type="email" 
            name="email" 
            onChange={event => setOwnerEmail(event.target.value)}
          >
            <AtSign className="text-zinc-400 size-5"/>
          </Input>
          
          <Button variant="primary" size="full" type="submit">
            Confirm trip
          </Button>
        </form>
    </Modal>
  )
}