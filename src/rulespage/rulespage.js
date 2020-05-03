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
            selectedOption: null,
            ruleName: '',
            leftSideData: Object.values(data),
            rulesList: [],
            rulesdata: [],
            keyNames: [],
            tabaleTdData: [],
            tabaleTdDataNew: new Array(),
            dataVal: [],
            columnName: '',
            columnValue: '',
            colValue: '',
            theadData: new Array(),
            datashowVal: [],
            tableDataList: [],
            tableDataListNew: new Array(),
            clickRowvalue: new Array(),
            rows: [],
            dta: [],
            newfullData: Object.values(data[0].RULES),
            getDataList: [],
            users: [{ colName: "", colValue: "" }],
            joblist: [
                { value: 'jobname1', label: 'Jobname1' },
                { value: 'jobname2', label: 'Jobname2' },
                { value: 'jobname3', label: 'Jobname3' },
                { value: 'jobname4', label: 'Jobname4' },
            ],
            fieldsList: [],
            fieldsListNew: [],
            fieldsListThead: [],
            newarrval: [],
            newarrvalThead: [],
            vData: new Array(),
            selJobList: new Array(),
            appendData: [],
            colData: [],
            valColObj: new Array(),
            objVal: new Array(),
            escuSelBox: new Array(),
            escuSelBoxStore: null,


            //new variables
            columnModel: [],
            columnData: [],
            selectedJobsList: []

        };
        for (let c = 0; c < this.state.leftSideData.length; c++) {
            this.state.rulesList.push(Object.values(this.state.leftSideData[c].RULES))
            this.state.tableDataList.push(Object.values(this.state.rulesList[c]))

            for (let b = 0; b < this.state.tableDataList[c].length; b++) {
                this.state.theadData.push(Object.keys(this.state.tableDataList[c][b]))
            }
        }
    }
    state = {
        workActive: false,
        rulesActive: false,
        listActive: false,
        addColShow: false,
        addRowShow: false,
        errorMsg: true
    }



    deleteRow = (index) => {
        console.log(index)
        const newRows = this.state.leftSideData.slice(0, index).concat(this.state.leftSideData.slice(index + 1));
        this.setState({
            leftSideData: newRows,
        });
    };
    workFlowClick = () => {
        this.setState({
            workActive: true,
            rulesActive: true,
        })
    }
    ruleClick = () => {
        this.setState({
            rulesActive: false,
            workActive: false
        })
    }
    listClick = (index) => {
        this.state.listActive = false
        this.state.clickRowvalue = [];
        this.state.tableDataListNew = [];
        this.state.keyNames = [];
        this.state.dataVal = [];

        this.state.datashowVal = this.state.rulesList[index];
        this.state.rulesdata = Object.values(this.state.leftSideData[index])
        this.state.dta = this.state.rulesdata[2].split(',');
        console.log('Full jason', this.state.datashowVal)
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
        // for (let x = 0; x < this.state.datashowVal.length; x++) {
        //     const element = this.state.datashowVal[x];
        //     this.state.clickRowvalue.push(Object.values(element))
        //     this.state.keyNames.push(Object.keys(element))
        // }
        for (let c = 0; c < this.state.dta.length; c++) {
            const element = this.state.dta[c];
            this.state.dataVal.push({ 'label': element, value: c })
        }
        this.state.tableDataListNew = arrZ

        this.setState({
            tableDataListNew: this.state.tableDataListNew,
            dta: this.state.dta,
            listActive: true
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
        // updated.push(this.state.colValue);
        this.setState({ tableDataListNew: this.state.tableDataListNew });
    }
    handleinputChange = (e) => {
        console.log('e', e.target.value)
        this.state.ruleName=e.target.value
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    inputOnChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    // onSubmit = (e) => {

    //     e.preventDefault();
    //     this.state.tabaleTdData = [];
    //     this.state.keyNames.push(this.state.columnName);
    //     const pushData = new Array();
    //     for (let x = 0; x < this.state.datashowVal.length; x++) {
    //         pushData.push(this.state.datashowVal[x][this.state.columnName]);
    //     }

    //     this.state.datashowVal.forEach((element, index) => {
    //         element[this.state.columnName] = (pushData[index] != undefined ? pushData[index] : this.state.columnValue)
    //     });
    //     this.setState({
    //         columnName: '',
    //         columnValue: '',
    //         datashowVal: this.state.datashowVal
    //     })
    //     console.log('data', this.state.datashowVal)
    // }

    onOptionChange = (selectedOption) => {
		let selectedJobsList = [];
        const selJobList = new Array()
        if (selectedOption === null) {
        } else {
            for (let s = 0; s < selectedOption.length; s++) {
                const element = selectedOption[s].value;
                selJobList.push(element)
				selectedJobsList.push({label: element, value: element});
            }
        }
        this.state.selJobList = selectedOption
        this.setState({
            selJobList: this.state.selJobList,
            objDataSel: this.state.objDataSel,
            selectedJobsList
        })
    };
    onOptionSubChange = (selectedval) => {
        console.log('selectedval',selectedval)
    }
    addClick() {
        this.setState(prevState => ({
            users: [...prevState.users, { colName: "", colValue: "" }]
        }))
    }

    createUI() {
        return this.state.users.map((el, i) => (
            <div key={i} className="rowDiv d-flex justify-content-between mb-3" onClick={this.inputClick(this, i)}>
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
        ))
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
    inputClick(i, e) {
        this.state.addColShow = true
    }
    handleSubmit(event) {

        this.state.errorMsg = false
        //alert('A name was submitted: ' + JSON.stringify(this.state.users));
        event.preventDefault();
        let newarr = [];
            if (this.state.users[0].colName == '') {
                alert('Column name empty')
            } else {
                
                for (let e = 0; e < this.state.users.length; e++) {
                    if (this.state.users[e].colName==null) {
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
                  for(let i = 0; i < names.length; i++) {
                     if(map[names[i]]) {
                        result = true;
                        break;
                     }
                     map[names[i]] = true;
                  }
                  if(result) {
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

                this.state.addRowShow = true;
                this.state.colData = this.state.users
                this.state.vData = new Array()
                this.state.objVal = new Array()
                this.state.fieldsListThead = []
                this.state.valColObj = new Array()
                const escuSelBox=new Array()
                const selJobList=this.state.selJobList

                
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
                this.state.newarrvalThead.push(this.state.vData)
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
                for (let c = 0; c < this.state.fieldsListThead[0].length; c++) {
                    for (let j = 0; j < this.state.users.length; j++) {
                        if (this.state.fieldsListThead[0]['colName'] === this.state.users[j]['colName']) {
                            console.log('colName true')
                        } else {
                            console.log('colName false')
                        }
                    }


                }
                for (let v = 0; v < this.state.fieldsList.length; v++) {
                    this.state.fieldsList = this.state.fieldsListNew
                    this.state.fieldsList[v] = Object.values(this.state.objVal)
                }
            }

            let inputs = [{colName: 'col1', colType: 'type1'}];
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
        
        this.setState({
            colData: this.state.colData,
            fieldsList: this.state.fieldsList,
            fieldsListThead: this.state.fieldsListThead,
            columnModel: newarr[0],
            columnData: [],
            escuSelBox: this.state.escuSelBox
        })
    }
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

    createRules=(rulesData)=>{
        /*console.log(data)
        const subRule=[]
        for (let b = 0; b < this.state.fieldsList.length; b++) {
            const rule = this.state.fieldsList[b];
            const rulePara='rule'+b
            subRule.push({[rulePara] : rule})
        }
        const ruleData = Object.keys(subRule).map((key) => subRule[key])
        console.log('subRule',ruleData)
        const rulesObj=[]
        rulesObj.push({
            'ruleName':this.state.ruleName,
            'RULES':Object.values(Object.values(subRule)),
            'IMPACT':''
        })
        console.log('rulesObj', rulesObj)*/



        //send to API
        const rulesObj=[];
        rulesObj.push({
            'ruleName': this.state.ruleName,
            'RULES': rulesData,
            'IMPACT': this.state.selectedJobsList
        });

    }


    render() {
        this.state.addColShow = true
        for (let v = 0; v < this.state.rulesList.length; v++) {
            this.state.tabaleTdData.push(Object.values(this.state.rulesList[v]))
        }
        // const thdata = this.state.theadData[0].map((item, index) => (
        //     <th key={index}>
        //         {item}
        //     </th>
        // ));

        const rulesListData = this.state.leftSideData.map((item, index, values) => (
            <li key={index}>
                <span className={this.state.listActive ? 'active listVal' : 'listVal'} onClick={() => { this.listClick(index); }}>{item.ruleName}</span>
                <span className="delIcon" onClick={() => { this.deleteRow(index); }}><FontAwesomeIcon icon={faTrashAlt} /></span>
            </li>
        ));
        return (
            <div className="App">
                <div className="mainPanel d-flex">
                    <div className="leftSide">
                        <div className="sideTabs">
                            <ul className="d-flex m-0 p-0">
                                <li onClick={this.workFlowClick} className={this.state.workActive ? 'active' : ''}>Workflow manager</li>
                                <li onClick={this.ruleClick} className={!this.state.rulesActive ? 'active' : ''}>Rule manager</li>
                            </ul>
                        </div>
                        <div className="tabContent">
                            {this.state.workActive ? <div>
                                <div className="">Works</div>
                            </div> : null}
                            {!this.state.rulesActive ? <div>
                                <div className="rulesList">
                                    <ul>
                                        {rulesListData}
                                    </ul>
                                </div>
                            </div> : null}
                        </div>
                    </div>
                    <div className="rightSide">
                        <div className="rulesContainer p-3">
                            <h3 className="h3 text-center mb-4">Rules Manager</h3>
                            <div className="form-group d-flex align-items-center">
                                <label className="form-label">Rule name<em>*</em></label>
                                <div className="input-box">
                                    <input type="text" name='ruleName' value={this.state.ruleName} onChange={e => this.handleinputChange(e)} className="form-control" />
                                </div>
                            </div>
                            <div className="form-group d-flex align-items-center">
                                <label className="form-label">Job Link<em>*</em></label>
                                <div className="flex-fill">
                                    <div className="input-box">
                                        <Select key={this.state.value} ref={this.wrapper}
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            isMulti
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
                                        {this.state.addColShow ? <div className="actDiv">
                                            <button className="btn btn-primary mr-2" type="submit">Add as Column</button>
                                        </div> : undefined || null}
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
                            

                            <div className="tableList hide">
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
                                                            <td key={b}><input name='colValue' value={v.colValue || ''} onChange={e => this.inputOnChange(e)} className="form-control" /></td>

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
                            {/*this.state.addRowShow ? <div className="addRowSec"><span className="btn btn-primary" onClick={this.addClickRow}>Add new row</span></div> : null*/}
                            {/* <div className="tableList">
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
                                                                return (num !== undefined && <td key={j}><input name='colValue' value={num} className="form-control" onChange={e => this.inputChange(e)} /></td>)
                                                            }
                                                            )
                                                        }
                                                    </tr>
                                                ))
                                            }
                                        </tbody>

                                    </table>

                                </div> */}
                            {/*<div onClick={this.createRules}>Rule Crate</div>*/}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
