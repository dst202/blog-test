'use client';

import { useSearchParams } from 'next/navigation';

export function SubscriptionMessage() {
  const searchParams = useSearchParams();

  const error = searchParams?.get('error');
  const message = searchParams?.get('message');

  console.log(error, message, 'error message');
  return (
    <>
      {message && <p style={{ color: error ? 'red' : 'green' }}>{message}</p>}
    </>
  );
}
