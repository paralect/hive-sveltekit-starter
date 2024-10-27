import * as socketIoService from '$lib/services/socketIoService.js';

import { writable } from 'svelte/store';

const currentUserStore = writable(null);

socketIoService.on('user:updated', (user) => {
  currentUserStore.set(user);
});

export let isLoading = writable(false);

export default currentUserStore;
