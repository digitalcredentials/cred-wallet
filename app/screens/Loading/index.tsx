import React, { useEffect } from 'react';
import { useIsShownOnboarding } from '../../redux/cache';
import { LoadingScreenProps } from './loading.props';

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ navigation }) => {
  const isShownOnboarding = useIsShownOnboarding();

  useEffect(() => {
    isShownOnboarding
      ? navigation.replace('Pin', { isPushed: false })
      : navigation.replace('Onboarding');
  }, [navigation, isShownOnboarding]);

  return null;
};
