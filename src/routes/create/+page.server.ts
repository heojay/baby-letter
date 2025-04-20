import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase, safeGetSession } }) => {
  const { session } = await safeGetSession()
  
  // Redirect to login if user is not authenticated
  if (!session) {
    throw redirect(303, '/login');
  }

  // Fetch the user's profile from the database
  const { data: profile } = await supabase
  .from('profiles')
  .select(`username, full_name`)
  .eq('id', session.user.id)
  .single()

  return {
    profile,
    session,
  };
};
