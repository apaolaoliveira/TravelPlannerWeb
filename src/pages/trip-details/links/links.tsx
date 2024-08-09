import { Link2, Plus, X } from "lucide-react";
import { Button } from "../../../components/button";
import { useEffect, useState } from "react";
import { CreateLinkModal } from "./create-link";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/axios";

interface Link {
  id: string;
  title: string;
  url: string;
}

export function Links(){
  const { tripId } = useParams();
  const [ links, setLinks ] = useState<Link[]>([]);

  useEffect(() => {
    api.get(`/trips/${tripId}/links`)
    .then(response => setLinks(response.data.links))
  }, [tripId]);

  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);

  function toggleIsCreateLinkModalOpen(){
    setIsCreateLinkModalOpen(!isCreateLinkModalOpen);
  }

  return (
    <section className="space-y-6">
      <h2 className="font-semibold text-xl">Useful links</h2>
      <div className="space-y-5">
        {links.length > 0 ? (
            links.map(link => {
              return (
                <div key={link.id} className="flex items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="block font-medium text-zinc-100">{link.title}</span>
                    <div className="flex items-center gap-2">
                      <Link2 className="text-zinc-400 size-4" />
                      <a href={link.url} target="_blank" className="block text-xs text-zinc-400 hover:text-zinc-200 truncate">{link.url}</a>
                    </div>
                  </div>
                  <button>
                    <X className="text-zinc-400 hover:text-red-400 size-5 shrink-0"/>
                  </button>
                </div>
              )
            })
          ): (
            <p className="text-sm text-zinc-500">No links yet</p>
          )
        }          
      </div>
      
      <Button onClick={toggleIsCreateLinkModalOpen} variant="secondary" size="full">
        <Plus className="size-5 text-zinc-400"/>
        Add link
      </Button>

      {isCreateLinkModalOpen && (
        <CreateLinkModal closeModal={toggleIsCreateLinkModalOpen}/>
      )}
    </section>
  )
}