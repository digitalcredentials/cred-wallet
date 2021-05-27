import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';

import { RootParams } from '../../navigation/root-navigator';

type NavigationProps = StackNavigationProp<RootParams, 'Pin'>;
type RouteProps = StackScreenProps<RootParams, 'Pin'>;

export interface IPinScreenProps extends NavigationProps, RouteProps {}
