import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { Query } from "../query";

export const EventsFilter = (props) => {
  const { mode, onModeChange, onQueryChange, query } = props;

  return (
    <Box
      sx={{
        alignItems: "center",
        display: "grid",
        gap: 2,
        gridTemplateColumns: {
          sm: "1fr auto",
          xs: "auto",
        },
        justifyItems: "flex-start",
        p: 3,
      }}
    >
      <Query
        onChange={onQueryChange}
        sx={{
          order: {
            sm: 2,
            xs: 1,
          },
        }}
        value={query}
      />
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          order: 3,
        }}
      ></Box>
    </Box>
  );
};

EventsFilter.defaultProps = {
  mode: "table",
};

EventsFilter.propTypes = {
  mode: PropTypes.oneOf(["table", "dnd"]),
  onModeChange: PropTypes.func,
  onQueryChange: PropTypes.func,
  query: PropTypes.string,
};
