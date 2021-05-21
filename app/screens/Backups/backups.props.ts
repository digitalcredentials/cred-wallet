import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';

import { MergedStackParams } from '../../navigation/stacks';

type NavigationProps = StackNavigationProp<MergedStackParams, 'Backups'>;
type RouteProps = StackScreenProps<MergedStackParams, 'Backups'>;

export interface IBackupsScreenProps extends NavigationProps, RouteProps {}
