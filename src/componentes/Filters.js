import React, { useContext, useState } from 'react';
import AppContext from '../Provider/MyContext';

function Filters() {
  const [column, setSelectTipo] = useState('population');
  const [comparison, setSelecMaior] = useState('maior que');
  const [value, setInputNumero] = useState(0);
  const [columnEscrito, setColumnEscrito] = useState(
    ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
  );
  const [excluido, setExcluido] = useState([]);

  const {
    armazenarFilters,
    filters,
    armazenarFiltersSelect,
    excluirFiltersSelect,
  } = useContext(AppContext);
  const { name } = filters.filterByName;

  function removerColumn(paramentro) {
    const arColummEscrito = [...columnEscrito];
    arColummEscrito.splice(columnEscrito.indexOf(paramentro), 1);
    setColumnEscrito(arColummEscrito);
    setExcluido([...excluido, paramentro]);
  }

  function excluiItemDoSetExcluido(item) {
    const arExcluido = [...excluido];
    arExcluido.splice(excluido.indexOf(item), 1);
    setExcluido(arExcluido);
    setColumnEscrito([...columnEscrito, item]);
  }

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
        {
          columnEscrito.map((item) => <option key={ item } value={ item }>{item}</option>)
        }
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ ({ target }) => { setSelecMaior(target.value); } }
      >
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
        onClick={ () => {
          armazenarFiltersSelect(column, comparison, value);
          removerColumn(column);
        } }
      >
        Enviar
      </button>
      {
        excluido.map((item) => (
          <div data-testid="filter" key={ item }>
            {item}
            <button
              type="button"
              onClick={ () => {
                excluirFiltersSelect(item);
                excluiItemDoSetExcluido(item);
              } }
            >
              x
            </button>
          </div>
        ))
      }
    </form>
  );
}

export default Filters;
