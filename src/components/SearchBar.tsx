import React, { useState } from 'react';
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
import { useDebounce } from 'react-use';
import { getInputTips } from '../services/InputTips';

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

  const [keywords, setKeywords] = useState('');

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    console.log(keywords);
  };

  useDebounce(
    async () => {
      if (keywords) {
        const data = await getInputTips({ keywords });
        console.log(data);
      }
    },
    500,
    [keywords]
  );

  return (
    <>
      <Paper className={classes.root} component="form" onSubmit={handleSubmit}>
        <InputBase
          className={classes.input}
          placeholder="Search you destination"
          name="keywords"
          value={keywords}
          autoComplete="off"
          onChange={(e): void => {
            setKeywords(e.target.value);
          }}
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
