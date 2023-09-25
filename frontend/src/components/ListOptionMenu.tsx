import { useState, MouseEvent } from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import FormControl from "@mui/material/FormControl";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import {
  FilterTypes,
  SortTypes,
  useListOption,
} from "../context/ListOptionContext";

export const ListOptionMenu = () => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLButtonElement>(
    null
  );
  const { state, dispatch } = useListOption();
  const open = !!menuAnchorEl;
  const sorter = {
    [SortTypes.PRIORITY]: {
      name: "Priority",
      tag: "priority",
      paramName: "priority",
    },
    [SortTypes.CREATION_DATE]: {
      name: "Creation Date",
      tag: "creation-date",
      paramName: "creationDate",
    },
    [SortTypes.DUE_DATE]: {
      name: "Due Date",
      tag: "due-date",
      paramName: "dueDate",
    },
  };

  const handleMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = (type?: SortTypes) => {
    if (type) {
      dispatch({
        type: "update-options",
        payload: {
          ...state,
          sort: {
            by: type,
            isAscendingOrder:
              state.sort.by === type
                ? !state.sort.isAscendingOrder
                : state.sort.isAscendingOrder,
          },
        },
      });
    }
    setMenuAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container justifyContent="flex-end">
        <Box
          sx={{
            margin: "8px",
          }}
        >
          <Button
            aria-controls={open ? "sort menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleMenuClick}
          >
            Sort By: {sorter[state.sort.by].name}
          </Button>
          <Menu
            anchorEl={menuAnchorEl}
            open={open}
            onClose={() => handleMenuClose()}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {(Object.keys(sorter) as SortTypes[]).map((key) => (
              <MenuItem
                onClick={() => handleMenuClose(key)}
                id={sorter[key].tag}
                key={sorter[key].tag}
              >
                <ListItemIcon>
                  {state?.sort.by === key &&
                    (state?.sort.isAscendingOrder ? (
                      <ArrowDownwardIcon />
                    ) : (
                      <ArrowUpwardIcon />
                    ))}
                </ListItemIcon>
                {sorter[key].name}
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel>Filter</InputLabel>
          <Select
            labelId="demo-select-small-label"
            label="filter"
            name="filter"
            value={state.filter}
            onChange={(e) =>
              dispatch({
                type: "update-options",
                payload: {
                  ...state,
                  filter: e.target.value as FilterTypes,
                },
              })
            }
          >
            <MenuItem value={FilterTypes.ALL}>All</MenuItem>
            <MenuItem value={FilterTypes.PENDING}>Pending</MenuItem>
            <MenuItem value={FilterTypes.COMPLETED}>Completed</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Box>
  );
};
