import { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { COLUMNS_CONFIG, DATA_GRID_IN_SPANISH } from './events-table.config';
import { fetchEventById } from '../../hooks/requests';

export default function EventsTable({ visibleFields, ...props }) {
  const [pageSize, setPageSize] = useState(10);

  const initialState = COLUMNS_CONFIG.reduce(
    (state, column) => {
      // Hide the columns only at mounting time
      const isVisible = visibleFields.includes(column.field);
      return {
        ...state,
        columns: {
          ...state.columns,
          columnVisibilityModel: {
            ...state.columns.columnVisibilityModel,
            [column.field]: isVisible,
          },
        },
      };
    },
    { columns: { columnVisibilityModel: {} } }
  );

  const openEventModal = async eventId => {
    const event = await fetchEventById(eventId);
    console.log(event);
  };

  return (
    <>
      <DataGrid
        {...props}
        columns={COLUMNS_CONFIG}
        initialState={initialState}
        sx={{ padding: '2rem' }}
        autoHeight
        disableColumnFilter
        disableDensitySelector
        isCellEditable={params => false}
        onRowClick={({row: eventData}) => console.log(eventData)}
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
            printOptions: { disableToolbarButton: true },
          },
        }}
        pageSize={pageSize}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 25, 50]}
        localeText={DATA_GRID_IN_SPANISH}
      />
      
    </>
  );
}
