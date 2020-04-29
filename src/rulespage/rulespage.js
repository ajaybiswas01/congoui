import React, { Component, useState, Fragment } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import data from '../data/data.json';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


const animatedComponents = makeAnimated();
const rulesdataVal = Object.values(data);
// const tabaleTdData =[];
export default class Rulespage extends Component {
    constructor(props) {
        super(props);
        this.wrapper = React.createRef();
        this.wrapperSel = React.createRef();
        this.addNewRow = this.addNewRow.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addClickRow = this.addClickRow.bind(this);
        this.state = {
            selectedOption: null,
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
            selJobList: [],
            appendData: [],
            colData: [],
            valColObj: new Array(),
            objVal: new Array(),
            escuSelBox: new Array(),
            escuSelBoxStore: null,
            objDataSel: null,

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
        console.log('datashowVal', arrY)
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
        console.log('element', this.state.tableDataListNew);
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
        console.log('rulesList', this.state.tableDataListNew)
    }
    // handleChange = (e) => {
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     });
    // }
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
        this.state.selJobList = []
        for (let s = 0; s < selectedOption.length; s++) {
            const element = selectedOption[s].value;
            this.state.selJobList.push(element)
            console.log('element', element)
        }
        const result = Object.keys(this.state.selJobList).map((key) => this.state.selJobList[key])
        console.log('selectedOption', result)
        console.log('result', this.state.selJobList)
        this.state.objDataSel = this.state.selJobList
        this.setState({
            selJobList: this.state.selJobList,
            objDataSel: this.state.objDataSel
        })
    };

    addClick() {
        this.setState(prevState => ({
            users: [...prevState.users, { colName: "", colValue: "" }]
        }))
    }

    createUI() {
        return this.state.users.map((el, i) => (
            <div key={i} className="rowDiv d-flex justify-content-between mb-3">
                <div className="row flex-fill">
                    <div className="col-md-6">
                        <input className="form-control" placeholder="Column Name" name="colName" value={el.colName || ''} onChange={this.handleChange.bind(this, i)} />
                    </div>
                    <div className="col-md-6">
                        <input className="form-control" placeholder="Column Value" name="colValue" value={el.colValue || ''} onChange={this.handleChange.bind(this, i)} />
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
        this.state.addColShow = true
        console.log('users', users)
    }

    removeClick(i) {
        let users = [...this.state.users];
        users.splice(i, 1);
        this.setState({ users });
    }

    handleSubmit(event) {
        this.state.addRowShow = true;
        this.state.errorMsg = false
        //alert('A name was submitted: ' + JSON.stringify(this.state.users));
        event.preventDefault();
        console.log('data', this.state.selJobList)
        if (this.state.selJobList === null) {
            //return this.state.fieldsList
            this.state.errorMsg = true
        } else {
            if (this.state.users === null) {
                console.log('blank')
            }else{
                console.log('no blank')
            }

            this.state.colData = this.state.users
            this.state.vData = new Array()
            this.state.objVal = new Array()
            this.state.fieldsListThead = []
            this.state.valColObj = new Array()
            for (let x = 0; x < this.state.colData.length; x++) {
                const element = this.state.colData[x];
                this.state.vData.push(element)
                this.state.vData[x]['exclude'] = this.state.selJobList;
            }

            for (let w = 0; w < this.state.selJobList.length; w++) {
                const element = this.state.selJobList[w];
                console.log('element bbb', element)
                this.state.escuSelBox.push({ 'label': this.state.selJobList[w], 'value': w })
            }
            this.state.escuSelBoxStore = this.state.escuSelBox;
            this.state.newarrval.push(this.state.vData)
            this.state.newarrvalThead.push(this.state.vData)
            this.state.fieldsList = this.state.newarrval;
            for (let y = 0; y < this.state.colData.length; y++) {
                this.state.colData[y] = []
                this.state.colData.splice(event, this.state.colData.length);
                for (let m = 0; m < this.state.colData.length; m++) {
                    // this.state.colData[m].colName=''
                    // this.state.colData[m].colValue=''
                    console.log('m', this.state.colData[m])
                }
                this.state.colData[y] = Object.values(this.state.users)
            }
            for (let b = 0; b < this.state.fieldsList.length; b++) {
                const valueResult = Object.values(this.state.fieldsList[b])
                console.log('valueResult', valueResult)
                for (let u = 0; u < valueResult.length; u++) {
                    this.state.objVal.push(valueResult[u])
                }


            }
            console.log('u', this.state.objVal)
            // this.state.colData.push(this.state.objVal)
            // this.state.colData.push(Object.keys(this.state.fieldsList).map((key)=>this.state.fieldsList[key]))
            //this.state.colData[0]=this.state.fieldsList

            // if (this.state.objVal[0]['colName'] === 'Col name1') {
            //     console.log('colName true')
            // } else {
            //     console.log('colName false')
            // }
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
            console.log('aas', this.state.fieldsListThead)
            for (let v = 0; v < this.state.fieldsList.length; v++) {
                this.state.fieldsList = this.state.fieldsListNew
                this.state.fieldsList[v] = Object.values(this.state.objVal)
            }
        }
        this.setState({
            colData: this.state.colData,
            fieldsList: this.state.fieldsList,
            fieldsListThead: this.state.fieldsListThead,
            escuSelBox: this.state.escuSelBox
        })
    }
    addClickRow(e) {
        var nextState = this.state;

        nextState.fieldsListNew.push(this.state.objVal);
        // for (let g = 0; g < nextState.fieldsList.length-1; g++) {
        //     const element = nextState.fieldsList[g];
        //     this.state.appendData.push(element)
        //     for (let d = 0; d <nextState.fieldsList[g].length; d++) {
        //         this.state.appendData[g][d].colValue=''
        //     }

        // }
        console.log('element', e)
        for (let s = 1; s < nextState.fieldsListNew.length; s++) {
            const element = nextState.fieldsListNew[s];
            // element[s].colName=''
            //element[s].colValue=''
            console.log('ee', element)
        }
        nextState.fieldsList = nextState.fieldsListNew
        this.setState({
            fieldsList: nextState.fieldsList,
            fieldsListNew: nextState.fieldsListNew
        })
        console.log('new row', nextState.fieldsList)
    }



    render() {
        this.state.selJobList = this.state.objDataSel
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
                                    <input type="text" value="" className="form-control" />
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
                                    {this.state.errorMsg ? <div className="alert alert-danger" role="alert" >Choose job name</div> : null}
                                </div>


                            </div>
                            <div className="form-group">
                                <div className="d-flex">

                                </div>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="btmAct d-flex align-items-center mb-3">
                                        <label className="form-label w-auto mb-0">Column Definition<em>*</em></label>
                                        <div className="actDiv ml-4">
                                            <span className="addBtn btn btn-outline-primary" onClick={this.addClick.bind(this)}><FontAwesomeIcon icon={faPlus} /></span>
                                        </div>
                                    </div>
                                    <div className="colFields">
                                        {this.createUI()}
                                    </div>
                                    <div className="btmAct d-flex">
                                        {this.state.addColShow ? <div className="actDiv">
                                            <input className="btn btn-primary mr-2" type="submit" value="Add as Column" />
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
                                                    <Select key={this.state.value} ref={this.wrapperSel}
                                                        closeMenuOnSelect={true}
                                                        components={animatedComponents}
                                                        options={this.state.escuSelBox} onChange={e => this.onOptionChange(e)}
                                                    />

                                                </td>
                                                {
                                                    r.map((v, b) => {
                                                        return (v !== undefined &&
                                                            <td key={b}><input value={v.colValue} className="form-control" /></td>

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
                            {this.state.addRowShow ? <div className="addRowSec"><span className="btn btn-primary" onClick={this.addClickRow}>Add new row</span></div> : null}
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
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
