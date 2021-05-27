import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';

import { MergedStackParams } from '../../navigation/stacks';

type NavigationProps = StackNavigationProp<MergedStackParams, 'QRScanner'>;
type RouteProps = StackScreenProps<MergedStackParams, 'QRScanner'>;

export interface IQRScannerScreenProps extends NavigationProps, RouteProps {}
