import { Plus } from 'lucide-react';
import { useState } from 'react';
import { CreateActivityModal } from './activities/create-activity-modal';
import { Links } from './links/links';
import { Guests } from './guests/guests';
import { Activities } from './activities/activities';
import { DestinationAndDateHeader } from './header/destination-and-date-header';
import { Button } from '../../components/button';

export function TripDetailsPage(){
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false);

  function toggleCreateActivityModal(){
    setIsCreateActivityModalOpen(!isCreateActivityModalOpen);
  }

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader />

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className='text-3xl font-semibold'>Activity</h2>
            
            <Button variant="primary" onClick={toggleCreateActivityModal}>
              <Plus className="size-5"/>
              New activity
            </Button>
          </div>

          <Activities />
        </div>

        <div className="w-80 space-y-6">
          <Links />
          <div className="w-full h-px bg-zinc-800"></div>
          <Guests />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal closeCreateActivityModal={toggleCreateActivityModal} /> 
      )}
    </div>
  )
}