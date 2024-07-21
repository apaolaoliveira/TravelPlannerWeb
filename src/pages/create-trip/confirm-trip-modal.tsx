import { X, User, AtSign } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
}

export function ConfirmTripModal({ 
  closeConfirmTripModal, 
  createTrip,
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
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5"/>
            <input 
              type="text" 
              name="name"
              placeholder="Full name" 
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <AtSign className="text-zinc-400 size-5"/>
            <input 
              type="email" 
              name="email"
              placeholder="Personal email" 
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>
          
          <Button variant="primary" size="full" type="submit">
            Confirm trip
          </Button>
        </form>
      </div>
    </div>
  )
}