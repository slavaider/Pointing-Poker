import React from 'react';
import { WithRouterProps } from 'next/dist/client/with-router';
import Settings from '../../components/Pages/Settings';

const SettingsPage: React.FC<WithRouterProps> = () => {
  return <Settings />;
};

export default SettingsPage;
