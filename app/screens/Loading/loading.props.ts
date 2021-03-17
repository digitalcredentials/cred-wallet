import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import { RootParams } from '../../navigation/root-navigator';

type NavigationProps = StackNavigationProp<RootParams, 'Loading'>;
type RouteProps = StackScreenProps<RootParams, 'Loading'>;

export interface LoadingScreenProps extends NavigationProps, RouteProps {}
