import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';

import { MergedStackParams } from '../../navigation/stacks';

type NavigationProps = StackNavigationProp<MergedStackParams, 'About'>;
type RouteProps = StackScreenProps<MergedStackParams, 'About'>;

export interface IAboutScreenProps extends NavigationProps, RouteProps {}
