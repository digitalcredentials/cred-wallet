import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';

import { MergedStackParams } from '../../navigation/stacks';

type NavigationProps = StackNavigationProp<MergedStackParams, 'Settings'>;
type RouteProps = StackScreenProps<MergedStackParams, 'Settings'>;

export interface ISettingsScreenProps extends NavigationProps, RouteProps {}
