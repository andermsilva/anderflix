/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ButtonCadastro from '../ButtonCad';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import '../stylesCategoria.css';
import mario from '../../../assests/img/mario.png';
import juliana from '../../../assests/img/juliana.png';
import useForm from '../../../hooks/useForm';
import categoriasRepository from '../../../repositories/categorias';

function CadastroCategoria() {
  const history = useHistory();

  // eslint-disable-next-line linebreak-style

  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',
    url: '',
  };
  const { handleChange, values, clearForm } = useForm(valoresIniciais);
  const [categorias, setCategorias] = useState([]);

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

      {/*    <form onSubmit={function handleSubmit(info) {
        info.preventDefault();

        setCategorias([
          ...categorias,
          values,
        ]);

        categoriasRepository(categorias).then(() => {
          console.log('???');
        });
        clearForm();
      }}
 */}
      <form onSubmit={(event) => {
        event.preventDefault();

        categoriasRepository.create({
          id: '',
          titulo: values.titulo,
          cor: values.cor,
          link_extra: {
            text: values.text,
            url: values.url,
          },

        }).then(() => {
          console.log('cadastro com sucesso');
          history.push('/cadastro/video');
          clearForm();
        });
      }}

      >
        <div>
          <FormField
            label="Nome da categoria"
            type="text"
            name="titulo"
            value={values.titulo}
            onChange={handleChange}
          />
        </div>
        <div>

          <FormField
            label="Descrição"
            type="textarea"
            name="text"
            value={values.text}
            onChange={handleChange}
          />
        </div>
        <div>

          <FormField
            label="URL:"
            type="text"
            name="url"
            value={values.url}
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
        <div className="centralizar">
          <ButtonCadastro>
            Cadastrar
          </ButtonCadastro>
        </div>
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
              {categoria.titulo}
            </div>
           
            <div className="descr">
              {categoria.link_extra.text}
            </div>

            <div className="url">
              {categoria.link_extra.url}
            </div>

            <div
              className="cor"
              style={{ backgroundColor: categoria.cor, color: categoria.cor }}
            >
              1
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
