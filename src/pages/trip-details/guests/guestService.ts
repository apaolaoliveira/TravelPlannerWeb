import { FormEvent } from 'react';
import { api } from '../../../lib/axios.ts';

export const guestService = {
  async inviteNewGuest(
    event: FormEvent<HTMLFormElement>, 
    tripId: string | undefined,
    guestName: string,
    guestEmail: string,
  ) {
    event.preventDefault();
    if (!tripId) return;
    
    await api.post(`/trips/${tripId}/invite`, {
      name: guestName,
      email: guestEmail,
    });

    window.document.location.reload();
  },

  async editGuest(
    event: FormEvent<HTMLFormElement>, 
    tripId: string | undefined, 
    guestId: string | null,
    guestName: string,
    guestEmail: string,
  ){
    event.preventDefault();
    if(!tripId || !guestId) return;
    
    await api.put(`/trips/${tripId}/participant/${guestId}`, {
      name: guestName,
      email: guestEmail,
    });

    window.document.location.reload();
  },

  async deleteGuest(tripId: string | undefined, guestId: string | null){
    if(!tripId || !guestId) return;
    
    await api.delete(`/trips/${tripId}/participant/${guestId}`);
    window.document.location.reload();
  },
}