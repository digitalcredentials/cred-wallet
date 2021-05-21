import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';

import { RootParams } from '../../navigation/root-navigator';

type NavigationProps = StackNavigationProp<RootParams, 'Onboarding'>;
type RouteProps = StackScreenProps<RootParams, 'Onboarding'>;

export interface IOnboardingScreenProps extends NavigationProps, RouteProps {}
