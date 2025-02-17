import React, { FC, memo } from 'react';
import { useTranslator } from '$hooks';
import { useConnectedAppsList } from '$store';
import { AppsList } from '../AppsList/AppsList';
import { Alert } from 'react-native';
import { TonConnect } from '$tonconnect';

const ConnectedAppsComponent: FC = () => {
  const t = useTranslator();

  const connectedApps = useConnectedAppsList();

  if (connectedApps.length > 0) {
    return (
      <AppsList
        title={t('browser.connected_title')}
        data={connectedApps}
        onItemLongPress={(url) =>
          Alert.alert(
            'Are you sure want to remove this app?',
            'This will destroy link between your wallet and app, but you can always try to connect again.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Remove',
                style: 'destructive',
                onPress: () => TonConnect.disconnect(url),
              },
            ],
          )
        }
      />
    );
  }

  return null;
};

export const ConnectedApps = memo(ConnectedAppsComponent);
