import {
   Button,
   Grid,
   InputAdornment, makeStyles,
   Paper,
   TableBody,
   TableCell,
   TableRow,
   TextField,
   Toolbar
} from '@material-ui/core';
import {ThemeProvider} from '@material-ui/core/styles';
import React, {useEffect} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../app/store';
import {PATH} from '../../main/m3-Routes/Routes';
import {theme} from '../../../utils/theme';
import {getCards} from './cardsReducer';
import {useTable} from '../../../components/useTable/useTable';
import {CardType} from '../../../api/api';
import {HeadCell} from '../PacksList';
import {Search} from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import {ActionButton} from '../../../components/ActionButton/ActionButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
   pageContent: {
      margin: theme.spacing(5),
      padding: theme.spacing(3)
   }
}));

const headCells: HeadCell[] = [
   {id: 'question', label: 'Pack Name'},
   {id: 'answer', label: 'Count Of Cards'},
   {id: 'grade', label: 'Count Of Cards'},
   {id: 'updated', label: 'Date Of Updated'},
   // {id: 'action', label: 'Action', isDisableSorting: true},
]


export const CardsList = () => {
   console.log('render PacksList component');
   const classes = useStyles();
   const dispatch = useDispatch();
   const {id} = useParams<{id?: string}>();

   useEffect(() => {
      id && dispatch(getCards(id));
   }, [dispatch, id])

   const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
   const records = useSelector<AppRootStateType, CardType[]>(state => state.cards.cards);

   //const {TblContainer, TblHead, TblPaginator, recordsAfterPagingAndSorting} = useTable(records, headCells);

   if (!isLoggedIn) {
      return <Redirect to={PATH.SIGN_IN_PATH}/>
   }

   return (
      <>
         cards
         {/*<Paper className={classes.pageContent}>
            <TblContainer>
               <TblHead/>
               <TableBody>
                  {
                     recordsAfterPagingAndSorting().map((item) =>
                        (<TableRow key={item._id}>
                           <TableCell>{item.name}</TableCell>
                           <TableCell>{item.cardsCount}</TableCell>
                           <TableCell>{item.updated}</TableCell>
                           <TableCell>{item.deckCover}</TableCell>
                           <TableCell>
                              <ActionButton color={'primary'}
                                            onClick={() => editItemHandler(item)}
                                            disabled={status === 'loading'}
                              >
                                 <EditOutlinedIcon fontSize="small"/>
                              </ActionButton>
                              <ActionButton
                                 color="secondary"
                                 onClick={() => deleteItemHandler(item)}
                                 disabled={status === 'loading'}
                              >
                                 <CloseIcon fontSize="small" />
                              </ActionButton>
                           </TableCell>
                           <TableCell>
                              <Button
                                 variant='outlined'
                                 color='secondary'
                                 onClick={() => handleCardsClick(item)}
                              >
                                 Cards
                              </Button>
                           </TableCell>
                        </TableRow>)
                     )
                  }
               </TableBody>
            </TblContainer>
            <TblPaginator/>
         </Paper>*/}
      </>
   );
}