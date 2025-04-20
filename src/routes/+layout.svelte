<script>
  import { page } from '$app/state';
  import { invalidate, goto } from '$app/navigation';
  import { authStore } from '$lib/stores/auth.svelte';
  import "../app.css";
  
  let { children } = $props();
  
  $effect(() => {
    const {
      data: { subscription },
    } = page.data.supabase.auth.onAuthStateChange(() => {
      invalidate('supabase:auth');
    });

    // Update user store when auth state changes
    authStore.isLoading = false;
    if (page.data.session) {
      authStore.user = page.data.session.user;
    } else {
      authStore.user = null;
    }

    return () => subscription.unsubscribe();
  });
</script>

<main>
  <header>
    <h1 class="text-3xl font-bold">
      <a href="/" style="text-decoration: none; color: inherit;">Baby Newsletter</a>
    </h1>
    <div class="flex gap-4">
      {#if authStore.isLoading}
        <p>Loading...</p>
      {:else if authStore.user}
        <button 
          onclick={async () => {
            await page.data.supabase.auth.signOut();
            authStore.user = null;
            goto('/');
          }}
          class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Sign out
        </button>
      {:else}
        <a href="/login" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Log in</a>
      {/if}
    </div>
  </header>
  {@render children()}
</main>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #f8f9fa;
  }
</style>
