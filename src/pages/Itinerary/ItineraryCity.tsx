import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  makeStyles,
  createStyles,
  Theme,
  TextField,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Icon,
  Chip,
} from '@material-ui/core';
import { useDebounce } from 'react-use';
import { fetchCity, District } from '../../services/FetchCity';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
    },
    appbar: {
      background: 'rgb(127, 95, 251)',
      top: 'auto',
      bottom: 0,
    },
    mid: {
      flexGrow: 1,
    },
    searchbar: {
      width: '100%',
    },
    chipRoot: {
      display: 'flex',
      flexWrap: 'wrap',
      padding: theme.spacing(0.5),
      minHeight: 48,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  })
);

const ItineraryCity: React.FC = () => {
  const classes = useStyles();

  const [keywords, setKeywords] = useState('');
  const [cityCandidate, setCityCandidate] = useState<District[]>([]);
  const [selectedCities, setSelectedCities] = useState<District[]>([]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    setKeywords(event.target.value as string);
  };

  const handleAdd = (idx: number) => (): void => {
    const newCity = cityCandidate[idx];
    const found = selectedCities.find(
      city => city.citycode === newCity.citycode
    );
    if (found === undefined) {
      setSelectedCities([...selectedCities, newCity]);
    }
  };

  const handleDelete = (cityToDelete: District) => (): void => {
    setSelectedCities(cities =>
      cities.filter(city => city.citycode !== cityToDelete.citycode)
    );
  };

  const isSelected = (cand: District): boolean => {
    const found = selectedCities.find(city => city.citycode === cand.citycode);
    if (found === undefined) return false;
    return true;
  };

  useDebounce(
    async () => {
      if (keywords) {
        const data = await fetchCity({ keywords });
        const cities = data.districts.filter(
          district => district.level === 'city'
        );
        setCityCandidate(cities);
      }
    },
    500,
    [keywords]
  );

  return (
    <>
      <AppBar className={classes.appbar} position="fixed">
        <Toolbar>
          <Button color="inherit" href="/itinerary/new/info">
            上一步
          </Button>
          <Typography className={classes.mid} />
          <Button
            color="inherit"
            href="/itinerary/new/viewpoint"
            disabled={!selectedCities.length}
          >
            下一步
          </Button>
        </Toolbar>
      </AppBar>
      <Box width="100%" paddingX={2} marginY={2}>
        <TextField
          className={classes.searchbar}
          value={keywords}
          placeholder="请在此输入城市名称"
          onChange={handleChange}
          autoFocus
        />
      </Box>
      <Box className={classes.chipRoot}>
        {selectedCities.map(city => (
          <Chip
            className={classes.chip}
            key={city.citycode}
            label={city.name}
            variant="outlined"
            color="secondary"
            onDelete={handleDelete(city)}
          />
        ))}
      </Box>
      <List>
        {cityCandidate.map((cand, idx) => (
          <ListItem key={cand.citycode}>
            <ListItemText>{cand.name}</ListItemText>
            <ListItemSecondaryAction>
              {!isSelected(cand) && (
                <IconButton edge="end" onClick={handleAdd(idx)}>
                  <Icon style={{ color: 'rgb(146, 118, 255)' }}>
                    add_circle
                  </Icon>
                </IconButton>
              )}
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ItineraryCity;
