import { AccessibilityInfo } from 'react-native';

export const isScreenReaderEnabled = async () => {
  return AccessibilityInfo.isScreenReaderEnabled();
};
