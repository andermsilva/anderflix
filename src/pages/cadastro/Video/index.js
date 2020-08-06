/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import { Link, useHistory, matchPath } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import useForm from '../../../hooks/useForm';
import FormField from '../../../components/FormField';
import ButtonCadastro from '../ButtonCad';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';
import mario from '../../../assests/img/mario.png';
import juliana from '../../../assests/img/juliana.png';
import Lixeira from '../../../assests/img/lixeira.png';

function validate(values) {
  const errors = {};

  if (values.categoria === '') {
    errors.categoria = 'Informe uma categoria!';
  }
  if (values.url === '') {
    errors.url = 'Informe uma Url do video!';
  }
  return errors;
}
function CadastroVideo() {
  const history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const [videos, setVideos] = useState([]);
  const categorytitles = categorias.map(({ titulo }) => titulo);
  const [errors, setErrors] = useState({});

  const { handleChange, values } = useForm({
    titulo: '',
    url: '',
    categoria: '',
  });
  console.log(history.location.search);
  const cod = history.location.search.split('=');
  // console.log(cod[1], '  ->',cod.length);

  useEffect(() => {
    categoriasRepository.getAll().then((categoriasFromServer) => {
      setCategorias(categoriasFromServer);
    });
  }, []);

  useEffect(() => {
    videosRepository.getAll().then((videosFromServer) => {
      setVideos(videosFromServer);
    });
  }, []);
 
  return (
    <PageDefault>
      <h1>
        Cadastro de Video

      </h1>
      <form onSubmit={(event) => {
        const categoriaEscolhida = categorias.find((categoria) => categoria.titulo === values.categoria);
        setErrors(validate(values));
        event.preventDefault();

        if (values.categoria !== '' && values.url !== '') {
          console.log(values.categoria);
          //  alert('entrou', values.categoria);
          // console.log(categoriaEscolhida.titulo);
          try {
            if (categoriaEscolhida.titulo === values.categoria) {
            // alert('cadastrou');

              videosRepository.create({
                id: '',
                categoriaId: categoriaEscolhida.id,
                titulo: values.titulo,
                url: values.url,
              }).then(() => {
                console.log('cadastro com sucesso');
              });
              history.push('/');
            }
          } catch (err) {
            alert('Informe uma categoria ja cadastrada!');
          }
        }
      }}
      >

        <FormField
          label="Titulo do Video"
          type="text"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
        />
        {errors.url && <span>{errors.url}</span>}
        <FormField
          label="Url"
          type="text"
          name="url"
          value={values.url}
          onChange={handleChange}
        />
        {errors.categoria && <span>{errors.categoria}</span>}
        <FormField
          label="Categoria"
          type="text"
          name="categoria"
          value={values.categoria}
          suggestions={categorytitles}
          onChange={handleChange}
        />
        <span className="" />
        <div className="centralizar">
          <ButtonCadastro type="submit">
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
        {videos.map((video) => (

          <li className="lista" key={`${video.id}`}>
            <div className="nome_video">
              {video.titulo}
            </div>

            <div className="url_video">
              {video.url}
            </div>
            {categorias.map((categoria) => (categoria.id === video.categoriaId
            && (
            <div
              className="cor_video"
              style={{ backgroundColor: categoria.cor, color: categoria.cor }}
            >
              <Link to={`/cadastro/video?id=${video.id}`}>
                <img className="lixeira" src={Lixeira} />
              </Link>

            </div>
            )
            ))}
          </li>
        ))}
      </ul>

      <Link to="/cadastro/categoria">
        Cadastrar Categoria
      </Link>
    </PageDefault>
  );
}
export default CadastroVideo;
