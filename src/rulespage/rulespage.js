import React, { Component, useState, Fragment } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import data from '../data/data.json';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import RulesTable from './RulesTable';


const animatedComponents = makeAnimated();

export default class Rulespage extends Component {
    constructor(props) {
        super(props);



        this.wrapper = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addClick = this.addClick.bind(this);
        this.state = {
            rulesActive: true,
            ruleName: '',
            fullRulesData: [],
            leftSideData: Object.values(data),
            rulesList: [],
            rulesdata: [],
            dataVal: [],
            tableDataList: [], // Ajay - why using state variables as temporary variables ?
            tableDataListNew: new Array(),
            rows: [],
            dta: [],
            columnFields: [{ colName: "", colValue: "" }],
            joblist: [
                { value: 'jobname1', label: 'Jobname1' },
                { value: 'jobname2', label: 'Jobname2' },
                { value: 'jobname3', label: 'Jobname3' },
                { value: 'jobname4', label: 'Jobname4' },
            ],
            fieldsList: [],
            fieldsListNew: [],
            fieldsListThead: [],
            selJobList: new Array(),
            colData: [],
            objVal: new Array(),
            escuSelBox: new Array(),
            activeLink: null,
            dataNewVal: [],
            selectedValue: '',
            conArrayVal: '',
            conArray: '',

            columnData: [],
            colModel: [],
            selectedJobsData: [],
            //Harshit - new variables for creating grid
            columnModel: [],
            columnData: [],
            selectedJobsList: [],

        };

        for (let c = 0; c < this.state.leftSideData.length; c++) {
            this.state.rulesList.push(Object.values(this.state.leftSideData[c].RULES))
            this.state.tableDataList.push(Object.values(this.state.rulesList[c]))
            const dataNewVal = this.state.leftSideData[c]
            dataNewVal['id'] = c
            dataNewVal['className'] = 'listLi'
            this.state.dataNewVal.push(dataNewVal)

        }

    }



    deleteRow = (index) => {
        let newRows = []
        if (window.confirm("Delete the item?")) {
            newRows = this.state.dataNewVal.slice(0, index).concat(this.state.dataNewVal.slice(index + 1));
        } else {
            return false
        }

        this.setState({
            dataNewVal: newRows,
        });
    }

    ruleClick = (status) => {
        this.setState({
            rulesActive: status
        })
    }

    listClick = (index) => {
        let ruleName = this.state.leftSideData[index].ruleName
        this.state.tableShowData = true;
        this.state.createRuleShow = true
        let rulesdata = Object.values(this.state.leftSideData[index])
        let dta = rulesdata[2].split(',');
        const dataVal = []
        for (let c = 0; c < dta.length; c++) {
            const element = dta[c];
            dataVal.push({ 'label': element, value: c })
        }
        let tableDataListNew = []
        let simData = ''
        for (let v = 0; v < this.state.conArrayVal.length; v++) {
            simData = [this.state.conArrayVal[v]]
            tableDataListNew.push(simData)

        }
        this.state.dataVal = dataVal;

        // Grid Table
        let newArrList = this.state.tableDataList
        let arrData = []

        for (let a = 0; a < newArrList.length; a++) {
            const ec = newArrList[index];
            arrData = []
            for (let b = 0; b < ec.length; b++) {
                arrData.push(ec[b]);
            }

        }

        let eleValues = new Array
        let eleValuesList = new Array
        let outValue = []
        for (let v = 0; v < arrData.length; v++) {
            outValue.push(arrData[v].outputColumn)
            const { exclude, pocessing_order, associations, outputColumn, ...arrDataDel } = arrData[v];
            eleValues = []
            Object.keys(arrDataDel).forEach((element, i) => {
                let elData = Object.values(arrDataDel)
                eleValues.push({ 'columnName': element, 'columnValue': elData[i] })
            });
            for (const prop in eleValues) {
                const dval = outValue[0]
                eleValues[prop].columnType = "input"
                let objIndexVal = eleValues.findIndex((obj => obj.columnName == dval));
                eleValues[objIndexVal].columnType = "output"
            }
            eleValuesList.push(eleValues)
        }
        console.log('arrData', eleValuesList)


        console.log('XYZ', this.state.columnModel)

        let inputs = eleValues, columnModel = [], columnData = [];
        let inputColumns = [], outputColumns = [], inputCol = [];
        Object.values(inputs).map(obj => {
            if (obj.columnType === 'input') {
                inputCol.push({
                    columnName: obj.columnName,
                    columnType: obj.columnType,
                    columnValue: obj.columnValue
                });
            }
            if (obj.columnName === outValue[0]) {
                outputColumns.push({
                    columnName: obj.columnName,
                    columnType: 'output',
                    columnValue: obj.columnValue
                });
            }
        });
        inputCol.map((obj, i) => {
            inputColumns.push(obj);
            if (i + 1 !== inputCol.length)
                inputColumns.push({
                    columnName: "operator",
                    columnType: "operator",
                    columnValue: "",
                    operatorLHSColumn: obj.operatorLHSColumn,
                    operatorRHSColumn: inputCol[i + 1].operatorRHSColumn
                });
        });
        let excludeCol = [{
            columnName: "exclude",
            columnType: "exclude",
            columnValue: ""
        }];
        inputs = excludeCol.concat(inputColumns);
        columnModel = inputs.concat(outputColumns);

        const dataRowsall = columnData.slice();
        let newObj = {};
        if (!dataRowsall.length) {
            let rowData = [];
            columnModel.map(col => {
                newObj = {
                    columnName: col.columnName,
                    columnType: col.columnType,
                    columnValue: col.columnValue
                };
                if (col.columnName === 'operator') {
                    newObj['operatorLHSColumn'] = col.operatorLHSColumn;
                    newObj['operatorRHSColumn'] = col.operatorRHSColumn;
                }
                rowData.push(newObj);
            });
            columnData.push(rowData);
        } else {
            columnData = columnData;
        }
        columnData.push(columnModel);


        this.setState({
            tableDataListNew: tableDataListNew,
            dta: dta,
            dataVal: this.state.dataVal,
            activeLink: index,
            selectedValue: Object.values(dataVal),
            columnModel: columnModel,
            columnData: columnData,
            ruleName: ruleName
        });
    }

    inputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    // Job links Dropdown change event
    onOptionChange = (selectedOptions) => {
        this.setState({
            selJobList: selectedOptions,
            selectedJobsList: selectedOptions
        });
    };


    addClick() {
        this.setState(prevState => ({
            columnFields: [...prevState.columnFields, { colName: "", colValue: "" }]
        }))
    }

    // Col fields html
    createUI() {
        return this.state.columnFields.map((el, i) => (
            <div key={i} className="rowDiv d-flex justify-content-between mb-3">
                <div className="row flex-fill">
                    <div className="col-md-6">
                        <input required autoComplete="off" className="form-control" placeholder="Column Name" name="colName" value={el.colName || ''} onChange={this.handleChange.bind(this, i)} />
                    </div>
                    <div className="col-md-6">
                        {/*<input className="form-control" placeholder="Column Value" name="colValue" value={el.colValue || ''} onChange={this.handleChange.bind(this, i)} />*/}
                        <select required className="form-control" placeholder="Column Value" name="colValue" value={el.colValue || ''} onChange={this.handleChange.bind(this, i)}>
                            <option value="">Select Column Type</option>
                            <option value="input">Input</option>
                            <option value="output">Output</option>
                        </select>
                    </div>
                </div>
                <div className="rowAct ml-3">
                    <span className="minusBtn btn btn-outline-primary" onClick={this.removeClick.bind(this, i)}><FontAwesomeIcon icon={faMinus} /></span>

                </div>
            </div>
        ));
    }

    handleChange(i, e) {
        const { name, value } = e.target;
        let columnFields = [...this.state.columnFields];
        columnFields[i] = { ...columnFields[i], [name]: value };
        this.setState({ columnFields });
    }

    removeClick(i) {
        let columnFields = [...this.state.columnFields];
        columnFields.splice(i, 1);
        this.setState({ columnFields });
    }



    // Add col Submit
    handleSubmit(event) {


        event.preventDefault();
        if (this.state.columnFields[0].colName == '') {
            alert('Column name empty')
        } else {

            for (let e = 0; e < this.state.columnFields.length; e++) {
                if (this.state.columnFields[e].colName == null) {
                    alert('Column name empty')
                    return false
                }
            }
            let names = [];
            this.state.columnFields.forEach((item) => {
                if (!names.some(val => val === item)) {
                    names.push(item.colName);
                }
            })
            let map = {};
            let result = false;
            for (let i = 0; i < names.length; i++) {
                if (map[names[i]]) {
                    result = true;
                    break;
                }
                map[names[i]] = true;
            }
            if (result) {
                alert('Column name already exist')
                return false
            }

            for (let index = 0; index < this.state.objVal.length; index++) {
                const element = this.state.objVal[index].colName;
                for (let u = 0; u < this.state.columnFields.length; u++) {
                    if (this.state.columnFields[u].colName == element) {
                        alert('Column name already exist', JSON.stringify(this.state.columnFields[u].colName))
                        return false
                    }
                }
            }
            let newArrData = []
            let newArrDataTd = []
            for (let v = 0; v < this.state.columnFields.length; v++) {
                const eleth = this.state.columnFields[v].colName;
                const eletd = this.state.columnFields[v].colValue
                newArrData.push(eleth)
                newArrDataTd.push(eletd)
            }

            this.state.addRowShow = true;
            this.state.colData = this.state.columnFields
            let vData = new Array()
            this.state.objVal = new Array()
            this.state.fieldsListThead = []
            const escuSelBox = new Array()
            const selJobList = this.state.selJobList


            for (let x = 0; x < this.state.colData.length; x++) {
                const element = this.state.colData[x];
                vData.push(element)
                vData[x]['exclude'] = selJobList;
            }

            for (let w = 0; w < selJobList.length; w++) {
                escuSelBox.push({ 'label': selJobList[w], 'value': w })
            }
            let newarrval =[]
            this.state.escuSelBox = escuSelBox;
            newarrval.push(vData)
            this.state.fieldsList = newarrval;
            for (let y = 0; y < this.state.colData.length; y++) {
                this.state.colData[y] = []
                this.state.colData.splice(event, this.state.colData.length);
                this.state.colData[y] = Object.values(this.state.columnFields)
            }
            for (let b = 0; b < this.state.fieldsList.length; b++) {
                const valueResult = Object.values(this.state.fieldsList[b])
                for (let u = 0; u < valueResult.length; u++) {
                    this.state.objVal.push(valueResult[u])
                }
            }
            console.log('objVal', this.state.objVal)
            this.state.fieldsListThead[0] = Object.values(this.state.objVal)
            for (let v = 0; v < this.state.fieldsList.length; v++) {
                this.state.fieldsList = this.state.fieldsListNew
                this.state.fieldsList[v] = Object.values(this.state.objVal)
            }
        }

        console.log('newdata', this.state.columnModel)
        //Harshit - add newly added column to the grid - START
        let inputs = this.state.objVal, columnModel = [], columnData = [];
        let inputColumns = [], outputColumns = [], inputCols = [];
        console.log('inputColumns', columnData)
        Object.values(inputs).map(obj => {
            if (obj.colValue === 'input') {
                inputCols.push({
                    columnName: obj.colName,
                    columnType: obj.colValue,
                    columnValue: ""
                });
            }
            if (obj.colValue === 'output') {
                outputColumns.push({
                    columnName: obj.colName,
                    columnType: obj.colValue,
                    columnValue: ""
                });
            }
        });
        inputCols.map((obj, i) => {
            inputColumns.push(obj);
            if (i + 1 !== inputCols.length)
                inputColumns.push({
                    columnName: "operator",
                    columnType: "operator",
                    columnValue: "",
                    operatorLHSColumn: obj.columnName,
                    operatorRHSColumn: inputCols[i + 1].columnName
                });
        });
        let excludeCol = [{
            columnName: "exclude",
            columnType: "exclude",
            columnValue: ""
        }];
        inputColumns = excludeCol.concat(inputColumns);
        columnModel = inputColumns.concat(outputColumns);
        console.info('updated columnModel', columnModel);

        //Harshit - add newly added column to the grid - END

        this.setState({
            colData: this.state.colData,
            fieldsList: this.state.fieldsList,
            fieldsListThead: this.state.fieldsListThead,
            escuSelBox: this.state.escuSelBox,
            selJobList: this.state.selJobList,
            tableDataListNew: this.state.tableDataListNew,

            //Harshit - new state variables to store data
            columnModel: columnModel,
            columnData: columnData
        })
    }

    // Create Rules
    createRules = (rulesData) => {
        if (this.state.ruleName == '') {
            alert('Rule name empty')
            return false
        }
        this.state.addRowShow = false;
        const subRule = []
        const rulArr = []
        for (let b = 0; b < this.state.fieldsList.length; b++) {
            const rule = this.state.fieldsList[b];
            const rulePara = 'rule' + b
            subRule[rulePara] = rule
        }
        console.log('subRule', subRule)


        const rulesObj = []
        rulesObj.push({
            'ruleName': this.state.ruleName,
            'RULES': subRule,
            'IMPACT': ''
        })
        //console.log('rulesObj', rulesObj)
        this.setState({
            fullRulesData: rulesObj,
            fieldsList: this.state.fieldsList,
            fieldsListThead: this.state.fieldsListThead,
            objVal: this.state.objVal
        })



        //Harshit - send to API
        const finalObj = [];
        finalObj.push({
            'ruleName': this.state.ruleName,
            'RULES': rulesData,
            'IMPACT': this.state.selectedJobsList
        });
        console.log('finalObj', finalObj)
        //make API call
    }

    // Cancel Rules
    cancelRules = () => {
        this.state.fieldsList = []
        this.state.objVal = []
        this.state.columnFields = [{ colName: "", colValue: "" }]
        this.state.fieldsListThead = []
        this.state.addRowShow = false
        this.state.dataVal = []
        this.state.createRuleShow = false
        this.setState({
            fieldsList: this.state.fieldsList,
            objVal: this.state.objVal,
            columnFields: this.state.columnFields,
            fieldsListThead: this.state.fieldsListThead,
            ruleName: '',
            dataVal: this.state.dataVal
        })
    }

    render() {


        let { colModel, columnData, selectedJobsData } = this.state;
        let colsOutput = [];
        colModel.map((tv, ti) => {
            return (tv !== undefined && tv.columnType === 'output' ? colsOutput.push(tv.columnName) : '');
        });

        const { dataNewVal, activeLink } = this.state;
        return (
            <div className="App">
                <div className="mainPanel d-flex">
                    <div className="leftSide">
                        <div className="sideTabs">
                            <ul className="d-flex m-0 p-0">
                                <li onClick={e => this.ruleClick(false)} className={!this.state.rulesActive ? 'active' : ''}>Workflow manager</li>
                                <li onClick={e => this.ruleClick(true)} className={this.state.rulesActive ? 'active' : ''}>Rule manager</li>
                            </ul>
                        </div>
                        <div className="tabContent">
                            {this.state.rulesActive ? <div>
                                <div className="rulesList">
                                    <ul>
                                        {dataNewVal.map(item => {
                                            return (
                                                <li key={item.id} className={item.className + (item.id === activeLink ? " active" : "")}>
                                                    <span className='listVal' onClick={() => this.listClick(item.id)}>{item.ruleName}</span>
                                                    <span className="delIcon" onClick={() => { this.deleteRow(item.id); }}><FontAwesomeIcon icon={faTrashAlt} /></span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div> : <div>
                                    <div className="">Workflows</div>
                                </div>}
                        </div>
                    </div>
                    {this.state.rulesActive ? <div className="rightSide">
                        <div className="rulesContainer p-3">
                            <h3 className="h3 text-center mb-4">Rules Manager</h3>
                            <div className="form-group d-flex align-items-center">
                                <label className="form-label">Rule name<em>*</em></label>
                                <div className="input-box">
                                    <input type="text" name="ruleName" value={this.state.ruleName} onChange={this.inputChange} className="form-control" />
                                </div>
                            </div>
                            <div className="form-group d-flex align-items-center">
                                <label className="form-label">Job Link<em>*</em></label>
                                <div className="flex-fill">
                                    <div className="input-box">
                                        <Select key={this.state.value} ref={this.wrapper}
                                            closeMenuOnSelect={false}
                                            components={animatedComponents} value={this.state.value}
                                            isMulti defaultValue={this.state.selectedValue}
                                            options={this.state.joblist} onChange={this.onOptionChange}
                                        />
                                    </div>

                                </div>


                            </div>

                            <hr />
                            <div className="form-group">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="btmAct d-flex align-items-center mb-3">
                                        <label className="form-label w-auto mb-0">Column Definition<em>*</em></label>
                                        <div className="actDiv ml-4">
                                            <span className="addBtn btn btn-outline-primary" onClick={this.addClick}><FontAwesomeIcon icon={faPlus} /></span>
                                        </div>
                                    </div>
                                    <div className="colFields">
                                        {this.createUI()}
                                    </div>
                                    <div className="btmAct d-flex">
                                        <div className="actDiv">
                                            <button className="btn btn-primary mr-2" type="submit">Add as Column</button>
                                        </div>
                                    </div>
                                </form>


                            </div>

                            <hr />
                            {this.state.columnModel.length ? <RulesTable columnModel={this.state.columnModel} selectedJobsList={this.state.selectedJobsList} columnData={this.state.columnData} saveRulesData={this.createRules} /> : ''}


                            {this.state.createRuleShow ? <div className="mt-4 text-center">
                                <span className="btn btn-primary mr-1" onClick={this.cancelRules}>Cancel Rules</span>
                                <span className="btn btn-primary ml-1" onClick={this.createRules}>Create Rules</span>
                            </div> : null}
                        </div>
                    </div> : 'workflow'}
                </div>
            </div>
        )
    }
}
