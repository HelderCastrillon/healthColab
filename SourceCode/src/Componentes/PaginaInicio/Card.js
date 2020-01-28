import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 500,
  },
  media: {
    
    height: 50,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <Card className={classes.card}>
      <CardHeader align="center"
         title="Bienvenidos"
      />
      <CardMedia 
        className={classes.media}
        image="https://www.gradiant.org/wp-content/uploads/2019/03/eSalud_02_cabecera.jpg"
        title="Logo"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" justify="center">
         FrameD-Sis (Framework para el desarrollo colaborativo de sistemas de información en salud)
          
        </Typography>
      </CardContent>
      
      
    </Card>
  );
}
