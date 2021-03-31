import React, { useCallback } from 'react';

import { WidgetCard } from 'Components/Cards';

import Summarizer from './summarizer';

const AccountWidget = ({ id, data, config, onDelete, onPin, onEdit }) => {
  const { fields, meta } = config;

  const renderSubheader = useCallback(() => {
    return ' ';
  }, []);

  const renderSumarization = useCallback(() => {
    if (data && data.length) {
      return <Summarizer columns={fields} meta={meta} rows={data} />;
    }
    return null;
  }, [data, fields]);

  return (
    <WidgetCard
      id={id}
      onDelete={onDelete}
      onPin={onPin}
      config={config}
      subHeader={renderSubheader()}
    >
      {renderSumarization()}
    </WidgetCard>
  );
};

export default AccountWidget;
