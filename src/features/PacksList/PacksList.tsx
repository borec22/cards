import {
   Box,
   Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel,
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
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/store';
import {NavLink, Redirect} from 'react-router-dom';
import {PATH} from '../main/m3-Routes/Routes';
import {addCardPack, deleteCardPack, getCardPacks, updateCardPack} from './packsReducer';
import {useTable} from '../../components/useTable/useTable';
import {AddOrEditPackDataType, PackType} from '../../api/api';
import {Search} from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add'
import {ActionButton} from '../../components/ActionButton/ActionButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import {RequestStatusType, setAppStatus} from '../../app/appReducer';
import {history} from '../../index';
import {Popup} from '../../components/Dialog/Popup';
import {PackForm} from './PackForm/PackForm';
import {setCardsTotalCount} from './CardsList/cardsReducer';


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

export type HeadCell = {
   id: string
   label: string
   isDisableSorting?: true
}


const headCells: HeadCell[] = [
   {id: 'name', label: 'Pack Name'},
   {id: 'cardsCount', label: 'Count Of Cards'},
   {id: 'updated', label: 'Date Of Updated'},
   {id: 'deckCover', label: 'Image', isDisableSorting: true},
   {id: 'action', label: 'Action', isDisableSorting: true},
   {id: 'cards', label: 'Cards', isDisableSorting: true},
]


export const PacksList = () => {
   const classes = useStyles();

   function fn<T>(items: T[]) {
      return items;
   }

   const [searchFn, setSearchFn] = useState({fn: fn});
   const [openPopup, setOpenPopup] = useState(false);
   const [recordForEdit, setRecordForEdit] = useState<AddOrEditPackDataType | null>(null);

   const dispatch = useDispatch();
   const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
   const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
   const cardPacksTotalCount = useSelector<AppRootStateType, number | null>(state => state.packs.cardPacksTotalCount);

   const records = useSelector<AppRootStateType, PackType[]>(state => state.packs.cardPacks);

   const {TblContainer, TblHead, TblPaginator, recordsAfterPagingAndSorting} = useTable(records, headCells, searchFn);

   useEffect(() => {
      dispatch(getCardPacks());
   }, [dispatch, cardPacksTotalCount]);


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

            return items.filter(item => Object(item)['name'].toLowerCase().startsWith(target.value));
         }
      });
   }

   const addOrEdit = (packData: AddOrEditPackDataType) => {
      console.log(packData);
      if (packData._id) {
         dispatch(updateCardPack(packData));
      } else {
         dispatch(addCardPack(packData));
      }
      setOpenPopup(false);
   }

   const deleteItemHandler = (item: {[key: string]: string | number}) => {
      dispatch(deleteCardPack(Object(item)['id']));
   }

   const handleCardsClick = (item: {[key: string]: string | number}) => {
      history.push(`${PATH.CARDS_PATH}/${item._id}`);
      dispatch(setCardsTotalCount(+item.cardsCount));
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
               {cardPacksTotalCount && <TableBody>
                  {
                     recordsAfterPagingAndSorting().map((item) =>
                        (<TableRow key={item._id}>
                           <TableCell>{item.name}</TableCell>
                           <TableCell>{item.cardsCount}</TableCell>
                           <TableCell>{item.updated}</TableCell>
                           <TableCell>{item.deckCover}</TableCell>
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
               </TableBody>}
            </TblContainer>
            <TblPaginator/>
         </Paper>
         <Popup title='Pack Form'
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}>
            <PackForm recordForEdit={recordForEdit} addOrEdit={addOrEdit}/>
         </Popup>
      </>
   );
}


