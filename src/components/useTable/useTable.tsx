import React, {useState} from 'react';
import {makeStyles, Table, TableCell, TableHead, TablePagination, TableRow, TableSortLabel} from '@material-ui/core';
import {CardType, PackType} from '../../api/api';
import {HeadCell} from '../../features/PacksList/PacksList';

const useStyles = makeStyles(theme => ({
   table: {
      marginTop: theme.spacing(3),
      '& thead th': {
         fontWeight: '600',
         color: '#fff',
         backgroundColor: theme.palette.primary.light,
      },
      '& tbody td': {
         fontWeight: '300',
      },
      '& tbody tr:hover': {
         // backgroundColor: '#fffbf2',
         backgroundColor: '#e8f5e9',
         cursor: 'pointer',
      },
   },
}))

type SearchFn = {
   fn: <T>(items: T[]) => T[]
}

export const useTable = (
   records: {[x: string]: string | number}[],
   headCells: HeadCell[],
   searchFn?: SearchFn
) => {
   const classes = useStyles();

   const pages = [5, 10, 25];
   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
   const [order, setOrder] = useState<Order>('asc');
   const [orderBy, setOrderBy] = useState<string>('cardsCount');

   const TblContainer = (props: { children: React.ReactNode }) => (
      <Table className={classes.table}>
         {props.children}
      </Table>
   );

   const handleSortRequest = (cellId: string) => {
      const isAsc = orderBy === cellId && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(cellId)
   }

   const TblHead = () => (
      <TableHead>
         <TableRow>
            {
               headCells.map(headCell => (
                  <TableCell key={headCell.id}
                             sortDirection={orderBy === headCell.id ? order : false}>
                     {headCell.isDisableSorting ? headCell.label :
                        <TableSortLabel
                           onClick={() => handleSortRequest(headCell.id)}
                           direction={orderBy === headCell.id ? order : 'asc'}
                           active={orderBy === headCell.id}
                        >
                           {headCell.label}
                        </TableSortLabel>}
                  </TableCell>)
               )
            }
         </TableRow>
      </TableHead>
   );

   function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
      if (b[orderBy] < a[orderBy]) {
         return -1;
      }
      if (b[orderBy] > a[orderBy]) {
         return 1;
      }
      return 0;
   }

   type Order = 'asc' | 'desc';

   function getComparator<Key extends keyof any>(
      order: Order,
      orderBy: Key,
   ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
      return order === 'desc'
         ? (a, b) => descendingComparator(a, b, orderBy)
         : (a, b) => -descendingComparator(a, b, orderBy);
   }

   function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
      const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
      stabilizedThis.sort((a, b) => {
         const order = comparator(a[0], b[0]);
         if (order !== 0) return order;
         return a[1] - b[1];
      });
      return stabilizedThis.map((el) => el[0]);
   }

   const recordsAfterPagingAndSorting = () => {
      return stableSort(
         searchFn? searchFn.fn(records) : records,
         getComparator(order, orderBy)).slice(page * rowsPerPage, (page + 1) * rowsPerPage
      );
   }


   const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
   }
   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   }

   const TblPaginator = () => (<TablePagination
      component='div'
      rowsPerPageOptions={pages}
      count={records.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
   />);

   return {
      TblContainer,
      TblHead,
      TblPaginator,
      recordsAfterPagingAndSorting
   }
}