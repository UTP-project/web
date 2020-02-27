import React from 'react';
import {
  Paper,
  IconButton,
  Icon,
  InputBase,
  Divider,
  makeStyles,
  createStyles,
  Theme,
  Tooltip,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    input: {
      flex: 1,
      marginLeft: theme.spacing(1),
    },
    divider: {
      height: 30,
    },
  })
);

const SearchBar: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.root} component="form">
        <InputBase
          className={classes.input}
          placeholder="Discovery your travel plan"
        />
        <Divider className={classes.divider} orientation="vertical" />
        <Tooltip title="Search">
          <IconButton type="submit">
            <Icon>search</Icon>
          </IconButton>
        </Tooltip>
      </Paper>
    </>
  );
};

export default SearchBar;
