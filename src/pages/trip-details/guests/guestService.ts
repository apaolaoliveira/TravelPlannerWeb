import { FormEvent } from 'react';
import { api } from '../../../lib/axios';

export const guestService = {
  async inviteNewGuest(event: FormEvent<HTMLFormElement>, tripId: string | undefined) {
    event.preventDefault();
    if (!tripId) return;
  
    const data = new FormData(event.currentTarget);

    const name = data.get('name')?.toString();
    const email = data.get('email')?.toString();
    
    await api.post(`/trips/${tripId}/invite`, {
      name,
      email,
    });

    window.document.location.reload();
  },
}