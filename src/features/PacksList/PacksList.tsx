import {InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, TextField, Toolbar} from '@material-ui/core';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/store';
import {Redirect} from 'react-router-dom';
import {PATH} from '../main/m3-Routes/Routes';
import {getCardPacks} from './packsReducer';
import {useTable} from '../../components/useTable/useTable';
import {PackType} from '../../api/api';
import {Search} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
   pageContent: {
      margin: theme.spacing(5),
      padding: theme.spacing(3)
   },
   searchInput: {
      width: '75%'
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

            return items.filter(item => item.name.toLowerCase().includes(target.value));
         }
      });
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
                                   <Search />
                                </InputAdornment>
                             ),
                          }}/>
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


