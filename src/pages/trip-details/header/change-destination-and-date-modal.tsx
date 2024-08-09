import { DateRange, DayPicker } from "react-day-picker";
import { Modal } from "../../../components/modal";
import { MapPin, Calendar } from "lucide-react";
import { FormEvent, useState } from "react";
import { addDays, format, startOfToday } from "date-fns";
import { Button } from '../../../components/button';

interface ChangeDestinationAndDateModalProps {
  closeModal: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  eventStartAndEndDates: DateRange | undefined;
  destination: string;
  setDestination: (destination: string) => void;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
}

export function ChangeDestinationAndDateModal({
  closeModal,
  onSubmit,
  destination,
  eventStartAndEndDates,
  setDestination,
  setEventStartAndEndDates,
}: ChangeDestinationAndDateModalProps){
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function toggleOpenDatePicker(){
    return setIsDatePickerOpen(!isDatePickerOpen);
  }

  const tomorrow = addDays(startOfToday(), 1); 
  const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
  ? format(eventStartAndEndDates.from, "'from' LLL do").concat(' to ').concat(format(eventStartAndEndDates.to, "LLL do"))
  : null;
  
  return (
    <>
      <Modal
        title="Change destination and date"
        description=""
        closeModal={closeModal}
        >
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <div className="h-16 bg-zinc-800 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex items-center gap-2 flex-1">
              <MapPin className="size-5 text-zinc-400"/>
              <input 
                type="text"
                value={destination} 
                placeholder="Where are you going?" 
                className="bg-transparent text-lg placeholder-zinc-400 outline-none w-60"
                onChange={event => setDestination(event.target.value)}
                required
              />
            </div>

            <button type="button" onClick={toggleOpenDatePicker} className="flex items-center flex-1 text-left gap-2">
              <Calendar className="size-5 text-zinc-400"/>
              <span className="text-lg text-zinc-400  flex-1">
                {displayedDate || "When?" }
              </span>
            </button>
          </div>

          <Button type="submit" size="full">
            Save
          </Button>
        </form>
      </Modal>
      
      { isDatePickerOpen && (
          <Modal
            title="Date picker"
            description="Select the start and end dates"
            closeModal={toggleOpenDatePicker}
            size="max"
          >
            <DayPicker 
              classNames={{
                today: `bg-amber-500 text-white hover:bg-lime-600 rounded-full`,
                range_start: `rounded-l-full`,
                range_end: `rounded-r-full`,
                selected: `bg-lime-500 text-white`, // Highlight the selected day
                chevron: `fill-amber-500`
              }} 
              mode="range" 
              selected={eventStartAndEndDates} 
              onSelect={setEventStartAndEndDates}
              disabled={{ before: tomorrow }} 
            />
          </Modal>
        )
      }
    </>
  )
}