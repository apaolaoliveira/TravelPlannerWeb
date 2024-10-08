import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InviteGuestsModal } from './modals/invite-guests-modal';
import { ConfirmTripModal } from './modals/confirm-trip-modal';
import { DestinationAndDateStep } from './steps/destination-and-date-step';
import { InviteGuestsStep } from './steps/invite-guests-step';
import { DateRange } from 'react-day-picker';
import { api } from '../../lib/axios';
import { format } from 'date-fns';

export function CreateTripPage() {
  const navigate = useNavigate();
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  const [destination, setDestination] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>();
  const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
  ? format(eventStartAndEndDates.from, "LLL do").concat(' to ').concat(format(eventStartAndEndDates.to, "LLL do"))
  : null;

  const [emailsToInvite, setEmailsToInvite] = useState<string[] | undefined>([]);

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

  function openConfirmTripModal(){
    setIsConfirmTripModalOpen(true);
  }

  function closeConfirmTripModal(){
    setIsConfirmTripModalOpen(false);
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const email = data.get('email')?.toString();	
    if(!email) return;

    if(!emailsToInvite){
      setEmailsToInvite([email]);
      return;
    }

    if(emailsToInvite.includes(email)) return;
    
    setEmailsToInvite([...emailsToInvite, email]);
    event.currentTarget.reset();
  }

  function removeEmailFromInvites(emailToRemove: string){
    if(!emailsToInvite) return;
    const newEmailList = emailsToInvite.filter(email => email !== emailToRemove);
    setEmailsToInvite(newEmailList);
  }

  async function createTrip(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    if(!destination 
      ||!ownerName 
      ||!ownerEmail 
      ||!eventStartAndEndDates?.from 
      ||!eventStartAndEndDates?.to
      ||emailsToInvite?.length === 0
    ){
      return;
    }

    const response = await api.post('/trips', {
      destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to,
      owner_name: ownerName,
      owner_email: ownerEmail,
      emails_to_invite: emailsToInvite,
    });

    const { tripId } = response.data;

    navigate(`/trips/${tripId}`);
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er logo" />
          <p className="text-zinc-300 text-lg">Invite your friends and plan your next travel!</p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateStep 
            closeGuestsInput={closeGuestsInput}
            openGuestsInput={openGuestsInput}
            isGuestsInputOpen={isGuestsInputOpen}
            setDestination={setDestination}
            setEventStartAndEndDates={setEventStartAndEndDates}
            eventStartAndEndDates={eventStartAndEndDates}
          />

          { isGuestsInputOpen && (
            <InviteGuestsStep 
              emailsToInvite={emailsToInvite? emailsToInvite : []}
              openConfirmTripModal={openConfirmTripModal}
              openGuestsModal={openGuestsModal}
            />
          )}
        </div>

        <p className="text-sm text-zinc-500">
          By planning your trip with plann.er, you automatically agree <br />
          to our <a href="#" className="text-zinc-300 underline">terms of use</a>&nbsp;
          and <a href="#" className="text-zinc-300 underline">privacy policies</a>. 
        </p>

        { isGuestsModalOpen && (
          <InviteGuestsModal 
            emailsToInvite={emailsToInvite? emailsToInvite : []}
            addNewEmailToInvite={addNewEmailToInvite}
            removeEmailFromInvites={removeEmailFromInvites}
            closeGuestsModal={closeGuestsModal}
          />
        )}

        { isConfirmTripModalOpen && (
          <ConfirmTripModal 
            closeConfirmTripModal={closeConfirmTripModal} 
            createTrip={createTrip} 
            setOwnerName={setOwnerName}
            setOwnerEmail={setOwnerEmail}
            destination={destination}
            displayedDate={displayedDate}
          />
        )}
      </div>
    </div>
  )
}