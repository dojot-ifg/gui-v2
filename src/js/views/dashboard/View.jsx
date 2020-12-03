import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
<<<<<<< HEAD
import React, { useCallback, useEffect } from 'react';
=======
import React, { useCallback, useState, useEffect } from 'react';
>>>>>>> - Version to cs using Collapsable Table

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import PauseIcon from '@material-ui/icons/Pause';
import PlayIcon from '@material-ui/icons/PlayArrow';
import { DevelopmentContainer } from 'Components/Containers';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { actions as dashboardActions } from 'Redux/dashboard';
import {
  dashboardConfig,
  dashboardData,
  dashboardLayout,
  dashboardSaga,
} from 'Selectors/dashboardSelector';
import { Device as DeviceService } from 'Services';

import { ViewContainer } from '../stateComponents';
import { AccountWidget } from './widget/account';
import { AreaChartWidget } from './widget/areaChart';
import { BarChartWidget } from './widget/barChart';
import { LineChartWidget } from './widget/lineChart';
import { MapWidget } from './widget/map';
import { TableWidget } from './widget/table';
import { CSMapWidget } from './widget/csMap';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const Dashboard = props => {
  const {
    cols,
    rowHeight,
    className,
    layout,
    data,
    configs,
    sagaConfig,
    stopPolling,
    startPolling,
    history,
    changeLayout,
    removeWidget,
    removeWidgetConfig,
    removeWidgetSaga,
    removeWidgetData,
    checkData,
  } = props;

<<<<<<< HEAD
  const { bar, line, area, table, map, csMap } = __CONFIG__;
=======
  console.log('Dashboard', data);
  const { bar, line, area, table, account } = __CONFIG__;
>>>>>>> - Version to cs using Collapsable Table

  const handleClick = useCallback(() => {
    history.push('/dashboard/widget');
  }, [history]);

  const [deviceData, setDeviceData] = useState({});
  console.log('deviceData', deviceData);

  useEffect(() => {
    if (!_.isEmpty(sagaConfig)) {
      startPolling(sagaConfig);
    }
    return () => stopPolling();
  }, [sagaConfig, startPolling, stopPolling]);

  useEffect(() => {
    DeviceService.getAllDevices({ number: 0, size: 9999 }, { label: '' })
      .then(response => {
        const { devices } = response.getDevices;
        const dev = {};
        devices.forEach(aux => {
          dev[aux.id] = aux;
        });
        setDeviceData(dev);
      })
      .catch(error => {
        console.error(error);
      });
    if (_.isEmpty(sagaConfig)) {
      checkData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { t } = useTranslation(['dashboard', 'common']);

  const onLayoutChange = useCallback(
    newLayout => {
      changeLayout(newLayout, configs, sagaConfig);
    },
    [changeLayout, configs, sagaConfig],
  );

  const onRemoveItem = useCallback(
    i => {
      removeWidget(i);
      removeWidgetConfig(i);
      removeWidgetSaga(i);
      removeWidgetData(i);
      stopPolling();
    },
    [
      removeWidget,
      removeWidgetConfig,
      removeWidgetSaga,
      removeWidgetData,
      stopPolling,
    ],
  );

  const onPin = useCallback(
    i => {
      const newArr = _.map(layout, item => {
        const { static: iStatic, ...otherProps } = item;
        return item.i === i ? { static: !iStatic, ...otherProps } : item;
      });
      changeLayout(newArr, configs, sagaConfig);
    },
    [layout, changeLayout, configs, sagaConfig],
  );

  const createElement = useCallback(
    element => {
      const { i } = element;
      const [type] = i.split('/');
      console.log('i', i, type, configs[i]);
      switch (type) {
        case line:
          return (
            <div key={i}>
              <LineChartWidget
                id={i}
                onDelete={onRemoveItem}
                onPin={onPin}
                data={data[i]}
                config={configs[i]}
              />
            </div>
          );
        case area:
          return (
            <div key={i}>
              <AreaChartWidget
                id={i}
                onDelete={onRemoveItem}
                onPin={onPin}
                data={data[i]}
                config={configs[i]}
              />
            </div>
          );
        case bar:
          return (
            <div key={i}>
              <BarChartWidget
                id={i}
                onDelete={onRemoveItem}
                onPin={onPin}
                data={data[i]}
                config={configs[i]}
              />
            </div>
          );
        case table:
          return (
            <div key={i}>
              <TableWidget
                id={i}
                onDelete={onRemoveItem}
                onPin={onPin}
                deviceData={deviceData}
                data={data[i]}
                config={configs[i]}
              />
            </div>
          );
        case account:
          return (
            <div key={i}>
              <AccountWidget
                id={i}
                onDelete={onRemoveItem}
                onPin={onPin}
                data={data[i]}
                config={configs[i]}
              />
            </div>
          );
        case map:
          return (
            <div key={i}>
              <MapWidget
                id={i}
                onDelete={onRemoveItem}
                onPin={onPin}
                data={data[i]}
                config={configs[i]}
              />
            </div>
          );
        case csMap:
          return (
            <div key={i}>
              <CSMapWidget
                id={i}
                onDelete={onRemoveItem}
                onPin={onPin}
                data={data[i]}
                config={configs[i]}
              />
            </div>
          );
        default:
          return (
            <div key={i}>
              <AreaChartWidget id={i} onDelete={onRemoveItem} onPin={onPin} />
            </div>
          );
      }
    },
<<<<<<< HEAD
    [area, bar, configs, line, data, onPin, onRemoveItem, table, map],
=======
    [area, bar, account, configs, line, data, onPin, onRemoveItem, table],
>>>>>>> - Version to cs using Collapsable Table
  );

  const getHeaderContent = useCallback(() => {
    return (
      <>
        <DevelopmentContainer>
          <Button
            style={{ marginLeft: 10 }}
            size='small'
            variant='outlined'
            color='inherit'
            startIcon={<PlayIcon />}
            onClick={() => startPolling(sagaConfig)}
          >
            {t('common:start')}
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            size='small'
            variant='outlined'
            color='inherit'
            startIcon={<PauseIcon />}
            onClick={() => stopPolling()}
          >
            {t('common:stop')}
          </Button>
        </DevelopmentContainer>
        <Button
          style={{ marginLeft: 10 }}
          size='small'
          variant='outlined'
          color='inherit'
          startIcon={<AddIcon />}
          onClick={() => handleClick()}
        >
          {t('common:add')}
        </Button>
      </>
    );
  }, [handleClick, startPolling, stopPolling, sagaConfig]);

  return (
    <ViewContainer headerTitle={t('dashboard:dashboard')} headerContent={null}>
      <ResponsiveReactGridLayout
        cols={cols}
        rowHeight={rowHeight}
        className={className}
        layouts={{ lg: layout }}
        onLayoutChange={onLayoutChange}
        measureBeforeMount={false}
        compactType='vertical'
        verticalCompact
        preventCollision={false}
        draggableHandle='.MuiCardHeader-root'
      >
        {_.map(layout, element => createElement(element))}
      </ResponsiveReactGridLayout>
    </ViewContainer>
  );
};

Dashboard.defaultProps = {
  className: 'layout',
  rowHeight: 30,
  cols: {
    lg: 12,
    md: 12,
    sm: 6,
    xs: 4,
    xxs: 2,
  },
};

Dashboard.propTypes = {
  className: PropTypes.string,
  rowHeight: PropTypes.number,
  cols: PropTypes.any,
};

const mapStateToProps = state => ({
  ...dashboardLayout(state),
  ...dashboardData(state),
  ...dashboardConfig(state),
  ...dashboardSaga(state),
});

const mapDispatchToProps = {
  ...dashboardActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
