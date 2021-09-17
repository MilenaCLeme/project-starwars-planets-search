import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './MyContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [],
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

  function armazenarFiltersSelect(column, comparison, value) {
    const selects = { column, comparison, value };
    setFilters((prevState) => ({
      ...filters,
      filterByNumericValues: [...prevState.filterByNumericValues, selects],
    }));
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
    const { filterByName, filterByNumericValues } = filters;
    const { name } = filterByName;
    const filtarNome = app.filter((item) => item.name.indexOf(name) > 0);
    const alterarData = name === '' ? app : filtarNome;
    armazenarData(alterarData);
    filterByNumericValues.forEach(({ column, comparison, value }) => {
      if (comparison === 'menor que') {
        const filtarcolunaMenor = alterarData.filter((item) => item[column] < value);
        armazenarData(filtarcolunaMenor);
      } else if (comparison === 'maior que') {
        const filtarcolunaMaior = alterarData.filter((item) => item[column] > value);
        armazenarData(filtarcolunaMaior);
      } else if (comparison === 'igual a') {
        const filtarcolunaIgual = alterarData
          .filter((item) => Number(item[column]) === value);
        armazenarData(filtarcolunaIgual);
      }
    });
  }, [app, filters]);

  const contextValue = {
    data,
    armazenarFilters,
    filters,
    armazenarFiltersSelect,
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
