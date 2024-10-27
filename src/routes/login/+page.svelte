<script>
	import { post } from '$lib/services/api';

	let email = '';
	let password = '';

	let login = async () => {
		const { accessToken, user } = await post('auth/login', {
			email,
			password
		});
	};
</script>

<div class="max-w-[600px] mx-auto bg-white p-8 rounded flex flex-col gap-y-4">
	<input placeholder="email@email.com" class="w-full" type="email" bind:value={email} />
	<input placeholder="password" class="w-full" type="password" bind:value={password} />

	<button on:click={login}>Log In</button>
</div>
