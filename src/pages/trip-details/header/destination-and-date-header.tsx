import { MapPin, Calendar, Settings2 } from "lucide-react";
import { Button } from "../../../components/button";
import { useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../../../lib/axios";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { ChangeDestinationAndDateModal } from "./change-destination-and-date-modal";

export function DestinationAndDateHeader(){
  const { tripId } = useParams();
  
  useEffect(() => {
    api.get(`/trips/${tripId}`)
    .then(response => {
      const trip = response.data.trip;
      setDestination(trip.destination);
      setEventStartAndEndDates({
        from: new Date(trip.starts_at),
        to: new Date(trip.ends_at),
      });
    })
  }, [tripId]);

  const [destination, setDestination] = useState('');
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>();
  const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
  ? format(eventStartAndEndDates.from, "LLL do").concat(' to ').concat(format(eventStartAndEndDates.to, "LLL do"))
  : null;

  const [isDestinationAndDateModalOpen, setIsDestinationAndDateModalOpen] = useState(false);
  const toggleIsDestinationAndDateModalOpen = () => {
    setIsDestinationAndDateModalOpen(!isDestinationAndDateModalOpen);
  }

  async function updateDestinationAndDate(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    if(!destination 
      ||!eventStartAndEndDates?.from 
      ||!eventStartAndEndDates?.to
    ){
      return;
    }

    await api.put(`/trips/${tripId}`,{ 
      destination, 
      starts_at: eventStartAndEndDates.from, 
      ends_at: eventStartAndEndDates.to,
    });

    window.document.location.reload();
  }

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{displayedDate}</span>
        </div>

        <div className="w-px h-6 bg-zinc-800"/>

        <Button onClick={toggleIsDestinationAndDateModalOpen} variant="secondary">
          Change location/date
          <Settings2 className="size-5 text-zinc-400"/>
        </Button>
      </div>

      {isDestinationAndDateModalOpen && (
        <ChangeDestinationAndDateModal
          closeModal={toggleIsDestinationAndDateModalOpen}
          eventStartAndEndDates={eventStartAndEndDates}
          destination={destination}
          setDestination={setDestination}
          setEventStartAndEndDates={setEventStartAndEndDates}
          onSubmit={updateDestinationAndDate}
        />
      )}
    </div>
  )
}