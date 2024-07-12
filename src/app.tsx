import { MapPin, Calendar, ArrowRight } from 'lucide-react';

export function App() {
  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er logo" />
          <p className="text-zinc-300 text-lg">Invite your friends and plan your next travel!</p>
        </div>

        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
          <div className="flex items-center gap-2 flex-1">
            <MapPin className="size-5 text-zinc-400"/>
            <input type="text" placeholder="Where are you going?" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"/>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="size-5 text-zinc-400"/>
            <input type="text" placeholder="When?" className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none"/>
          </div>

          <div className="w-px h-6 bg-zinc-800"></div>

          <button className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
            Continue
            <ArrowRight className="size-5 "/>
          </button>
        </div>

        <p className="text-sm text-zinc-500">
          By planning your trip with plann.er, you automatically agree <br />
          to our <a href="#" className="text-zinc-300 underline">terms of use</a> 
          and <a href="#" className="text-zinc-300 underline">privacy policies</a>. 
        </p>
      </div>
    </div>
  )
}