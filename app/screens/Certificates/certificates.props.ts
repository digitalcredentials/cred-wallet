import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import { MergedStackParams } from '../../navigation/stacks';

type NavigationProps = StackNavigationProp<MergedStackParams, 'Certificates'>;
type RouteProps = StackScreenProps<MergedStackParams, 'Certificates'>;

export interface CertificatesScreenProps extends NavigationProps, RouteProps {}
