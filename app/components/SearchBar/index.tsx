import React, { useCallback, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, TouchableOpacity } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

import { SearchBarProps } from './search-bar.props';
import { styles } from './search-bar.styles';
import { DefaultTextInput } from '../DefaultTextInput';
import { COLORS } from '../../utils/colors';
import { EXTENDED_HIT_SLOP } from '../../utils/constants';

export const SearchBar: React.FC<SearchBarProps> = ({
  onFocus: onFocusProp,
  onBlur: onBlurProp,
  style: propStyle,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);

  const onPress = useCallback(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const onCancelPress = useCallback(() => {
    inputRef.current?.clear();
    inputRef.current?.blur();
  }, [inputRef]);

  const onFocus = useCallback(
    (e) => {
      setIsFocused(true);
      onFocusProp && onFocusProp(e);
    },
    [setIsFocused, onFocusProp],
  );

  const onBlur = useCallback(
    (e) => {
      setIsFocused(false);
      onBlurProp && onBlurProp(e);
    },
    [setIsFocused, onBlurProp],
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <TouchableOpacity onPress={onPress} style={styles.searchContainer}>
        <FontAwesomeIcon name="search" size={20} color={COLORS.SILVER} />
        <DefaultTextInput
          ref={inputRef}
          focusable={false}
          placeholder="Search"
          returnKeyType="search"
          // blurOnSubmit={false}
          {...rest}
          onFocus={onFocus}
          onBlur={onBlur}
          style={[styles.input, propStyle]}
        />
        {isFocused && (
          <TouchableOpacity onPress={onCancelPress} hitSlop={EXTENDED_HIT_SLOP}>
            <IoniconsIcon name="close-circle" size={20} color={COLORS.SILVER} />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};
