import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroUsuario() {
  const { idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${BASE_URL}/dados`;

  const [id, setId] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');

  function inicializar() {
    setId('');
    setLogin('');
    setSenha('');
    setEmail('');
  }

  async function salvar() {
    const data = JSON.stringify({ id, login, senha, email });
    try {
      if (!idParam) {
        await axios.post(baseURL, data, { headers: { 'Content-Type': 'application/json' } });
        mensagemSucesso(`Usuário ${login} cadastrado com sucesso!`);
      } else {
        await axios.put(`${baseURL}/${idParam}`, data, { headers: { 'Content-Type': 'application/json' } });
        mensagemSucesso(`Usuário ${login} alterado com sucesso!`);
      }
      navigate('/listagem-usuarios');
    } catch (error) {
      mensagemErro(error.response?.data || 'Erro ao salvar usuário.');
    }
  }

  const buscar = useCallback(async () => {
    if (idParam) {
      try {
        const response = await axios.get(`${baseURL}/${idParam}`);
        const usuario = response.data;
        setId(usuario.id);
        setLogin(usuario.login);
        setSenha(usuario.senha);
        setEmail(usuario.email);
      } catch (error) {
        console.log(error);
      }
    }
  }, [idParam, baseURL]);

  useEffect(() => {
    buscar();
  }, [buscar]);

  return (
    <div className="container">
      <Card title="Cadastro de Usuário">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup label="Login: *" htmlFor="inputLogin">
                <input
                  type="text"
                  id="inputLogin"
                  value={login}
                  className="form-control"
                  onChange={(e) => setLogin(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Senha: *" htmlFor="inputSenha">
                <input
                  type="password"
                  id="inputSenha"
                  value={senha}
                  className="form-control"
                  onChange={(e) => setSenha(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Email: *" htmlFor="inputEmail">
                <input
                  type="email"
                  id="inputEmail"
                  value={email}
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <Stack spacing={1} padding={1} direction="row">
                <button onClick={salvar} type="button" className="btn btn-success">
                  Salvar
                </button>
                <button onClick={inicializar} type="button" className="btn btn-danger">
                  Cancelar
                </button>
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroUsuario;
