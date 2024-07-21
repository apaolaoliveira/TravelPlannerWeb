import { Calendar, CircleCheck, Link2, MapPin, Plus, Settings2 } from 'lucide-react';

export function TripDetailsPage(){
  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="size-5 text-zinc-400" />
          <span className="text-zinc-100">Florianópolis, Brasil</span>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <Calendar className="size-5 text-zinc-400" />
            <span className="text-zinc-100">17th a 23th August</span>
          </div>

          <div className="w-px h-6 bg-zinc-800"/>

          <button className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700">
            Change location/date
            <Settings2 className="size-5 text-zinc-400"/>
          </button>
        </div>
      </div>

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className='text-3xl font-semibold'>Activity</h2>
            <button className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
              <Plus className="size-5"/>
              New activity
            </button>
          </div>

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
        </div>

        <div className="w-80 space-y-6">
          <section className="space-y-6">
            <h2 className="font-semibold text-xl">Useful links</h2>
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="block font-medium text-zinc-100">AirBnB booking</span>
                  <a href="#" className="block text-xs text-zinc-400 hover:text-zinc-200 truncate">https://www.airbnb.com.br/rooms/104700011</a>
                </div>
                <Link2 className="text-zinc-400 size-5 shrink-0" />
              </div>
            </div>
            <button className="bg-zinc-800 w-full justify-center text-zinc-200 rounded-lg px-5 h-11 font-medium flex items-center gap-2 hover:bg-zinc-700">
              <Plus className="size-5 text-zinc-400"/>
              Add link
            </button>
          </section>
          <div className="w-full h-px bg-zinc-800"></div>
        </div>
      </main>
    </div>
  )
}