import { CircleCheck } from "lucide-react";

export function Activities(){
  return (
    <section className="space-y-8">
      <div className="space-y-2.5">
        <div className="flex gap-2 items-baseline">
          <span className="text-xl font-semibold text-zinc-300">17th</span>
          <span className="text-xs text-zinc-500">Saturday</span>
        </div>
        <p className="text-sm text-zinc-500">No record activities for this date</p>
      </div>

      <div className="space-y-2.5">
        <div className="flex gap-2 items-baseline">
          <span className="text-xl font-semibold text-zinc-300">18th</span>
          <span className="text-xs text-zinc-500">Sunday</span>
        </div>

        <div className="space-y-2.5">
          <div className="px-4 py-2.5 bg-zinc-900 rounded shadow-shape flex items-center gap-3">
            <CircleCheck className="size-5 text-lime-300"/>
            <span className="text-zinc-100">Group activity</span>
            <span className="text-zinc-400 text-sm ml-auto">08:00h</span>
          </div>
        </div>
      </div>
    </section>
  )
}