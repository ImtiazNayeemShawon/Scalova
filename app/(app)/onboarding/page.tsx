import { redirect } from 'next/navigation';
import { APP_ROUTES } from '@/lib/app-routes';

export default function OnboardingIndexPage() {
  redirect(APP_ROUTES.onboarding.connect);
}
