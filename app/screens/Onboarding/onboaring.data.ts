import { IMAGES } from '../../assets';
import { ISwiperItem } from '../../utils/types';

export const SWIPER_ITEMS: ISwiperItem[] = [
  {
    id: '1',
    image: IMAGES.BUSINESS_AND_FINANCE,
    title: 'Create a pin',
    description: `Come up with your  ${'\n'} personal PIN code to enter `,
  },
  {
    id: '2',
    image: IMAGES.QR_CODE,
    title: 'Scan QR code',
    description: `Point the camera at the  ${'\n'} QR code to add diploma`,
  },
  {
    id: '3',
    image: IMAGES.FOLDER,
    title: `All diplomas ${'\n'}are here`,
    description: `Point the camera at the  ${'\n'} QR code to add diploma`,
  },
  {
    id: '4',
    image: IMAGES.CLOUD_STORAGE,
    title: 'File backup',
    description: `The ability to back up ${'\n'} data, which we will save`,
  },
];
