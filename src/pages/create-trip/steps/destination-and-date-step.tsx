import { MapPin, Calendar, Settings2, ArrowRight, X } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

interface DestinationAndDateStepProps {
  isGuestsInputOpen?: boolean;
  openGuestsInput: () => void;
  closeGuestsInput: () => void;
}

export function DestinationAndDateStep({
  isGuestsInputOpen,
  openGuestsInput,
  closeGuestsInput,
}: DestinationAndDateStepProps){
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>();

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
        <input disabled={isGuestsInputOpen} type="text" placeholder="Where are you going?" className="bg-transparent text-lg placeholder-zinc-400 outline-none w-60"/>
      </div>

      <button disabled={isGuestsInputOpen} onClick={toggleOpenDatePicker} className="flex items-center flex-1 text-left gap-2">
        <Calendar className="size-5 text-zinc-400"/>
        <span className="text-lg text-zinc-400  flex-1">
          {displayedDate || "When?" }
        </span>
      </button>

      { isDatePickerOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Select the start and end dates</h2>
                  <button type="button" onClick={toggleOpenDatePicker} className="">
                    <X className="size-5 text-zinc-400"/>
                  </button>
                </div>
              </div>
              <DayPicker 
                classNames={{
                  today: `bg-amber-500 text-white hover:bg-lime-600 rounded-full`,
                  range_start: `bg-lime-600 rounded-l-full`,
                  range_end: `bg-lime-600 rounded-r-full`,
                  selected: `bg-lime-500 text-white`, // Highlight the selected day
                  chevron: `fill-amber-500`
                }} 
                mode="range" 
                selected={eventStartAndEndDates} 
                onSelect={setEventStartAndEndDates}
              />
            </div>
          </div>
        )
      }

      <div className="w-px h-6 bg-zinc-800"></div>

      { isGuestsInputOpen? (
        <Button variant="secondary" onClick={closeGuestsInput}>
          Change location/date
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