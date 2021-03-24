import Dialog from '@material-ui/core/Dialog';
import React from 'react';
import {DialogContent, DialogTitle, makeStyles, Typography} from '@material-ui/core';
import {ActionButton} from '../ActionButton/ActionButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
   dialogWrapper: {
      padding: theme.spacing(2),
      position: 'absolute',
      top: theme.spacing(5)
   },
   dialogTitle: {
      paddingRight: '0px'
   }
}))

type PropsType = {
   title?: string
   children?: React.ReactNode
   openPopup: boolean
   setOpenPopup: (isOpen: boolean) => void
}


export const Popup: React.FC<PropsType> = (props) => {
   const classes = useStyles();
   const {title, children, openPopup, setOpenPopup} = props;

   return (
      <Dialog open={openPopup} classes={{paper: classes.dialogWrapper}}>
         <DialogTitle className={classes.dialogTitle}>
            <div style={{display: 'flex'}}>
               <Typography variant='h6' component='div' style={{flexGrow: 1}}>
                  {title}
               </Typography>
               <ActionButton color={'secondary'}
                             onClick={() => setOpenPopup(false)}>
                  <CloseIcon/>
               </ActionButton>
            </div>
         </DialogTitle>
         <DialogContent dividers>
            {children}
         </DialogContent>
      </Dialog>
   );
}