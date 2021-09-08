import { useState } from 'react';
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
  codigo: string;
  descricao: string;
  quantidade: string;
  categoria: string;
}
export interface IFormState {
  [key: string]: any;
  values: IValues[];
  submitSuccess: boolean;
  loading: boolean;
}
const defaultValues: IValues = {
  id: 1,
  nome: '',
  codigo: '',
  descricao: '',
  quantidade: '',
  categoria: '',
};
function CreateItem() {
  const [values, setValues] = useState(defaultValues as IValues);

  const classes = useStyles();
  const history = useHistory();

  const handleChange = (event: any) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: any) => {
    event.persist();
    axios
      .post(`http://localhost:8181/items`, values)
      .then((data) => [history.goBack()]);
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <TextField
          id="outlined-input"
          name="nome"
          label="Nome"
          type="text"
          defaultValue={values.nome}
          className={classes.formInput}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="outlined-input"
          name="nome"
          label="Nome"
          type="text"
          defaultValue={values.nome}
          className={classes.formInput}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="outlined-input"
          name="codigo"
          label="codigo"
          type="text"
          defaultValue={values.codigo}
          className={classes.formInput}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="outlined-input"
          name="descricao"
          label="descricao"
          type="text"
          defaultValue={values.descricao}
          className={classes.formInput}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="outlined-input"
          name="quantidade"
          label="quantidade"
          type="text"
          defaultValue={values.quantidade}
          className={classes.formInput}
          variant="outlined"
          onChange={handleChange}
        />
        <TextField
          id="outlined-input"
          name="categoria"
          label="categoria"
          type="text"
          defaultValue={values.categoria}
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
          onClick={handleSubmit}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default withRouter(CreateItem);
