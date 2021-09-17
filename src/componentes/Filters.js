import React, { useContext } from 'react';
import AppContext from '../Provider/MyContext';

function Filters() {
  const { armazenarFilters, filters } = useContext(AppContext);
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
    </form>
  );
}

export default Filters;
