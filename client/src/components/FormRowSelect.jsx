import React from 'react'

const FormRowSelect = ({name,labelText,defaultValue='',list,onChange}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className='form-label'>{labelText || name}</label>
      <select name={name} id={name} className='form-select' defaultValue={defaultValue} onChange={onChange}>
      {Object.values(list).map((listValue) =>{
        return(
          <option key={listValue} value={listValue}>{listValue}</option>
        )
      })}
      </select>
      </div>
  )
}

export default FormRowSelect