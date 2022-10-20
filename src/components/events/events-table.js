import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

function isOverflown(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

const GridCellExpand = React.memo(props => {
  const { width, value } = props;
  const wrapper = React.useRef(null);
  const cellDiv = React.useRef(null);
  const cellValue = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showFullCell, setShowFullCell] = React.useState(false);
  const [showPopper, setShowPopper] = React.useState(false);

  const handleMouseEnter = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current);
    setShowPopper(isCurrentlyOverflown);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);
  };

  const handleMouseLeave = () => {
    setShowFullCell(false);
  };

  React.useEffect(() => {
    if (!showFullCell) {
      return undefined;
    }

    function handleKeyDown(nativeEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        setShowFullCell(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setShowFullCell, showFullCell]);

  return (
    <Box
      ref={wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        alignItems: 'center',
        lineHeight: '24px',
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
      }}
    >
      <Box
        ref={cellDiv}
        sx={{
          height: '100%',
          width,
          display: 'block',
          position: 'absolute',
          top: 0,
        }}
      />
      <Box
        ref={cellValue}
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {value}
      </Box>
      {showPopper && (
        <Popper
          open={showFullCell && anchorEl !== null}
          anchorEl={anchorEl}
          style={{ width }}
        >
          <Paper
            elevation={1}
            style={{ minHeight: wrapper.current.offsetHeight - 3 }}
          >
            <Typography variant='body2' style={{ padding: 8 }}>
              {value}
            </Typography>
          </Paper>
        </Popper>
      )}
    </Box>
  );
});

function renderCellExpand(params) {
  return (
    <GridCellExpand
      value={params.value || ''}
      width={params.colDef.computedWidth}
    />
  );
}

// Change all placeholders to Spanish language.
const DATA_GRID_IN_SPANISH = {
  // Root
  noRowsLabel: 'No hay eventos.',
  noResultsOverlayLabel: 'No se encontro ningun evento.',
  errorOverlayDefaultLabel: 'Ha ocurrido un error al cargar los eventos.',
  // Columns selector toolbar button text
  toolbarColumns: 'Columnas',
  toolbarColumnsLabel: 'Selecciona las columnas',
  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'Buscar…',
  toolbarQuickFilterLabel: 'Buscar',
  toolbarQuickFilterDeleteIconLabel: 'Limpiar',
  // Export selector toolbar button text
  toolbarExport: 'Exportar',
  toolbarExportLabel: 'Exportar',
  toolbarExportCSV: 'Descargar en CSV',
  toolbarExportPrint: 'Imprimir',
  toolbarExportExcel: 'Descargar en Excel',
  // Columns panel text
  columnsPanelTextFieldLabel: 'Buscar columna',
  columnsPanelTextFieldPlaceholder: 'Titulo de la Columna',
  columnsPanelDragIconLabel: 'Reordenar columna',
  columnsPanelShowAllButton: 'Mostrar todos',
  columnsPanelHideAllButton: 'Ocultar todos',
  // Column menu text
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Mostrar columnas',
  columnMenuFilter: 'Filtrar',
  columnMenuHideColumn: 'Ocultar',
  columnMenuUnsort: 'Desordenar',
  columnMenuSortAsc: 'Ordenar por ASC',
  columnMenuSortDesc: 'Ordenar por DESC',
  // Total row amount footer text
  footerTotalRows: 'Filas:',
  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,
};

const columnsConfig = [
  {
    field: 'id',
    headerName: 'ID',
    type: 'number',
    width: 100,
    valueFormatter: params => params.value ?? 'N/A',
    // renderCell: renderCellExpand,
  },
  {
    field: 'type',
    headerName: 'Tipo',
    type: 'string',
    width: 200,
    valueFormatter: params => params.value ?? 'N/A',
    renderCell: renderCellExpand,
  },
  {
    field: 'name',
    headerName: 'Proyecto',
    type: 'string',
    width: 200,
    valueFormatter: params => params.value ?? 'N/A',
    renderCell: renderCellExpand,
  },
  {
    field: 'organization',
    headerName: 'Organizacion',
    type: 'string',
    width: 150,
    valueFormatter: params => params.value ?? 'N/A',
    renderCell: renderCellExpand,
  },
  {
    field: 'overseers',
    headerName: 'Responsables',
    type: 'string',
    width: 160,
    valueGetter: params =>
      params.value[0] +
      (params.value.length > 1 ? ` +${params.value.length - 1}` : ''),
    valueFormatter: params => params.value ?? 'N/A',
    // renderCell: renderCellExpand,
  },
  {
    field: 'goal',
    headerName: 'Objetivo',
    type: 'string',
    width: 200,
    valueFormatter: params => params.value ?? 'N/A',
    renderCell: renderCellExpand,
  },
  {
    field: 'participants',
    headerName: 'Participantes',
    type: 'number',
    width: 120,
    valueGetter: params => params.value.length,
    valueFormatter: params => params.value ?? 'N/A',
    // renderCell: renderCellExpand,
  },
  {
    field: 'startDate',
    headerName: 'Fecha de Inicio',
    type: 'date',
    width: 180,
    valueFormatter: params => params.value ?? null,
    // renderCell: renderCellExpand,
  },
  {
    field: 'endDate',
    headerName: 'Fecha de Culminacion',
    type: 'date',
    width: 180,
    valueFormatter: params => params.value ?? null,
    // renderCell: renderCellExpand,
  },
  {
    field: 'observations',
    headerName: 'Observaciones',
    type: 'string',
    width: 200,
    valueFormatter: params => params.value ?? 'N/A',
    renderCell: renderCellExpand,
  },
  {
    field: 'status',
    headerName: 'Status',
    type: 'string',
    width: 150,
    valueFormatter: params => params.value ?? 'N/A',
    // renderCell: renderCellExpand,
  },
];

export default function EventsTable({ visibleFields, ...props }) {
  const [pageSize, setPageSize] = React.useState(10);

  const initialState = columnsConfig.reduce((state, column) => {
    // Hide the columns only at mounting time
    const isVisible = visibleFields.includes(column.field);
    return { 
      ...state, 
      columns: {
        ...state.columns,
        columnVisibilityModel: {
          ...state.columns.columnVisibilityModel, 
          [column.field]: isVisible 
        }
      } 
    };
  }, { columns: { columnVisibilityModel: {} } });

  return (
    <DataGrid
      {...props}
      columns={columnsConfig}
      initialState={initialState}
      sx={{ padding: '2rem' }}
      autoHeight
      disableColumnFilter
      disableDensitySelector
      isCellEditable={params => false}
      components={{ Toolbar: GridToolbar }}
      componentsProps={{
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 },
        },
      }}
      pageSize={pageSize}
      onPageSizeChange={newPageSize => setPageSize(newPageSize)}
      rowsPerPageOptions={[10, 25, 50]}
      localeText={DATA_GRID_IN_SPANISH}
    />
  );
}
