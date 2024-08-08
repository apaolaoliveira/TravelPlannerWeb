import { X, User, AtSign } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { Input } from '../../components/input';

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
  setOwnerName: (ownerName: string) => void;
  setOwnerEmail: (ownerEmail: string) => void;
}

export function ConfirmTripModal({ 
  closeConfirmTripModal, 
  createTrip,
  setOwnerName,
  setOwnerEmail,
}: ConfirmTripModalProps){
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Confirm booking details</h2>
            <button type="button" onClick={closeConfirmTripModal} className="">
              <X className="size-5 text-zinc-400"/>
            </button>
          </div>
          <p className="text-sm text-zinc-400 text-left">
            Please enter your information below to finalize your trip to 
            <span className="font-semibold text-zinc-100"> Florianópolis, Brazil </span> 
            scheduled for <span className="font-semibold text-zinc-100"> August 16 to 27, 2024.</span>
          </p>
        </div>

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
      </div>
    </div>
  )
}