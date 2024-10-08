import { ListCheck, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/axios";
import { format } from "date-fns";
import { DeleteActivityModal } from "./delete-activity-modal";

interface Activity {
  date: string;
  activities: {
    id: string;
    title: string;
    occurs_at: string;
  }[];
}

export function Activities(){
  const { tripId } = useParams();
  const [activities, setActivities] = useState<Activity[]>([]);
  
  useEffect(() => {
    api.get(`/trips/${tripId}/activities`)
    .then(response => setActivities(response.data.activities))
  }, [tripId]);

  const [isDeleteActivityModalOpen, setIsDeleteActivityModalOpen] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);

  function openDeleteActivityModal(activityId: string) {
    setSelectedActivityId(activityId);
    setIsDeleteActivityModalOpen(true);
  }

  function closeDeleteActivityModal() {
    setIsDeleteActivityModalOpen(false);
    setSelectedActivityId(null);
  }
  
  return (
    <section className="space-y-8">
      {activities.map((category, index) => {
        return (
          <div key={index} className="space-y-2.5">
            <div className="flex gap-2 items-baseline">
              <span className="text-xl font-semibold text-zinc-300">{format(category.date, "LLL do")}</span>
              <span className="text-xs text-zinc-500">{format(category.date, "EEEE")}</span>
            </div>
            {category.activities.length > 0 ? (
              <div>
                {category.activities.map(activity => {
                    return (
                      <div key={activity.id} className="space-y-2.5">
                      <div className="px-4 py-2.5 bg-zinc-900 rounded shadow-shape flex items-center gap-3">
                        <ListCheck className="size-5 text-lime-300"/>
                        <span className="text-zinc-100">{activity.title}</span>
                        <span className="text-zinc-400 text-sm ml-auto">{format(activity.occurs_at, "h:mm aaa")}</span>
                        <button onClick={() => openDeleteActivityModal(activity.id)}>
                          <X className="text-zinc-400 hover:text-red-400 size-5"/>
                        </button>
                      </div>
                    </div>
                    )
                  })
                }
              </div>
            ):(
              <p className="text-sm text-zinc-500">No record activities for this date</p>
            )}
          </div>
        )
      })}

      {isDeleteActivityModalOpen && (
        <DeleteActivityModal activityId={selectedActivityId} closeDeleteActivityModal={closeDeleteActivityModal}/>
      )}
    </section>
  )
}