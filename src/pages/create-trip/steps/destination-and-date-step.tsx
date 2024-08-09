import { MapPin, Calendar, Settings2, ArrowRight } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { Modal } from "../../../components/modal";

interface DestinationAndDateStepProps {
  isGuestsInputOpen?: boolean;
  eventStartAndEndDates: DateRange | undefined;
  openGuestsInput: () => void;
  closeGuestsInput: () => void;
  setDestination: (destination: string) => void;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
}

export function DestinationAndDateStep({
  isGuestsInputOpen,
  eventStartAndEndDates,
  openGuestsInput,
  closeGuestsInput,
  setDestination,
  setEventStartAndEndDates,
}: DestinationAndDateStepProps){
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  function toggleOpenDatePicker(){
    return setIsDatePickerOpen(!isDatePickerOpen);
  }
  const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
  ? format(eventStartAndEndDates.from, "'from' LLL do").concat(' to ').concat(format(eventStartAndEndDates.to, "LLL do"))
  : null;

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <div className="flex items-center gap-2 flex-1">
        <MapPin className="size-5 text-zinc-400"/>
        <input 
          disabled={isGuestsInputOpen} 
          type="text" 
          placeholder="Where are you going?" 
          className="bg-transparent text-lg placeholder-zinc-400 outline-none w-60"
          onChange={event => setDestination(event.target.value)}
        />
      </div>

      <button disabled={isGuestsInputOpen} onClick={toggleOpenDatePicker} className="flex items-center flex-1 text-left gap-2">
        <Calendar className="size-5 text-zinc-400"/>
        <span className="text-lg text-zinc-400  flex-1">
          {displayedDate || "When?" }
        </span>
      </button>

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
            />
          </Modal>
        )
      }

      <div className="w-px h-6 bg-zinc-800"></div>

      { isGuestsInputOpen? (
        <Button variant="secondary" onClick={closeGuestsInput}>
          Change
          <Settings2 className="size-5 text-zinc-400"/>
        </Button>
      ):(             
        <Button variant="primary" onClick={openGuestsInput}>
          Continue
          <ArrowRight className="size-5 "/>
        </Button>
      )
      }
    </div>
  )
}