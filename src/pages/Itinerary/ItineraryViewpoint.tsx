import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  createStyles,
  makeStyles,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from '@material-ui/core';
import { Favorite } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { red } from '@material-ui/core/colors';
import { District } from '../../services/FetchCity';
import { fetchViewpoint, Poi } from '../../services/FetchViewpoint';

export interface ItineraryViewpointProps {
  selectedCities: District[];
  selectedViewpoints: Poi[];
  setSelectedViewpoints: React.Dispatch<React.SetStateAction<Poi[]>>;
  handleGenerate: () => void;
}

const useStyles = makeStyles(() =>
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
      flexGrow: 1,
      padding: 8,
      overflowY: 'scroll',
      background: '#eee',
    },
    viewcard: {
      width: '100%',
      padding: 6,
      margin: 6,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    rating: {
      flexGrow: 1,
    },
  })
);

const ItineraryViewpoint: React.FC<ItineraryViewpointProps> = ({
  selectedCities,
  selectedViewpoints,
  setSelectedViewpoints,
  handleGenerate,
}) => {
  const classes = useStyles();

  const [viewpointCandidate, setViewPointCandidate] = useState<Poi[]>([]);

  const isSelected = (viewpoint: Poi): boolean => {
    const found = selectedViewpoints.find(
      selectedViewpoint => selectedViewpoint.id === viewpoint.id
    );
    if (found !== undefined) return true;
    return false;
  };

  const handleSelelct = (viewpoint: Poi) => (): void => {
    setSelectedViewpoints([...selectedViewpoints, viewpoint]);
  };

  useEffect(() => {
    Promise.all(
      selectedCities.map(curCity => fetchViewpoint({ city: curCity.citycode }))
    ).then(res => {
      const viewpoints = res.reduce((acc, cur) => [...acc, ...cur.pois], []);
      viewpoints.sort(
        (a, b) => Number(b.biz_ext.rating) - Number(a.biz_ext.rating)
      );
      setViewPointCandidate(viewpoints);
    });
  }, [selectedCities]);

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="sticky">
        <Toolbar>
          <Typography variant="h6" className={classes.mid}>
            添加景点
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.view}>
        {viewpointCandidate.map(viewpoint => (
          <Card className={classes.viewcard} key={viewpoint.id}>
            <CardMedia
              className={classes.media}
              image={viewpoint.photos.length ? viewpoint.photos[0].url : ''}
            />
            <CardContent>
              <Typography variant="h6" component="h2">
                {viewpoint.name}
              </Typography>
              <Typography variant="body1" component="p">
                {viewpoint.business_area}
              </Typography>
            </CardContent>
            <CardActions>
              <Rating
                value={+viewpoint.biz_ext.rating}
                precision={0.1}
                readOnly
              />
              <Typography className={classes.rating}>
                {viewpoint.biz_ext.rating}
              </Typography>
              <IconButton
                aria-label="add to favorites"
                onClick={handleSelelct(viewpoint)}
              >
                <Favorite
                  style={isSelected(viewpoint) ? { color: red[400] } : {}}
                />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </div>
      <AppBar className={classes.appbar} position="static">
        <Toolbar>
          <Button color="inherit">
            <Link
              to="/itinerary/new/city"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              上一步
            </Link>
          </Button>
          <Typography className={classes.mid} />
          <Button
            color="inherit"
            disabled={!selectedViewpoints.length}
            onClick={handleGenerate}
          >
            开始生成
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default ItineraryViewpoint;
