export interface VerifyPanelProps {
  onVerifySuccess: () => void;
}

export interface CipherRowProps {
  ciphers: number[];
  biometricType?: string | null;
  isDisabled: boolean;
  onCipherPress: (cipher: number) => void;
  onRemovePress?: () => void;
  onBiometricPress?: () => void;
}
