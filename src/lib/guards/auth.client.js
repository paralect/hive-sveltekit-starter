import cookie from 'cookie';
import { browser } from '$app/environment';
import currentUser, { isLoading as isUserLoading } from '$lib/stores/currentUser';
import apiServerSide from '$lib/apiServerSide';

let user;

currentUser.subscribe((value) => (user = value));

export default async ({ url }, title = 'Hive') => {
  if (browser && !user) {
    const cookies = cookie.parse(document.cookie);
    let accessToken = cookies.access_token;

    if (!user && accessToken) {
      let api = apiServerSide({ accessToken });
      isUserLoading.set(true);

      try {
        user = await api.get('users/current');
        console.log('user', user);
        user.username = user.username || 'igor.krasnik';
        currentUser.set(user);
      } catch (err) {
        console.log('err', err);
      }
    } else {
      isUserLoading.set(false);
      currentUser.set(null);
    }

    isUserLoading.set(false);
  }

  return {
    ogTitle: title
  };
};