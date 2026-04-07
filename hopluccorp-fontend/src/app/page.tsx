'use client';

import { redirect } from 'next/navigation';

/**
 * Root page - Redirects to Vietnamese homepage
 * This ensures that visitors always go to /vi by default
 */
export default function RootPage() {
  redirect('/vi');
}
