<script>
import { goto } from "$app/navigation";
import { page } from "$app/state";
import { authStore } from "$lib/stores/auth.svelte";

let loading = $state(false);
let error = $state(null);

$effect(() => {
	// Redirect if already logged in
	if (authStore.user) {
		goto("/");
	}
});

async function signInWithGoogle() {
	try {
		loading = true;
		error = null;

		const { data, error: signInError } =
			await page.data.supabase.auth.signInWithOAuth({
				provider: "google",
				options: {
					redirectTo: `${window.location.origin}/auth/callback`,
				},
			});

		if (signInError) throw signInError;
	} catch (err) {
		console.error("Error signing in with Google:", err);
		error = err.message || "로그인 중 오류가 발생했습니다.";
	} finally {
		loading = false;
	}
}
</script>

<div class="flex justify-center items-center min-h-[60vh]">
  <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-center">로그인</h2>
    
    {#if error}
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
        <p>{error}</p>
      </div>
    {/if}
    
    <div class="space-y-4">
      <button 
        onclick={signInWithGoogle}
        disabled={loading}
        class="w-full flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
          <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
          <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
          <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
        </svg>
        {loading ? '로그인 중...' : 'Google로 로그인'}
      </button>
    </div>
  </div>
</div>