import React, { useCallback, useState, useEffect } from 'react';

import { WidgetCard } from 'Components/Cards';
import { CollapsibleTable } from 'Components/Table';
import _ from 'lodash';
import { DEVICE_OPERATION_ID } from 'Redux/data_layout';
import { formatDate } from 'Utils';

const TableWidget = ({ id, data, config, onDelete, onPin, lastOperation }) => {
  const { table, meta } = config;
  const withRank = !!meta.withRank;
  const hasTimestamp = !meta.removeTimestamp;
  const [subHeader, setSubHeader] = useState();

  useEffect(() => {
    if (lastOperation.length === undefined) return;
    if (!meta) return;

    let calcTs;
    let ts;
    lastOperation.forEach(lin => {
      if (lin[`${DEVICE_OPERATION_ID}${meta.timestampField}`]) {
        calcTs = lin[`${DEVICE_OPERATION_ID}${meta.timestampField}`];
        ts = lin.timestamp;
      }
    });
    if (calcTs === undefined) {
      setSubHeader('   ');
      return;
    }
    setSubHeader(
      `Dados consolidados as ${formatDate(ts, 'HH:mm:ss')} para ${formatDate(
        calcTs,
        'HH:mm:ss - DD/MM/YYYY',
      )} `,
    );
  }, [meta, lastOperation]);

  const renderTable = useCallback(() => {
    if (!_.isEmpty(data)) {
      return (
        <CollapsibleTable
          withRank={withRank}
          columns={table}
          meta={meta}
          rows={data}
          hasTimestamp={hasTimestamp}
        />
      );
    }
    return null;
  }, [data, meta, table, withRank, hasTimestamp]);

  return (
    <WidgetCard
      id={id}
      onDelete={onDelete}
      onPin={onPin}
      config={config}
      subHeader={subHeader}
    >
      {renderTable()}
    </WidgetCard>
  );
};

export default TableWidget;
