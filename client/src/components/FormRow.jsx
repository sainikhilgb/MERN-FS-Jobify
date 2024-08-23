import React from 'react'

const FormRow = ({type,labelText,defaultValue,name,onChange}) => {
  return (
    <div className="form-row">
          <label htmlFor={name} className="form-label">{labelText || name}</label>
          <input type={type} id={name}name={name}className="form-input" onChange={onChange} required defaultValue={defaultValue || ' '} />
        </div>
  )
}

export default FormRow