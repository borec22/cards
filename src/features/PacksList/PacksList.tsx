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
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/store';
import {Redirect} from 'react-router-dom';
import {PATH} from '../main/m3-Routes/Routes';
import {addCardPack, deleteCardPack, getCardPacks, updateCardPack} from './packsReducer';
import {useTable} from '../../components/useTable/useTable';
import {PackType} from '../../api/api';
import {Search} from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add'
import {ActionButton} from '../../components/ActionButton/ActionButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';

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
]


export const PacksList = () => {
   console.log('render PacksList component');
   const classes = useStyles();

   const [searchFn, setSearchFn] = useState({fn: (items: PackType[]) => items});

   const dispatch = useDispatch();
   const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
   const records = useSelector<AppRootStateType, PackType[]>(state => state.packs.cardPacks);

   const {TblContainer, TblHead, TblPaginator, recordsAfterPagingAndSorting} = useTable(records, headCells, searchFn);

   useEffect(() => {
      dispatch(getCardPacks());
   }, [dispatch]);


   if (!isLoggedIn) {
      return <Redirect to={PATH.SIGN_IN_PATH}/>
   }

   const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
      const target = e.target;

      setSearchFn({
         fn: (items: PackType[]) => {
            if (target.value === '') {
               return items;
            }

            return items.filter(item => item.name.toLowerCase().startsWith(target.value));
         }
      });
   }

   const addNewItemHandler = () => {
      dispatch(addCardPack());
   }

   const editItemHandler = (item: PackType) => {
      dispatch(updateCardPack(item._id));
   }

   const deleteItemHandler = (item: PackType) => {
      dispatch(deleteCardPack(item._id));
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
                       color={'secondary'}
                       className={classes.addButton}
                       onClick={addNewItemHandler}
               > Add New </Button>
            </Toolbar>
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
                                            onClick={() => editItemHandler(item)}>
                                 <EditOutlinedIcon fontSize="small"/>
                              </ActionButton>
                              <ActionButton
                                 color="secondary"
                                 onClick={() => deleteItemHandler(item)}>
                                 <CloseIcon fontSize="small" />
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


