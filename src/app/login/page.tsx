import { Suspense } from 'react';
import LoginForm from './LoginForm';

export const dynamic = 'force-dynamic';

function LoginFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617]">
      <div className="w-full max-w-md p-8 border border-white/10 rounded-[32px] animate-pulse bg-white/[0.02]" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  );
}
