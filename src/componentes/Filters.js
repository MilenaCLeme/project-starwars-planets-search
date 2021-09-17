import React, { useContext, useState } from 'react';
import AppContext from '../Provider/MyContext';

function Filters() {
  const [column, setSelectTipo] = useState('');
  const [comparison, setSelecMaior] = useState('');
  const [value, setInputNumero] = useState(0);

  const { armazenarFilters, filters, armazenarFiltersSelect } = useContext(AppContext);
  const { name } = filters.filterByName;

  return (
    <form>
      <label htmlFor="nome">
        Nome
        <input
          type="text"
          id="nome"
          name="nome"
          data-testid="name-filter"
          onChange={ ({ target }) => { armazenarFilters(target.value); } }
          value={ name }
        />
      </label>
      <select
        data-testid="column-filter"
        onChange={ ({ target }) => { setSelectTipo(target.value); } }
      >
        <option value="">selecionar</option>
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ ({ target }) => { setSelecMaior(target.value); } }
      >
        <option value="">selecionar</option>
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <label htmlFor="numero">
        <input
          type="number"
          id="numero"
          name="numero"
          data-testid="value-filter"
          onChange={ ({ target }) => { setInputNumero(Number(target.value)); } }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => { armazenarFiltersSelect(column, comparison, value); } }
      >
        Enviar
      </button>
    </form>
  );
}

export default Filters;
