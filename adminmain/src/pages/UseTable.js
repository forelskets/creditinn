import { PagesOutlined } from '@mui/icons-material';
import { Table ,TableHead ,TableRow , TableCell, TablePagination, TableSortLabel} from '@mui/material'
import React , {useState} from 'react'

function UseTable(records , headCells){
    const pages =[5,10,25] 
    const [page , setPage] = useState(0);
    const [rowsPerPage , setRowsPerPage] = useState(pages[page])
    const [order , setOrder] = useState();
    const [orderBy , setOrderBy ] = useState()

    const TblContainer = props =>(
        <Table>
            {props.children}
        </Table>
    ) 

    const TblHead = props =>{
        const handleSortRequest = cellid =>{
            const isAsc = orderBy === cellid && order === 'asc';
            setOrder(isAsc?'desc':'asc')
           setOrderBy(cellid)
        }
        return(
            <TableHead>
                <TableRow>
                    {headCells.map(headCell =>(
                        <TableCell key={headCell.id}
                         sortDirection= {orderBy === headCell.id ? order : false }>
                             {headCell.disableSorting ? headCell.label :
                            <TableSortLabel
                            active ={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={()=>{handleSortRequest(headCell.id)}}>
                                {headCell.label}
                            </TableSortLabel>}
                        </TableCell>
                      
                    ))}
                </TableRow>
            </TableHead> 
        )
    }

    const handleChangePage = (event , newPage) =>{
        setPage(newPage)
    }

    const handleChangeRowsPerPage =(event)=>{
        setRowsPerPage(parseInt(event.target.value , 10))
        setPage(0);
    }



    const TblPagination = () =>(
        <TablePagination
        component="div"
        page={page}
        rowsPerPageOptions={pages}
        rowsPerPage={rowsPerPage}
        count={records.length}
        onPageChange={handleChangePage}
        onRowsPerPageChange = {handleChangeRowsPerPage}
        />
    )

    function stableSort(array , comparator){
         const stablizedThis = array.map((el , index) =>[el , index]) ;
          console.log( stablizedThis , "stablesort")
         stablizedThis.sort((a,b) =>{
             console.log(a , b , "aaaabbbb" ,a[0] , b[0])
             const order = comparator(a[0] , b[0]);
             console.log(order , "order")
             if(order !== 0) return order;
             return a[1] - b[1];
         })
         return stablizedThis.map((el) => el[0]);
    }

    function getComparator(order , orderBy){
        return order === 'desc' 
        ? (a , b) => descendingComparator(a , b , orderBy)
        : (a , b) => -descendingComparator(a , b , orderBy)
    }

    function descendingComparator(a , b , orderBy){
        if(b[orderBy] < a[orderBy]){
            return -1;
        }
        if(b[orderBy] > a[orderBy]){
            return 1;
        }
        return 0;
    }

    const recordsAfterPagingAndSorting = () =>{
         return stableSort(records , getComparator(order , orderBy)).slice(page*rowsPerPage , (page + 1)*rowsPerPage)
    }

  return {
      
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  }
}

export default UseTable