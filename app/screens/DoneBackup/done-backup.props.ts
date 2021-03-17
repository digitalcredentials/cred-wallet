import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import { MergedStackParams } from '../../navigation/stacks';

type NavigationProps = StackNavigationProp<MergedStackParams, 'DoneBackup'>;
type RouteProps = StackScreenProps<MergedStackParams, 'DoneBackup'>;

export interface DoneBackupScreenProps extends NavigationProps, RouteProps {}
