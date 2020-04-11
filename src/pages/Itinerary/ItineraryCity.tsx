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
import { Link } from 'react-router-dom';
import { useDebounce } from 'react-use';
import { fetchCity, District } from '../../services/FetchCity';

export interface ItineraryCityProps {
  selectedCities: District[];
  setSelectedCities: React.Dispatch<React.SetStateAction<District[]>>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    appbar: {
      background: 'rgb(127, 95, 251)',
    },
    mid: {
      flexGrow: 1,
    },
    view: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
      flexGrow: 1,
      padding: 8,
      overflowY: 'scroll',
      background: '#eee',
    },
    searchbar: {
      width: '100%',
      color: 'inherit',
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

const ItineraryCity: React.FC<ItineraryCityProps> = ({
  selectedCities,
  setSelectedCities,
}) => {
  const classes = useStyles();

  const [keywords, setKeywords] = useState('');
  const [cityCandidate, setCityCandidate] = useState<District[]>([]);

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
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="sticky">
        <Toolbar>
          <Typography variant="h6" className={classes.mid}>
            选择城市
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.view}>
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
      </div>
      <AppBar className={classes.appbar} position="static">
        <Toolbar>
          <Button color="inherit">
            <Link
              to="/itinerary/new/info"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              上一步
            </Link>
          </Button>
          <Typography className={classes.mid} />
          <Button color="inherit" disabled={!selectedCities.length}>
            <Link
              to="/itinerary/new/viewpoint"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              下一步
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default ItineraryCity;
