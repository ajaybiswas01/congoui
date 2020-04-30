import React, { Component } from 'react';
import Select from 'react-select';
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
            props.columnModel.map(col => {
                newObj = {
                    columnName: col.columnName,
                    columnType: col.columnType,
                    columnValue: ''
                };
                rowData.push(newObj);
            });
            columnData.push(rowData);
        }
        this.state = {
            columnModel: props.columnModel || [],
            columnData: columnData || [],
            selectedJobsList: props.selectedJobsList || []
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            columnModel: nextProps.columnModel,
            selectedJobsList: nextProps.selectedJobsList
        });
    }

    addClickRow = evt => {
        let { columnModel, columnData } = this.state;
        let rowData = [], newObj = {};
        columnModel.map(col => {
            newObj = {
                columnName: col.columnName,
                columnType: col.columnType,
                columnValue: ''
            };
            rowData.push(newObj);
        });
        columnData.push(rowData);
        this.setState({
            columnData: columnData
        });
    }

    render() {
        
        return (
            <div className="App">
                <div className="mainPanel d-flex">
                    <div className="rightSide">
                        <div className="rulesContainer p-3">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        {this.state.columnModel.map((tv, ti) => {
                                            return (tv !== undefined && (tv.columnType === 'input' ? (<th key={ti} style={{color: 'red'}}>input</th>) : (tv.columnName === 'operator' ? <th key={ti} style={{color: 'red'}}>operator</th> : '')))
                                        })}
                                        {this.state.columnModel.map((tv, ti) => {
                                            return (tv !== undefined && tv.columnType === 'output' && <th key={ti} style={{color: 'green'}}>output</th>)
                                        })}
                                    </tr>
                                    <tr>
                                        <th>exclude</th>
                                        {this.state.columnModel.map((tv, ti) => {
                                            return (tv !== undefined && (tv.columnType === 'input' ? (<th key={ti} style={{color: 'red'}}>{tv.columnName}</th>) : (tv.columnName === 'operator' ? <th key={ti} style={{color: 'red'}}>operator</th> : '')))
                                        })}
                                        {this.state.columnModel.map((tv, ti) => {
                                            return (tv !== undefined && tv.columnType === 'output' && <th key={ti} style={{color: 'green'}}>{tv.columnName}</th>)
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.columnData.length && this.state.columnData.map(rowData => {
                                        return <tr>
                                            <td>
                                                <Select closeMenuOnSelect={true}
                                                    components={animatedComponents}
                                                    options={this.state.selectedJobsList} onChange={e => this.onOptionChange(e)}
                                                    />
                                            </td>
                                            {rowData && rowData.length && rowData.map(rowData => {
                                                return <td>
                                                {rowData.columnType === 'operator' ? 
                                                    <select defaultValue={rowData.columnValue}>
                                                        <option>select op</option>
                                                        <option value="and">and</option>
                                                        <option value="or">or</option>
                                                    </select> : 
                                                    <input type="text" defaultValue={rowData.columnValue} />}
                                                </td>
                                            })}
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                            {this.state.columnData.length ? <div className="addRowSec"><span className="btn btn-primary" onClick={this.addClickRow}>Add new row</span></div> : null}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
