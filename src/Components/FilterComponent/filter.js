import React from 'react';

const FilterComponent = (props) =>{
    let options = props.name.map(option => {
      return <option key={option}>{option}</option>
    })
    return (
        <select defaultValue={props.selected} onChange={ (e) => props.fn(e, props.inx)}>
          {options}
        </select>
    )
  };

  export default FilterComponent;