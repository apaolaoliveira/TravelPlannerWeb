import { X, Tag, Calendar } from "lucide-react";
import { Button } from "../../components/button";
import { Input } from "../../components/input";

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void;
}

export function CreateActivityModal({
  closeCreateActivityModal
}: CreateActivityModalProps){
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Create activity</h2>
            <button type="button" onClick={closeCreateActivityModal} className="">
              <X className="size-5 text-zinc-400"/>
            </button>
          </div>
          
          <p className="text-sm text-zinc-400 text-left">
            All the guests can visualize this activity
          </p>
        </div>
    
        <form className="space-y-3">
          <Input type="text" name="title" placeholder="Activity's title" >
            <Tag className="text-zinc-400 size-5"/>
          </Input>

          <Input type="datetime-local" name="occurs_at" placeholder="Date and time" >
            <Calendar className="text-zinc-400 size-5"/>
          </Input>

          <Button variant="primary" size="full">
            Save activity
          </Button>
        </form>
      </div>
    </div>
  )
}