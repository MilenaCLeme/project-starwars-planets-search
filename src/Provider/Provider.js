import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './MyContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
  });
  const [app, setApp] = useState([]);

  // const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const url = 'https://swapi.dev/api/planets';

  function armazenarData(parametro) { setData(parametro); }
  function armazenarApp(parametro) { setApp(parametro); }

  function armazenarFilters(parametro) {
    setFilters({
      ...filters,
      filterByName: { name: parametro },
    });
  }

  // componentDiMont
  useEffect(() => {
    async function fetchMyAPI() {
      const resultado = await fetch(url);
      const { results } = await resultado.json();
      armazenarData(results);
      armazenarApp(results);
    }
    fetchMyAPI();
  }, []);

  useEffect(() => {
    const { name } = filters.filterByName;
    const filtou = app.filter((item) => item.name.indexOf(name) > 0);
    const armazenar = name === '' ? app : filtou;
    armazenarData(armazenar);
  }, [app, filters]);

  const contextValue = {
    data,
    armazenarFilters,
    filters,
  };

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
