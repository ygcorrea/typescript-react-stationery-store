import { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter, useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
        display: 'block',
      },
    },
    wrapper: {
      width: '100%',
    },
    formInput: {
      width: '100%',
    },
    button: {
      margin: theme.spacing(1),
    },
  }),
);

export interface IValues {
  id: number;
  nome: string;
  descricao: string;
  quantidade: string;
  categoria: string;
  codigo: string;
}
export interface IFormState {
  [key: string]: any;
  values: IValues[];
  submitSuccess: boolean;
  loading: boolean;
}
const values: IValues = {
  id: 0,
  nome: '',
  descricao: '',
  quantidade: '',
  categoria: '',
  codigo: '',
};
function EditItem() {
  const [values, setValues] = useState({} as IValues);

  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    getData();
  });

  const getData = async () => {
    const item = await axios.get(`http://localhost:8181/items`);
    await setValues(item.data);
    console.log(values);
  };

  const handleChange = (event: any) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: any, id: number) => {
    event.persist();
    axios.patch(`http://localhost:8181/items/${id}`, values).then((data) => {
      history.goBack();
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <TextField
          id="outlined-input"
          name="id"
          value={values.id}
          label="ID"
          type="number"
          className={classes.formInput}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="outlined-input"
          name="nome"
          value={values.nome}
          label="Nome"
          type="text"
          className={classes.formInput}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="outlined-input"
          name="descricao"
          value={values.descricao}
          label="Descrição"
          type="text"
          className={classes.formInput}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="outlined-input"
          name="quantidade"
          value={values.quantidade}
          label="Quantidade"
          type="text"
          className={classes.formInput}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="outlined-input"
          name="codigo"
          label="codigo"
          value={values.codigo}
          type="text"
          className={classes.formInput}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="outlined-input"
          name="categoria"
          label="categoria"
          value={values.categoria}
          type="text"
          className={classes.formInput}
          variant="outlined"
          onChange={handleChange}
        />

        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={(e) => handleSubmit(e, values.id)}
        >
          Update
        </Button>
      </div>
    </div>
  );
}

export default withRouter(EditItem);
