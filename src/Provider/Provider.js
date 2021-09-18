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
    setFilters({
      ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, selects],
    });
  }

  function excluirFiltersSelect(item) {
    const arrayFilterByNumericV = [...filters.filterByNumericValues];
    const filtragemArray = arrayFilterByNumericV.filter(({ column }) => column !== item);
    setFilters({
      ...filters,
      filterByNumericValues: filtragemArray,
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
    const { filterByName, filterByNumericValues } = filters;
    const { name } = filterByName;
    const filtarNome = app.filter((item) => item.name.indexOf(name) > 0);
    const alterarData = name === '' ? app : filtarNome;
    armazenarData(alterarData);
    let dataFiltros = [...alterarData];
    filterByNumericValues.forEach(({ column, comparison, value }) => {
      if (comparison === 'menor que' && dataFiltros.length > 0) {
        const filtarcolunaMenor = dataFiltros
          .filter((item) => Number(item[column]) < value);
        dataFiltros = filtarcolunaMenor;
        armazenarData(filtarcolunaMenor);
      } else if (comparison === 'maior que' && dataFiltros.length > 0) {
        const filtarcolunaMaior = dataFiltros
          .filter((item) => Number(item[column]) > value);
        dataFiltros = filtarcolunaMaior;
        armazenarData(filtarcolunaMaior);
      } else if (comparison === 'igual a' && dataFiltros.length > 0) {
        const filtarcolunaIgual = dataFiltros
          .filter((item) => Number(item[column]) === value);
        dataFiltros = filtarcolunaIgual;
        armazenarData(filtarcolunaIgual);
      }
    });
  }, [app, filters]);

  const contextValue = {
    data,
    armazenarFilters,
    filters,
    armazenarFiltersSelect,
    excluirFiltersSelect,
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
