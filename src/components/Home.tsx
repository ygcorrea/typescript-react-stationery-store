import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  marginRight: {
    marginRight: 10,
  },
  myButton: {
    background: '#c277ce',
    textTransform: 'none',
    textDecoration: 'none ',
    color: '#000',
  },
});
export interface IValues {
  id: number;
  nome: string;
  codigo: string;
  descricao: string;
  quantidade: string;
  categoria: string;
}

export default function SimpleTable() {
  const classes = useStyles();
  const [data, setData] = useState([] as IValues[]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const items = await axios.get(`http://localhost:8181/items`);
    setData(items.data);
    console.log(items);
  };
  const deleteData = async (event: any, id: number) => {
    event.persist();
    await axios.delete(`http://localhost:8181/items/${id}`).then((data_) => {
      getData();
    });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">Nome</TableCell>
              <TableCell align="left">Descrição</TableCell>
              <TableCell align="left">Quantidade</TableCell>
              <TableCell align="left">Categoria</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((itemPaper) => (
              <TableRow key={itemPaper.id}>
                <TableCell align="left">{itemPaper.id}</TableCell>
                <TableCell component="th" scope="row">
                  {itemPaper.codigo}
                </TableCell>
                <TableCell align="left">{itemPaper.nome}</TableCell>
                <TableCell align="left">{itemPaper.descricao}</TableCell>
                <TableCell align="left">{itemPaper.quantidade}</TableCell>
                <TableCell align="left">{itemPaper.categoria}</TableCell>
                <TableCell align="left">
                  <div>
                    <Link to={`edit/${itemPaper.id}`}>
                      <EditIcon className={classes.marginRight} />
                    </Link>
                  </div>
                  <DeleteIcon onClick={(e) => deleteData(e, itemPaper.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Link to="/create">
          <Button className={classes.myButton}>Adicionar item</Button>
        </Link>
      </div>
    </>
  );
}
