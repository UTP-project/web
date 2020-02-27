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
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
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

const MultiInput: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search your destination"
        />
        <IconButton>
          <Icon>search</Icon>
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton>
          <Icon>add_location</Icon>
        </IconButton>
      </Paper>
    </>
  );
};

export default MultiInput;
