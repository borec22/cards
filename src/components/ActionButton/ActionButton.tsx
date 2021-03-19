import React from 'react';
import {Button, makeStyles} from '@material-ui/core';

type ActionButtonProps = {
   color: string
   children: React.ReactNode
   onClick: any
}

const useStyles = makeStyles(theme => ({
   root: {
      minWidth: 0,
      margin: theme.spacing(0.5)
   },
   secondary: {
      backgroundColor: '#ffcdd2',
      '& .MuiButton-label': {
         color: '#d32f2f',
      }
   },
   primary: {
      backgroundColor: '#e0f2f1',
      '& .MuiButton-label': {
         color: '#00796b',
      }
   },
}));

export const ActionButton: React.FC<ActionButtonProps> = (props) => {
   const {color, children, onClick} = props;
   const classes = useStyles();

   return (
      <Button
         className={`${classes.root} ${Object(classes)[color]}`}
         onClick={onClick}
      >
         {children}
      </Button>
   );
}