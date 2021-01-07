import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import { MergedStackParams } from '../../navigation/stacks';

type NavigationProps = StackNavigationProp<MergedStackParams, 'CreateBackup'>;
type RouteProps = StackScreenProps<MergedStackParams, 'CreateBackup'>;

export interface CreateBackupScreenProps extends NavigationProps, RouteProps {}
