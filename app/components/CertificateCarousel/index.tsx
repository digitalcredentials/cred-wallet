import React, { useCallback, useRef, useState } from 'react';
import { Dimensions, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { ICertificate } from '../../utils/types';
import { CertificateItem } from '../CertificateItem';
import { CertificateCarouselProps } from './certificate-carousel.props';
import { styles } from './certificate-carousel.styles';

const ITEM_WIDTH = Dimensions.get('window').width * 0.8;
const SLIDER_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SLIDER_WIDTH / 5;
const INACTIVE_SLIDE_SCALE = 0.85;

export const CertificateCarousel: React.FC<CertificateCarouselProps> = ({
  certificates,
  issuer,
}) => {
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const carouselRef = useRef(null);

  const renderItem = useCallback(
    ({ item }: { item: ICertificate }) => (
      <CertificateItem certificate={item} issuer={issuer} />
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        data={certificates}
        enableMomentum
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideScale={INACTIVE_SLIDE_SCALE}
        swipeThreshold={SWIPE_THRESHOLD}
        onSnapToItem={setActiveDotIndex}
        style={styles.carouselContainer}
      />
      <Pagination
        dotsLength={certificates.length}
        activeDotIndex={activeDotIndex}
        dotStyle={styles.dot}
        inactiveDotOpacity={1}
        dotContainerStyle={styles.dotContainer}
        inactiveDotStyle={styles.inactiveDot}
      />
    </View>
  );
};
