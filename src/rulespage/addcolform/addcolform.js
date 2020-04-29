import React, {Component, useState, Fragment } from "react";
import ReactDOM from "react-dom";
import data from '../../data/data.json';

const AddColRow = () => {
  const [inputFields, setInputFields] = useState([{ colname: '', colvalue: '' }]);

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ colname: '', colvalue: '' });
    setInputFields(values);
  };

  const handleRemoveFields = index => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "colname") {
      values[index].colname = event.target.value;
    } else {
      values[index].colvalue = event.target.value;
    }

    setInputFields(values);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("inputFields", inputFields);
    // const pushPara=[]
    // for (let c = 0; c < inputFields.length; c++) {
    //   inputFields[c].push({'exclude':'new'})
      
    // }
    // console.log("pushPara", inputFields);
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
            <div className="form-group col-sm-6"><label htmlFor="colname">Column Name</label></div>
            <div className="form-group col-sm-6"><label htmlFor="colvalue">Column Value</label></div>
          {inputFields.map((inputField, index) => (
            <Fragment key={`${inputField}~${index}`}>
              <div className="form-group col-sm-6">
                
                <input
                  type="text"
                  className="form-control"
                  id="colname"
                  name="colname"
                  value={inputField.colname}
                  onChange={event => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-4">
                
                <input
                  type="text" 
                  className="form-control" 
                  id="colvalue"
                  name="colvalue"
                  value={inputField.colvalue}
                  onChange={event => handleInputChange(index, event)}
                />
              </div>
              <div className="form-group col-sm-2">
                <button
                  className="btn btn-link"
                  type="button"
                  onClick={() => handleRemoveFields(index)}
                >
                  -
                </button>
                <button
                  className="btn btn-link"
                  type="button"
                  onClick={() => handleAddFields()}
                >
                  +
                </button>
              </div>
            </Fragment>
          ))}
        </div>
        <div className="submit-button">
          <button
            className="btn btn-primary mr-2"
            type="submit"
            onSubmit={handleSubmit}
          >
            Add as row
          </button>
        </div>
        <br/>
        {/* <pre>
          {JSON.stringify(inputFields, null, 2)}
        </pre> */}
      </form>
    </div>
  );
};




export default AddColRow;
