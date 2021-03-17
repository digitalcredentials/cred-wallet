import { TextInputProps, TextInput } from 'react-native';

export interface DefaultTextInputProps extends TextInputProps {
  ref?: React.RefObject<TextInput> | null;
}
