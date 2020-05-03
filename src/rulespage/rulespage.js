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
        this.wrapperSel = React.createRef();
        this.addNewRow = this.addNewRow.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addClickRow = this.addClickRow.bind(this);
        this.addClick = this.addClick.bind(this);
        this.state = {
            rulesActive: true,
            ruleName: '',
            fullRulesData: [], // Ajay - no need for this variable to be in state
            leftSideData: Object.values(data),
            rulesList: [],
            rulesdata: [],
            tabaleTdData: [], // Ajay - no need for this variable to be in state
            tabaleTdDataNew: new Array(), // Ajay - no need for this variable to be in state
            dataVal: [],
            columnName: '', // Ajay - no need for this variable to be in state
            columnValue: '', // Ajay - no need for this variable to be in state
            colValue: '', // Ajay - no need for this variable to be in state
            theadData: new Array(),
            datashowVal: [], // Ajay - no need for this variable to be in state
            tableDataList: [], // Ajay - why using state variables as temporary variables ?
            tableDataListNew: new Array(),
            rows: [],
            dta: [], // Ajay - no need for this variable to be in state
            users: [{ colName: "", colValue: "" }], // Ajay - why variable is named users ?
            joblist: [
                { value: 'jobname1', label: 'Jobname1' },
                { value: 'jobname2', label: 'Jobname2' },
                { value: 'jobname3', label: 'Jobname3' },
                { value: 'jobname4', label: 'Jobname4' },
            ],
            fieldsList: [],
            fieldsListNew: [],
            fieldsListThead: [],
            newarrval: [], // Ajay - why using state variables as temporary variables ?
            vData: new Array(), // Ajay - why using state variables as temporary variables ?
            selJobList: new Array(),
            colData: [],
            objVal: new Array(),
            escuSelBox: new Array(),
            activeLink: null,
            dataNewVal: [],
            selectedValue:'',


            //Harshit - new variables for creating grid
            columnModel: [],
            columnData: [],
            selectedJobsList: []

        };
        for (let c = 0; c < this.state.leftSideData.length; c++) {
            this.state.rulesList.push(Object.values(this.state.leftSideData[c].RULES))
            this.state.tableDataList.push(Object.values(this.state.rulesList[c]))

            for (let b = 0; b < this.state.tableDataList[c].length; b++) {
                this.state.theadData.push(Object.keys(this.state.tableDataList[c][b]))
                this.state.tableDataListNew.push(Object.values(this.state.tableDataList[c][b]))
            }
            
            const dataNewVal = this.state.leftSideData[c]
            dataNewVal['id'] = c
            dataNewVal['className'] = 'listLi'
            this.state.dataNewVal.push(dataNewVal)

        }
        Array.prototype.move = function(from, to) {
            this.splice(to, 0, this.splice(from, 1)[0]);
        };
        
    }

    // Ajay - why initializing state variables here
    state = {
        addRowShow: false,
        errorMsg: true,
        createRuleShow:false,
        tableShowData:false
    }

    deleteRow = (index) => {
        var newRows=[]
        if (window.confirm("Delete the item?")) {
            newRows = this.state.dataNewVal.slice(0, index).concat(this.state.dataNewVal.slice(index + 1));
        }else{
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
        this.state.ruleName = this.state.leftSideData[index].ruleName
        this.state.tableShowData= true;
        this.state.createRuleShow=true

        this.state.tableDataListNew = [];

        this.state.datashowVal = this.state.rulesList[index];
        this.state.rulesdata = Object.values(this.state.leftSideData[index])
        this.state.dta = this.state.rulesdata[2].split(',');

        // grid data
        var arrX = [], arrY = [], arrZ = [], i = 0, j = 0, newArr = [];
        this.state.datashowVal.forEach((item, ind) => {
            arrY[j] = [];
            newArr = Object.values(item);
            newArr.forEach((vt, it) => {
                if (arrX.indexOf(it) < 0) {
                    arrX[i] = it;
                    i++
                }
                arrY[j][it] = vt;
            });
            j++
        });
        arrY.forEach((vt, it) => {
            arrZ[it] = [];
            for (let n = 0; n < arrX.length; n++) {
                arrZ[it][n] = vt[arrX[n]] ? vt[arrX[n]] : '';

            }
        });
        const dataVal = []
        for (let c = 0; c < this.state.dta.length; c++) {
            const element = this.state.dta[c];
            dataVal.push({ 'label': element, value: c })
        }

        for (let t = 0; t < this.state.theadData.length; t++) {
            this.state.theadData[t].move(this.state.theadData[t].length - 1,1)
        }
        for (let f = 0; f < this.state.tableDataListNew.length; f++) {
            this.state.tableDataListNew[f].move(this.state.tableDataListNew[f].length - 1,1)
        }
        
        console.log('dataVal', Object.values(dataVal[0]))
        this.state.tableDataListNew=arrZ
        console.log('tableDataListNew',this.state.tableDataListNew)
        this.state.dataVal = dataVal;
        this.setState({
            tableDataListNew: arrZ,
            dta: this.state.dta,
            dataVal: this.state.dataVal,
            activeLink: index,
            selectedValue:Object.values(dataVal)
        });
    }
  
    inputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    addNewRow(e) {
        this.state.tabaleTdData = []
        let updated = this.state.rulesList.slice();
        const pushDataFull = new Array();
        for (let x = 0; x < this.state.tableDataListNew.length; x++) {
            pushDataFull.push(this.state.tableDataListNew[x]);
        }
        this.state.tableDataListNew.forEach((element, index) => {
            element = (pushDataFull[index] != undefined ? pushDataFull[index] : '')
        });
        this.setState({ tableDataListNew: this.state.tableDataListNew });
    }

    // Job links Dropdown change event
    onOptionChange = (selectedOptions) => {
        this.setState({
            selJobList: selectedOptions,
            selectedJobsList: selectedOptions
        });
    };

    // Esclude Dropdwon
    onOptionSubChange = (selectedval) => {
        console.log('selectedval', selectedval)
    }

    addClick() {
        this.setState(prevState => ({
            users: [...prevState.users, { colName: "", colValue: "" }]
        }))
    }

    // Col fields html
    createUI() {
        return this.state.users.map((el, i) => (
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
        let users = [...this.state.users];
        users[i] = { ...users[i], [name]: value };
        this.setState({ users });
    }

    removeClick(i) {
        let users = [...this.state.users];
        users.splice(i, 1);
        this.setState({ users });
    }

    // Add col Submit
    handleSubmit(event) {

        this.state.errorMsg = false
        
        event.preventDefault();
        let newarr = [];
        if (this.state.users[0].colName == '') {
            alert('Column name empty')
        } else {

            for (let e = 0; e < this.state.users.length; e++) {
                if (this.state.users[e].colName == null) {
                    alert('Column name empty')
                    return false
                }
            }
            var names = [];
            this.state.users.forEach((item) => {
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
                for (let u = 0; u < this.state.users.length; u++) {
                    if (this.state.users[u].colName == element) {
                        alert('Column name already exist', JSON.stringify(this.state.users[u].colName))
                        return false
                    }
                }
            }
            var newArrData=[]
            var newArrDataTd=[]
            for (let v = 0; v < this.state.users.length; v++) {
                const eleth = this.state.users[v].colName;
                const eletd = this.state.users[v].colValue
                newArrData.push(eleth)
                newArrDataTd.push(eletd)
            }
            for (let index = 0; index < this.state.theadData.length; index++) {
                const element = this.state.theadData[index];
                for (let b = 0; b < newArrData.length; b++) {
                    element.push(newArrData[b])
                }
            }
            for (let f = 0; f < this.state.tableDataListNew.length; f++) {
                const element = this.state.tableDataListNew[f];
                for (let j = 0; j < newArrDataTd.length; j++) {
                    element.push(newArrDataTd[j])
                }
                this.state.tableDataListNew[f]=element
            }

            this.state.addRowShow = true;
            this.state.colData = this.state.users
            this.state.vData = new Array()
            this.state.objVal = new Array()
            this.state.fieldsListThead = []
            const escuSelBox = new Array()
            const selJobList = this.state.selJobList


            for (let x = 0; x < this.state.colData.length; x++) {
                const element = this.state.colData[x];
                this.state.vData.push(element)
                this.state.vData[x]['exclude'] = selJobList;
            }

            for (let w = 0; w < selJobList.length; w++) {
                escuSelBox.push({ 'label': selJobList[w], 'value': w })
            }
            this.state.escuSelBox = escuSelBox;
            this.state.newarrval.push(this.state.vData)
            this.state.fieldsList = this.state.newarrval;
            for (let y = 0; y < this.state.colData.length; y++) {
                this.state.colData[y] = []
                this.state.colData.splice(event, this.state.colData.length);
                this.state.colData[y] = Object.values(this.state.users)
            }
            for (let b = 0; b < this.state.fieldsList.length; b++) {
                const valueResult = Object.values(this.state.fieldsList[b])
                for (let u = 0; u < valueResult.length; u++) {
                    this.state.objVal.push(valueResult[u])
                }
            }
            console.log('u', this.state.objVal)
            this.state.fieldsListThead[0] = Object.values(this.state.objVal)
            for (let v = 0; v < this.state.fieldsList.length; v++) {
                this.state.fieldsList = this.state.fieldsListNew
                this.state.fieldsList[v] = Object.values(this.state.objVal)
            }
        }
        

        //Harshit - add newly added column to the grid - START
        let inputs = this.state.objVal;
        let inputColumns = [], outputColumns = [], inputCols = [];
        Object.values(this.state.objVal).map(obj => {
            if(obj.colValue === 'input') {
                inputCols.push({
                    columnName: obj.colName,
                    columnType: obj.colValue,
                    columnValue: ""
                });
            }
            if(obj.colValue === 'output') {
                outputColumns.push({
                    columnName: obj.colName,
                    columnType: obj.colValue,
                    columnValue: ""
                });
            }
        });
        inputCols.map((obj,i) => {
            inputColumns.push(obj);
            if(i+1 !== inputCols.length)
                inputColumns.push({
                    columnName: "operator",
                    columnType: "operator",
                    columnValue: "",
                    operatorLHSColumn: obj.columnName,
                    operatorRHSColumn: inputCols[i+1].columnName
                });
        });
        let excludeCol = [{
            columnName: "exclude",
            columnType: "exclude",
            columnValue: ""
        }];
        inputColumns = excludeCol.concat(inputColumns);
        newarr[0] = inputColumns.concat(outputColumns);
        //Harshit - add newly added column to the grid - END



        this.setState({
            colData: this.state.colData,
            fieldsList: this.state.fieldsList,
            fieldsListThead: this.state.fieldsListThead,
            escuSelBox: this.state.escuSelBox,
            selJobList: this.state.selJobList,
            tableDataListNew:this.state.tableDataListNew,

            //Harshit - new state variables to store data
            columnModel: newarr[0],
            columnData: []
        })
    }

    // Add row
    addClickRow(e) {
        var nextState = this.state;

        nextState.fieldsListNew.push(this.state.objVal);
        
        nextState.fieldsList = nextState.fieldsListNew
        const resultss = Object.keys(this.state.fieldsList).map((key) => this.state.fieldsList[key])

        
        console.log('resultss', resultss)
        this.setState({
            fieldsList: nextState.fieldsList,
            fieldsListNew: nextState.fieldsListNew
        })
        
        console.log('new row', Object.values(nextState.fieldsList))
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
        console.log('rulesObj', rulesObj)
        this.state.fullRulesData = rulesObj        
        this.setState({
            fullRulesData: this.state.fullRulesData,
            fieldsList: this.state.fieldsList,
            fieldsListThead: this.state.fieldsListThead,
            objVal: this.state.objVal
        })



        //Harshit - send to API
        const finalObj=[];
        finalObj.push({
            'ruleName': this.state.ruleName,
            'RULES': rulesData,
            'IMPACT': this.state.selectedJobsList
        });
        //make API call
    }

    // Cancel Rules
    cancelRules=()=>{
        this.state.tableDataListNew=[] // Ajay - why doing this way?
        this.state.fieldsList = []
        this.state.theadData[0] = []
        this.state.objVal=[]
        this.state.users= [{ colName: "", colValue: "" }]
        this.state.fieldsListThead=[]
        this.state.addRowShow=false
        this.state.dataVal=[]
        this.state.createRuleShow=false
        this.setState({
            fieldsList: this.state.fieldsList,
            tableDataListNew: this.state.tableDataListNew,
            theadData: this.state.theadData,
            objVal:this.state.objVal,
            users: this.state.users,
            fieldsListThead:this.state.fieldsListThead,
            ruleName:'',
            dataVal:this.state.dataVal
        })
    }

    render() {
        for (let v = 0; v < this.state.rulesList.length; v++) {
            this.state.tabaleTdData.push(Object.values(this.state.rulesList[v]))
        }
        const thdata = this.state.theadData[0].map((item, index) => 
            {return (item !== undefined || null || '' &&  <th key={index} hidden={index==0 ? true : ''}>
                {item}
            </th>)
        }
        );
        
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
                                            options={this.state.joblist} onChange={e => this.onOptionChange(e)}
                                        />
                                    </div>
                                    {/* {this.state.errorMsg ? <div className="alert alert-danger" role="alert" >Choose job name</div> : null} */}
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

                                {/* <form>
                                    {this.state.rows.map((row, i) => (
                                        <div className="row" key={i} onClick={(i) => this.colAdd(i)}>
                                            <div className="col-md-6">
                                                <label className="form-label">Column Name</label>
                                                <div className="input-box d-flex">
                                                    <input type="text" name='columnName' value={this.state.columnName} onChange={e => this.handleChange(e)} className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Column Value</label>
                                                <div className="input-box d-flex">
                                                    <div className="selBox">
                                                        <input type="text" name='columnValue' value={this.state.columnValue} onChange={e => this.handleChange(e)} className="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className="addBtnSec">
                                        <button className="addBtn btn" onClick={(e) => this.onSubmit(e)}><FontAwesomeIcon icon={faPlus} />Add as row</button>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <button onClick={this.addNewRow}>ADD</button>
                                        </div>
                                    </div>
                                </form> */}
                            </div>

                            <hr />
                            {this.state.columnModel.length ? <RulesTable columnModel={this.state.columnModel} selectedJobsList={this.state.selectedJobsList} columnData={this.state.columnData} saveRulesData={this.createRules} /> : ''}
                            

                            <div className="tableList">
                                <table className="table">
                                    <thead>
                                        {
                                            this.state.fieldsListThead.map((t, h) => (
                                                <tr key={h}>
                                                    <th>exclude</th>
                                                    {
                                                        t.map((tv, ti) => {
                                                            return (tv !== undefined && <th key={ti}>{tv.colName}</th>)
                                                        }
                                                        )
                                                    }
                                                </tr>
                                            ))
                                        }
                                    </thead>
                                    <tbody>
                                        {this.state.fieldsList.length > 0 && this.state.fieldsList.map((r, j) => (
                                            <tr key={++j}>
                                                <td key={j}>
                                                    {/* {r[0].exclude} */}
                                                    <Select key={this.state.value} value={this.state.value} ref={this.wrapperSel}
                                                        closeMenuOnSelect={true}
                                                        components={animatedComponents}
                                                        options={this.state.selJobList} onChange={e => this.onOptionSubChange(e)}
                                                    />

                                                </td>
                                                {
                                                    r.map((v, b) => {
                                                        return (v !== undefined &&
                                                            <td key={b}><input name='colValue' value={v.colValue || ''} onChange={this.inputChange} className="form-control" /></td>

                                                        )

                                                    }
                                                    )

                                                }
                                            </tr>
                                        ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            {this.state.addRowShow ? <div className="addRowSec">
                                <span className="btn btn-primary" onClick={this.addClickRow}>Add new row</span></div> : null}
                            {this.state.tableShowData ? 
                            <div className="tableList">
                                <table className="table">
                                    <thead>
                                        <tr>{thdata}</tr>
                                    </thead>

                                    <tbody>
                                        {
                                            this.state.tableDataListNew.map((numList, i) => (
                                                <tr key={i}>
                                                    {
                                                        numList.map((num, j) => {
                                                            return (num !== undefined && <td hidden={j==0 ? true : false} key={j}><input name='colValue' value={num} className="form-control" onChange={e => this.inputChange(e)} /></td>)
                                                        }
                                                        )
                                                    }
                                                </tr>
                                            ))
                                        }
                                    </tbody>

                                </table>

                            </div>
                            :null}
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
