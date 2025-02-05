import { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { COLUMNS_CONFIG, DATA_GRID_IN_SPANISH } from './events-table.config';
import UpdateEventModal from '../modals/events/update-event-modal';

const DEFAULT_EVENT_DATA = {
  start: '',
  end: '',
  organization: '',
  status: '',
  type: '',
  title: '',
  overseers: [],
  participants: [],
  goal: null,
  observations: null,
}

export default function EventsTable({ visibleFields, updateEvent, ...props }) {
  const [pageSize, setPageSize] = useState(10);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [eventToUpdate, setEventToUpdate] = useState(DEFAULT_EVENT_DATA);

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

  const openEventUpdateModal = event => {
    setOpenUpdateModal(true);
    setEventToUpdate(event);
  }

  const closeEventUpdateModal = () => setOpenUpdateModal(false);

  return (
    <>
      <DataGrid
        {...props}
        columns={COLUMNS_CONFIG}
        initialState={initialState}
        sx={{
          padding: '2rem',
          '& .MuiDataGrid-row:hover': { cursor: 'pointer' }
        }}
        autoHeight
        disableColumnFilter
        disableDensitySelector
        isCellEditable={params => false}
        onRowClick={({ row: eventData }) => openEventUpdateModal(eventData)}
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

      {/* On Event Click show modal */}
      <UpdateEventModal updateEvent={updateEvent} eventData={eventToUpdate} open={openUpdateModal} closeModal={closeEventUpdateModal} />
    </>
  );
}
