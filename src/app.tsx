import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, X, AtSign, Plus, User } from 'lucide-react';
import { FormEvent, useState } from 'react';

export function App() {
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState([
    'apaolaoliveira@gmail.com',
  ]);

  function openGuestsInput(){
    setIsGuestsInputOpen(true);
  }

  function closeGuestsInput(){
    setIsGuestsInputOpen(false);
  }

  function openGuestsModal(){
    setIsGuestsModalOpen(true);
  }

  function closeGuestsModal(){
    setIsGuestsModalOpen(false);
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const email = data.get('email')?.toString();	
    if(!email) return;
    if(emailsToInvite.includes(email)) return;
    
    setEmailsToInvite([...emailsToInvite, email]);
    event.currentTarget.reset();
  }

  function removeEmailFromInvites(emailToRemove: string){
    const newEmailList = emailsToInvite.filter(email => email !== emailToRemove);
    setEmailsToInvite(newEmailList);
  }

  function openConfirmTripModal(){
    setIsConfirmTripModalOpen(true);
  }

  function closeConfirmTripModal(){
    setIsConfirmTripModalOpen(false);
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er logo" />
          <p className="text-zinc-300 text-lg">Invite your friends and plan your next travel!</p>
        </div>

        <div className="space-y-4">
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex items-center gap-2 flex-1">
              <MapPin className="size-5 text-zinc-400"/>
              <input disabled={isGuestsInputOpen} type="text" placeholder="Where are you going?" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"/>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-zinc-400"/>
              <input disabled={isGuestsInputOpen} type="text" placeholder="When?" className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none"/>
            </div>

            <div className="w-px h-6 bg-zinc-800"></div>

            { isGuestsInputOpen? (
              <button onClick={closeGuestsInput} className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700">
                Change location/date
                <Settings2 className="size-5 text-zinc-400"/>
              </button>
            ):(              
              <button onClick={openGuestsInput} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                Continue
                <ArrowRight className="size-5 "/>
              </button>
            )
            }
          </div>

          { isGuestsInputOpen && (
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
              <button onClick={openGuestsModal} className="flex items-center gap-2 flex-1">
                <UserRoundPlus className="size-5 text-zinc-400"/>
                {emailsToInvite.length > 0 ? (
                  <span className="text-zinc-100 text-lg flex-1 text-left">{emailsToInvite.length} invited guests</span>
                ):(
                  <span className="text-zinc-400 text-lg flex-1 text-left">Who will be on the trip?</span>
                )}
              </button>

              <div className="w-px h-6 bg-zinc-800"></div>

              <button onClick={openConfirmTripModal} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                Confirm Trip
                <ArrowRight className="size-5 "/>
              </button>
            </div>
          )}
        </div>

        <p className="text-sm text-zinc-500">
          By planning your trip with plann.er, you automatically agree <br />
          to our <a href="#" className="text-zinc-300 underline">terms of use</a> 
          and <a href="#" className="text-zinc-300 underline">privacy policies</a>. 
        </p>

        { isGuestsModalOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Select guests</h2>
                  <button type="button" onClick={closeGuestsModal} className="">
                    <X className="size-5 text-zinc-400"/>
                  </button>
                </div>
                <p className="text-sm text-zinc-400 text-left">
                  The guests will receive emails to confirm their participation on the travel.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {
                  emailsToInvite.map(email => {
                    return (
                      <div key={email} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
                        <span className="text-zinc-300">{email}</span>
                        <button type="button">
                          <X className="size-4 text-zinc-400" onClick={() => removeEmailFromInvites(email)}/>
                        </button>
                      </div>
                    )
                  })
                }
              </div>

              <div className="w-full h-px bg-zinc-800"/>

              <form onSubmit={addNewEmailToInvite} className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <div className="px-2 flex items-center flex-1 gap-2">
                  <AtSign className="text-zinc-400 size-5"/>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Enter guest's email" 
                    className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                  />
                </div>
                <button type="submit" className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                  Invite
                  <Plus className="size-5 "/>
                </button>
              </form>
            </div>
          </div>
        )}

        { isConfirmTripModalOpen && (
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

              <form onSubmit={addNewEmailToInvite} className="space-y-3">
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
                <button type="submit" className="w-full justify-center bg-lime-300 text-lime-950 rounded-lg px-5 h-11 font-medium flex items-center gap-2 hover:bg-lime-400">
                  Confirm trip
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}