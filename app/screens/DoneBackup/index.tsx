import React, { useMemo } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import moment from 'moment';

import { IDoneBackupScreenProps } from './done-backup.props';
import { styles } from './done-backup.styles';

export const DoneBackupScreen: React.FC<IDoneBackupScreenProps> = ({
  navigation,
  route,
}) => {
  const backupInfo = useMemo(() => route.params.backupInfo, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Done</Text>
        <Text style={styles.dateTitle}>Date when you saved</Text>
        <Text style={styles.date}>
          {moment(backupInfo.date).format('DD MMMM YYYY')}
        </Text>
        <View style={styles.separator} />
        <TouchableOpacity
          style={styles.okButtonContainer}
          onPress={navigation.goBack}
        >
          <Text style={styles.okButtonText}>Yeap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
