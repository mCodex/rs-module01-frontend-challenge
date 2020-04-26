import React, { useEffect, useState } from 'react';
import { uuid } from 'uuidv4';
import api from './services/api';

import './styles.css';

export default () => {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const loadDataFromAPI = async () => {
      const response = await api.get('/repositories');
      return setRepositories(response.data);
    };

    loadDataFromAPI();
  }, []);

  async function handleAddRepository() {
    const repository = {
      id: uuid(),
      title: 'Desafio ReactJS',
      url: 'https://github.com/mCodex/rs-module01-frontend-challenge',
      techs: ['ReactJS'],
    };

    setRepositories([...repositories, repository]);

    return api.post('/repositories', repository);
  }

  async function handleRemoveRepository(id) {
    const newRepositories = repositories.filter((r) => r.id !== id);

    setRepositories(newRepositories);

    return api.delete(`/repositories/${id}`);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }) => (
          <li key={id}>
            {title}
            <button type="button" onClick={() => handleRemoveRepository(id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button type="button" onClick={handleAddRepository}>
        Adicionar
      </button>
    </div>
  );
};
