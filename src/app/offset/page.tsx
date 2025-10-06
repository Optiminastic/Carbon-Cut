import { performOffsetCheck } from '@/actions/OffSetCheck';
import { getServerSideUser } from '@/utils/server-auth';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
const OffsetClientComponent = dynamic(() => import('./OffsetClientComponent'));

const page = async () => {
  const { user, isAuthenticated } = await getServerSideUser();

  if (!isAuthenticated || !user) {
    redirect(`/signup?redirectTo=/offset`);
  }

  const hasMarketSelection = await performOffsetCheck(user.email);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OffsetClientComponent
        user={user}
        hasMarketSelection={hasMarketSelection}
      />
    </Suspense>
  );
};

export default page;