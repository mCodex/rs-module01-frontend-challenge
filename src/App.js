import React, { useEffect, useState } from 'react';
import { uuid } from 'uuidv4';
import api from './services/api';

import './styles.css';

export default () => {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const loadDataFromAPI = async () => {
      const response = await api.get('/repositories');
      setRepositories(response.data);
    };

    loadDataFromAPI();
  }, [repositories]);

  async function handleAddRepository() {
    const repository = {
      id: uuid(),
      title: 'rs-module01-frontend-challenge',
      url: 'https://github.com/mCodex/rs-module01-frontend-challenge',
      techs: ['ReactJS'],
    };

    await api.post('/repositories', repository);

    return setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const newRepositories = repositories.filter((r) => r.id !== id);

    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }) => (
          <li key={id}>
            {id} - {title}
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
