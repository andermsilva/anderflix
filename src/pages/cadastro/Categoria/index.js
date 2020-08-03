/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import '../stylesCategoria.css';
import mario from '../../../assests/img/mario.png';
import juliana from '../../../assests/img/juliana.png';

function CadastroCategoria() {
  const ButtonCadastro = styled.button`

color: var(--white);
border: 1px solid var(--white);
box-sizing: border-box;
cursor: pointer;
padding: 16px 24px;
background-color var(--primary);
font-style:normal;
font-weight: bold;
font-size: 16px;
outline: none;
border-radius: 5px;
text-decoration: none;
display: inline-block;
transition:opacity .3s;

}

&:hover,
&:focus {
opacity: .5;
}

`;
  // eslint-disable-next-line linebreak-style
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',
  };
  const [categorias, setCategorias] = useState([]);

  const [values, setValues] = useState(valoresIniciais);

  function setValue(chave, valor) {
    setValues({
      ...values,
      [chave]: valor,
    });
  }

  function handleChange(info) {
    setValue(
      info.target.getAttribute('name'),
      info.target.value,
    );
  }

  useEffect(() => {
    const URL_TOP = window.location.hostname.includes('localhost')
      ? 'http://localhost:8080/categorias'
      : 'https://app-anderflix.herokuapp.com/categorias';

    fetch(URL_TOP).then(async (respostaDoServidor) => {
      const resposta = await respostaDoServidor.json();
      setCategorias([
        ...resposta,
      ]);
    });
  }, []);

  return (
    <PageDefault>
      <h1>
        Cadastro de Categoria:
        {values.nome}
      </h1>

      <form onSubmit={function handleSubmit(info) {
        info.preventDefault();
        setCategorias([
          ...categorias,
          values,
        ]);
        setValues(valoresIniciais);
      }}
      >
        <div>
          <FormField
            label="Nome da categoria"
            type="text"
            name="nome"
            value={values.nome}
            onChange={handleChange}
          />
        </div>
        <div>

          <FormField
            label="Descrição"
            type="textarea"
            name="descricao"
            value={values.descricao}
            onChange={handleChange}
          />
        </div>
        <div>

          <FormField
            label="Cor"
            type="color"
            name="cor"
            value={values.cor}
            onChange={handleChange}
          />

        </div>
        <span className="centralizar">
          <ButtonCadastro>
            Cadastrar
          </ButtonCadastro>
        </span>
      </form>

      {categorias.length === 0 && (
      <div>
        <img className="emoj" src={mario} />
        Loading...
        <img className="emoj" src={juliana} />
      </div>

      )}

      <ul>
        {categorias.map((categoria) => (

          <li className="lista" key={`${categoria.id}`}>
            <div className="nome">

              {categoria.nome}
            </div>
            <div className="descr">

              {categoria.descricao}
            </div>
            <div
              className="cor"
              style={{ backgroundColor: categoria.cor, color: categoria.cor }}
            >
              c
            </div>
          </li>
        ))}
      </ul>

      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
