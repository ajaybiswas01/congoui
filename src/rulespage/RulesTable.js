import React, { Component } from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'

import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

export default class RulesTable extends Component {
    constructor(props) {
        super(props);
        const datarows = props.columnData.slice();
        //if no row exists yet, then create first row
        let newObj = {}, columnData = [];
        if (!datarows.length) {
            let rowData = [];
            console.log('Modal', props.columnModel)
            props.columnModel.map(col => {
                newObj = {
                    columnName: col.columnName,
                    columnType: col.columnType,
                    columnValue: ''
                };
                if(col.columnName === 'operator') {
                    newObj['operatorLHSColumn'] = col.operatorLHSColumn; 
                    newObj['operatorRHSColumn'] = col.operatorRHSColumn;
                }
                rowData.push(newObj);
            });
            columnData.push(rowData);
        } else {
            columnData = props.columnData;
        }
        this.state = {
            columnModel: props.columnModel || [],
            columnData: columnData || [],
            selectedJobsList: props.selectedJobsList || [],
            showCreateRulePopup: false,
            defaultColumn: '',
            defaultColumnValue: '',
            defaultOutputColumn: ''
        };
        this.onCellUpdate = this.onCellUpdate.bind(this);
        this.addClickRow = this.addClickRow.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(JSON.stringify(nextProps.columnModel) !== JSON.stringify(this.state.columnModel)) {
            
            //extract new columns list
            const columnModel = nextProps.columnModel.slice();
            let newCols = [];
            columnModel.map(colmod => {
                newCols.push(colmod.columnName);
            });

            let newColumnData = [];
            this.state.columnData.map(datarow => {
                let tempNewRow = [];
                newCols.map((newcol, index) => {
                    //if column exisits
                    if(datarow[index] && datarow[index].columnName === newcol) {
                        tempNewRow.push(datarow[index]);
                    } else {
                        //if it is a newly added column
                        let newcolmod = columnModel.filter((colmod, ind) => {
                            return colmod.columnName === newcol && index === ind;
                        })[0];
                        tempNewRow.push(newcolmod);
                    }
                });
                newColumnData.push(tempNewRow);
            });
            this.setState({
                columnModel: nextProps.columnModel,
                columnData: newColumnData,
                selectedJobsList: nextProps.selectedJobsList
            });
        } else {
            this.setState({
                selectedJobsList: nextProps.selectedJobsList
            });
        }
    }

    addClickRow = evt => {
        let columnModel = this.state.columnModel.slice();
        let columnData = this.state.columnData.slice();
        columnData.push(columnModel);
        this.setState({
            columnData: columnData
        });
    }

    removeRow = index => {
        let { columnData } = this.state;
        columnData.splice(index, 1);
        this.setState({ columnData });
    }

    //triggered on every input change
    onCellUpdate = (rowIndex, colIndex, value) => {
        this.setState(state => {
            const data = state.columnData.slice();
            data[rowIndex][colIndex] = { ...data[rowIndex][colIndex], ...{columnValue: value} };
            return { data };
        }, () => {


            //TODO this code is to be deleted
            console.info("updated columnData", this.state.columnData);
            let rulesArray = [];
            this.state.columnData.map((datarow, rowIndex) => {
                let ruleJSON = {}, associations = {};
                datarow.map(data => {
                    if(data.columnType === 'operator') {
                        associations[data.operatorLHSColumn + '-' + data.operatorRHSColumn] = data.columnValue || 'None';
                    } else {
                        ruleJSON[data.columnName] = data.columnValue || '';
                    }
                    if(data.columnType === 'output' && data.columnValue !== '') {
                        ruleJSON['outputColumn'] = data.columnName;
                    }
                });
                ruleJSON['associations'] = associations;
                ruleJSON['pocessing_order'] = rowIndex+1;
                rulesArray.push({['rule'+(rowIndex+1)] : ruleJSON});
            });
            console.info('updated rules array', rulesArray);
            //TODO this code is to be deleted


        });
    }
  
    handleChange = evt => {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    submitForm = evt => {
        evt.preventDefault();
        let rulesArray = [];
        let { columnData, columnModel, defaultColumn, defaultColumnValue, defaultOutputColumn } = this.state;

        //generate JSON for API

        //step 1 - generate all rules JSON
        columnData.map((datarow, rowIndex) => {
            let ruleJSON = {}, associations = {};
            datarow.map(data => {
                if(data.columnType === 'operator') {
                    associations[data.operatorLHSColumn + '-' + data.operatorRHSColumn] = data.columnValue || 'None';
                } else {
                    ruleJSON[data.columnName] = data.columnValue || '';
                }
                if(data.columnType === 'output' && data.columnValue !== '') {
                    ruleJSON['outputColumn'] = data.columnName;
                }
            });
            ruleJSON['associations'] = associations;
            ruleJSON['pocessing_order'] = rowIndex+1;
            rulesArray.push({['rule'+(rowIndex+1)] : ruleJSON});
        });

        //step 2- generate default rule JSON (if any)
        if(defaultColumn) {
            let tmpJSON = {};
            columnModel.map((col, colIndex) => {
                if(col.columnName === 'exclude') {
                    tmpJSON[col.columnName] = 'NONE';
                } else if (col.columnName !== defaultColumn && col.columnType !== 'operator') {
                    tmpJSON[col.columnName] = '*';
                }
            });
            tmpJSON[defaultColumn] = defaultColumnValue;

            if(defaultOutputColumn) {
                tmpJSON['outputColumn'] = defaultOutputColumn;
            } else {
                tmpJSON['outputColumn'] = (rulesArray[0]['rule1'] && rulesArray[0]['rule1'].outputColumn) || '';
            }

            rulesArray.push({['default'] : tmpJSON});
        }

        //send to API
        console.info('rulesArray for API', rulesArray);

        this.props.saveRulesData(rulesArray);

    }
    render() {
        let { columnModel, columnData, selectedJobsList } = this.state;
        let outputCols = [];
        columnModel.map((tv, ti) => {
            return (tv !== undefined && tv.columnType === 'output' ? outputCols.push(tv.columnName) : '');
        });
        return (
            <div className="App">
                <div className="mainPanel d-flex">
                    <div className="rightSide">
                        <div className="rulesContainer p-3">
                            <div className="tableList tableListNew">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>SubRule</th>
                                            <th></th>
                                            {columnModel.map((tv, ti) => {
                                                return (tv !== undefined && 
                                                (tv.columnType === 'exclude' ? 
                                                    (<th key={ti}>exclude</th>) : 
                                                    (tv.columnType === 'input' ? 
                                                        <th key={ti} style={{color: 'red'}}>{tv.columnName}</th> : 
                                                        (tv.columnType === 'operator' ? 
                                                            <th key={ti} style={{color: 'red'}}>{tv.columnName}</th> : 
                                                            (tv.columnType === 'output' ? 
                                                                <th key={ti} data-columntype="output" style={{color: 'green'}}>{tv.columnName}</th> : '')
                                                        )
                                                    )
                                                )
                                            )})}
                                        </tr>
                                    </thead>
                                    {columnData.length ? <tbody>
                                        {columnData.map((rowData, rowIndex) => {
                                            return <tr key={rowIndex}>
                                                <td>{rowIndex+1}</td>
                                                <td><span className="minusBtn btn btn-outline-primary" onClick={e => this.removeRow(rowIndex)}><FontAwesomeIcon icon={faMinus} /></span></td>
                                                {rowData && rowData.length && rowData.map((colData, colIndex) => {
                                                    return <td key={colIndex} data-columntype={(colData.columnType === 'output') ? "output" : ''}>
                                                    {colData.columnType === 'operator' ? 
                                                        <select defaultValue={colData.columnValue} className="form-control" 
                                                            onChange={e => this.onCellUpdate(rowIndex, colIndex, e.target.value)}>
                                                            <option>Select Operator</option>
                                                            <option value="and">and</option>
                                                            <option value="or">or</option>
                                                        </select> : 
                                                        (colData.columnType === 'input' || colData.columnType === 'output' ? 
                                                            (<input placeholder={'Enter '+colData.columnName+' Value'} type="text" value={colData.columnValue} defaultValue={colData.columnValue} className="form-control" 
                                                                onChange={e => this.onCellUpdate(rowIndex, colIndex, e.target.value)}/>) : 
                                                                (colData.columnType === 'exclude' ? 
                                                                    <Select closeMenuOnSelect={true} components={animatedComponents} 
                                                                        value={selectedJobsList.filter(option => option.label === colData.columnValue)}
                                                                        options={selectedJobsList} onChange={e => this.onCellUpdate(rowIndex, colIndex, e.value)} /> : ''
                                                                )
                                                        )
                                                    }
                                                    </td>
                                                })}
                                            </tr>
                                        })}
                                    </tbody> : ''}
                                </table>
                            </div>
                        </div>
                        {columnData.length ? <center>
                            <span className="addRowSec col-6"><span className="btn btn-primary" onClick={this.addClickRow}>Add New Sub-Rule</span></span>&nbsp;&nbsp;&nbsp;
                            <span className="col-6"><button type="button" className="btn btn-success" onClick={e => this.setState({showCreateRulePopup: true})}>Create Rule</button></span>
                        </center> : ''}
                        {/* show save rule popup */}
                        <div className="modal-backdrop fade show" style={{"zIndex" : 999999, display: this.state.showCreateRulePopup ? 'block' : 'none'}}></div>
                        <div className="modal fade show" style={{display: this.state.showCreateRulePopup ? 'block' : 'none'}} id="createRuleModalDialog" tabIndex="-1" role="dialog" aria-labelledby="createRuleModalDialogTitle" aria-hidden="true">
                            <div className="modal-dialog modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Create Rule</h5>
                                        <button type="button" className="close" data-dismiss="modal" onClick={e => this.setState({showCreateRulePopup: false, defaultColumn: '', defaultColumnValue: '', defaultOutputColumn: ''})} aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form id="saveRuleForm" onSubmit={this.submitForm} autoComplete="off" data-form-index="0">
                                            <div className="modal-body">
                                                <div className="form-group row">
                                                    <label htmlFor="defaultColumn" className="col-sm-3 col-form-label">Select Default Column</label>
                                                    <div className="col-sm-9">
                                                        <select value={this.state.defaultColumn} id="defaultColumn" name="defaultColumn" className="form-control" onChange={this.handleChange}>
                                                            <option value="">Select Default Column</option>
                                                            {columnModel.map((tv, ti) => {
                                                                return (tv !== undefined && tv.columnType === 'input' ? <option key={'select-'+tv.columnName} value={tv.columnName}>{tv.columnName}</option> : '')
                                                            })}
                                                        </select>
                                                    </div>                                            
                                                </div>
                                                {this.state.defaultColumn ? <div className="form-group row">
                                                    <label htmlFor="defaultColumnValue" className="col-sm-3 col-form-label">Default Column Value<strong style={{color:"red"}}>*</strong></label>
                                                    <div className="col-sm-9">
                                                        <input value={this.state.defaultColumnValue} required id="defaultColumnValue" name="defaultColumnValue" className="form-control" onChange={this.handleChange} />
                                                    </div>                                            
                                                </div> : ''}
                                                {this.state.defaultColumn && outputCols.length > 1 ? <div className="form-group row">
                                                    <label htmlFor="defaultOutputColumn" className="col-sm-3 col-form-label">Default Output Column</label>
                                                    <div className="col-sm-9">
                                                        <select value={this.state.defaultOutputColumn} id="defaultOutputColumn" name="defaultOutputColumn" className="form-control" onChange={this.handleChange}>
                                                            <option value="">Select Default Output Column</option>
                                                            {columnModel.map((tv, ti) => {
                                                                return (tv !== undefined && tv.columnType === 'output' ? <option key={'select-'+tv.columnName} value={tv.columnName}>{tv.columnName}</option> : '')
                                                            })}
                                                        </select>
                                                    </div>                                            
                                                </div> : ''}
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={e => this.setState({showCreateRulePopup: false, defaultColumn: '', defaultColumnValue: '', defaultOutputColumn: ''})}>Close</button>
                                                <button type="submit" className="btn btn-primary">Submit Rule</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
