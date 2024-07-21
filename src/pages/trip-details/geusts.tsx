import { CircleDashed, Plus } from "lucide-react";
import { Button } from "../../components/button";

export function Guests(){
  return (
    <section className="space-y-6">
      <h2 className="font-semibold text-xl">Guests</h2>
      
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">Jessica White</span>
            <span className="block text-sm text-zinc-400 truncate">jessica@gmail.com</span>
          </div>
          <CircleDashed className="text-zinc-400 size-5 shrink-0" />
        </div>
      </div>

      <Button variant="secondary" size="full">
        <Plus className="size-5 text-zinc-400"/>
        Manage guests
      </Button>
    </section>
  )
}