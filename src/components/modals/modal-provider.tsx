'use client';

import React from 'react';
import dynamic from 'next/dynamic';

import useModalStore from '@/stores/useModalStore';

const RequiredLoginModal = dynamic(() => import('./required-login'), { ssr: false });

function ModalProvider() {
  const { type } = useModalStore();

  const renderModal = React.useMemo(() => {
    switch (type) {
      case 'RequiredLogin': {
        return <RequiredLoginModal />;
      }

      default: {
        return null;
      }
    }
  }, [type]);

  return <>{renderModal}</>;
}

export default ModalProvider;
