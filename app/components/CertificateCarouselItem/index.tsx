import React from 'react';
import { View } from 'react-native';

import { CertificateCarouselItemProps } from './certificate-carousel-item.props';
import { styles } from './certificate-carousel-item.styles';

export const CertificateCarouselItem: React.FC<CertificateCarouselItemProps> = () => (
  <View style={styles.container}></View>
);
