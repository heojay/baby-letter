import type { User } from "@supabase/supabase-js";

export const authStore = $state({
	user: null as User | null,
	isLoading: true,
});
