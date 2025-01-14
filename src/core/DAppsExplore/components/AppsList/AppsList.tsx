import React, { FC, memo, useMemo } from 'react';
import { AppItem } from '../AppItem/AppItem';
import { openDAppBrowser } from '$navigation';
import * as S from './AppsList.style';
import { APPS_ITEMS_IN_ROW } from '$core/DAppsExplore/constants';
import { Icon } from '$uikit';
import { AppItemSkeleton } from '../AppItem/AppItemSkeleton';
import { useTranslator } from '$hooks';

interface Props {
  title: string;
  data: { name: string; icon: string; url: string }[];
  rowsLimit?: number;
  moreEnabled?: boolean;
  skeleton?: boolean;
  onMorePress?: () => void;
  onItemLongPress?: (url: string) => void;
}

const AppsListComponent: FC<Props> = (props) => {
  const { title, data, rowsLimit, moreEnabled, skeleton, onMorePress, onItemLongPress } =
    props;

  const t = useTranslator();

  const skeletonCount = APPS_ITEMS_IN_ROW * (rowsLimit || 1);

  const apps = useMemo(() => {
    if (rowsLimit) {
      const end = APPS_ITEMS_IN_ROW * rowsLimit;
      return data.slice(0, moreEnabled ? end - 1 : end);
    }

    return data;
  }, [data, moreEnabled, rowsLimit]);

  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.List>
        {skeleton ? (
          <>
            {Array(skeletonCount)
              .fill(null)
              .map((_, index) => (
                <AppItemSkeleton key={`AppItemSkeleton_${index}`} index={index} />
              ))}
          </>
        ) : (
          <>
            {apps.map((app, index) => (
              <AppItem
                key={`${app.name}_${app.url}`}
                index={index}
                name={app.name}
                iconUri={app.icon}
                onPress={() => openDAppBrowser(app.url)}
                onLongPress={() => onItemLongPress?.(app.url)}
              />
            ))}
            {moreEnabled ? (
              <AppItem
                name={t('browser.explore_all')}
                icon={
                  <S.MoreIconContainer>
                    <Icon name="ic-chevron-right-16" color="foregroundPrimary" />
                  </S.MoreIconContainer>
                }
                onPress={onMorePress}
              />
            ) : null}
          </>
        )}
      </S.List>
    </S.Container>
  );
};

export const AppsList = memo(AppsListComponent);
