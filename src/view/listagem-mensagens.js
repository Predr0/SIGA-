import React from 'react';

import Card from '../components/card';
import { mensagemSucesso, mensagemErro } from '../components/toastr';

import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import { BASE_URL2 } from '../config/axios';

const baseURL = `${BASE_URL2}/mensagens`;

function ListagemMensagens() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-mensagens`);
  };

  const editar = (id) => {
    navigate(`/cadastro-mensagens/${id}`);
  };

  const [dados, setDados] = React.useState(null);
  React.useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setDados(response.data);
      })
      .catch((error) => {
        mensagemErro("Erro ao carregar mensagens.");
      });
  }, []);

  if (!dados) return null;

  return (
    <div className='container'>
      <Card title='Listagem de Mensagens'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={() => cadastrar()}
              >
                Nova Mensagem
              </button>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Id</th>
                    <th scope='col'>Aluno</th>
                    <th scope='col'>Modalidade</th>
                    <th scope='col'>Conteúdo</th>
                    <th scope='col'>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.id}</td>
                      <td>{dado.aluno}</td>
                      <td>{dado.modalidade}</td>
                      <td>{dado.mensagem}</td>
                      <td>
                        <Stack spacing={1} padding={0} direction='row'>
                          <IconButton
                            aria-label='edit'
                            onClick={() => editar(dado.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label='delete'
                            // onClick={() => excluir(dado.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ListagemMensagens;
