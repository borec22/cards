import {
   Button,
   InputAdornment,
   makeStyles,
   Paper,
   TableBody,
   TableCell,
   TableRow,
   TextField,
   Toolbar
} from '@material-ui/core';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../app/store';
import {PATH} from '../../main/m3-Routes/Routes';
import {getCards} from './cardsReducer';
import {useTable} from '../../../components/useTable/useTable';
import {AddOrEditPackDataType, CardType} from '../../../api/api';
import {HeadCell} from '../PacksList';
import {ActionButton} from '../../../components/ActionButton/ActionButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import {RequestStatusType} from '../../../app/appReducer';
import {deleteCardPack} from '../packsReducer';
import {Search} from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
   pageContent: {
      margin: theme.spacing(5),
      padding: theme.spacing(3)
   },
   searchInput: {
      width: '75%'
   },
   addButton: {
      position: 'absolute',
      right: '10px'
   }
}));

const headCells: HeadCell[] = [
   {id: 'question', label: 'Question'},
   {id: 'answer', label: 'Answer'},
   {id: 'grade', label: 'Grade'},
   {id: 'updated', label: 'Date Of Updated'},
   {id: 'action', label: 'Action', isDisableSorting: true},
]


export const CardsList = () => {
   console.log('render PacksList component');
   const classes = useStyles();

   function fn<T>(items: T[]) {
      return items;
   }

   const [searchFn, setSearchFn] = useState({fn: fn});
   const [openPopup, setOpenPopup] = useState(false);
   const [recordForEdit, setRecordForEdit] = useState<AddOrEditPackDataType | null>(null);

   const dispatch = useDispatch();
   const cardsTotalCount = useSelector<AppRootStateType, number | null>(state => state.cards.cardsTotalCount);
   const {id} = useParams<{ id?: string }>();

   useEffect(() => {
      id && dispatch(getCards(id, cardsTotalCount ? cardsTotalCount : 4));
   }, [dispatch, id])

   const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
   const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
   const records = useSelector<AppRootStateType, CardType[]>(state => state.cards.cards);

   const {TblContainer, TblHead, TblPaginator, recordsAfterPagingAndSorting} = useTable(records, headCells, searchFn);

   if (!isLoggedIn) {
      return <Redirect to={PATH.SIGN_IN_PATH}/>
   }

   const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
      const target = e.target;

      setSearchFn({
         fn: (items) => {
            if (target.value === '') {
               return items;
            }

            return items.filter(item => Object(item)['question'].toLowerCase().startsWith(target.value));
         }
      });
   }

   const deleteItemHandler = (item: {[key: string]: string | number}) => {
      dispatch(deleteCardPack(Object(item)['id']));
   }

   return (
      <>
         <Paper className={classes.pageContent}>
            <Toolbar>
               <TextField label='Search Pack'
                          variant='outlined'
                          className={classes.searchInput}
                          onChange={handleSearch}
                          InputProps={{
                             startAdornment: (
                                <InputAdornment position="start">
                                   <Search/>
                                </InputAdornment>
                             ),
                          }}/>
               <Button variant='outlined'
                       startIcon={<AddIcon/>}
                       disabled={status === 'loading'}
                       color={'secondary'}
                       className={classes.addButton}
                       onClick={
                          () => {
                             setOpenPopup(true);
                             setRecordForEdit(null);
                          }
                       }
               > Add New </Button>
            </Toolbar>
            <TblContainer>
               <TblHead/>
               <TableBody>
                  {
                     recordsAfterPagingAndSorting().map((item) =>
                        (<TableRow key={item._id}>
                           <TableCell>{item.question}</TableCell>
                           <TableCell>{item.answer}</TableCell>
                           <TableCell>{item.grade}</TableCell>
                           <TableCell>{item.updated}</TableCell>
                           <TableCell>
                              <ActionButton color={'primary'}
                                            onClick={() => {
                                               setOpenPopup(true);
                                               setRecordForEdit(item);
                                            }}
                                            disabled={status === 'loading'}
                              >
                                 <EditOutlinedIcon fontSize="small"/>
                              </ActionButton>
                              <ActionButton
                                 color="secondary"
                                 onClick={() => deleteItemHandler(item)}
                                 disabled={status === 'loading'}
                              >
                                 <CloseIcon fontSize="small"/>
                              </ActionButton>
                           </TableCell>
                        </TableRow>)
                     )
                  }
               </TableBody>
            </TblContainer>
            <TblPaginator/>
         </Paper>
      </>
   );
}