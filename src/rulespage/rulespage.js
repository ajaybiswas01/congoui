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
            selectedValue: '',
            conArrayVal: '',
            conArray: '',

            colValData: [],
            colModel: [],
            selectedJobsData:[],
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
        var newArrList = this.state.tableDataList
        var arrData = []

        for (let a = 0; a < newArrList.length; a++) {
            const ec = newArrList[2];
            arrData = []
            for (let b = 0; b < ec.length; b++) {
                arrData.push(ec[b]);

            }

        }

        
        
// ====================================
        



        
        
        var arrList = []
        var arrListTbody = []

        for (let index = 0; index < arrData.length; index++) {
            var arrColData = []
            var outval = ''
            var conArrayData = []
            var conArray = []
            var conArrayVal = []
            var assoListKey = ''
            var assoListVal = ''
            for (var property in arrData[index]) {
                outval = arrData[index].outputColumn
                if (['exclude', 'outputColumn', 'associations', 'pocessing_order'].indexOf(property) == -1) {
                    if ([outval].indexOf(property) == -1) {
                        arrColData.push(property)
                        conArrayData.push(arrData[index][property])
                    }
                    else{
                    }
                }
            }
            assoListKey = Object.keys(arrData[index].associations)
            assoListVal = Object.values(arrData[index].associations)
            // var ele = []
            // for (const key in assoListKey) {
            //     if (assoListKey.hasOwnProperty(key)) {
            //         const element = assoListKey[key].split('-');
            //         ele.push(element)
            //     }
            // }
            var iteVal = []
            for (const iterator of assoListVal) {
                iteVal.push(iterator)
            }
            var opaTag =[]
            arrColData.forEach((element, index) => {
                opaTag.push(element)

            });
            
            conArray=opaTag
            console.log(conArray)
            conArrayData.forEach((element, index) => {
                conArrayVal.push(element)
            });
            // conArray[0].pop()
            // conArrayVal.pop()

            var result = {};
            var conArrayUpdate =Object.values(conArray)
            // result['exclude'] = arrData[index].exclude
            for (let index = 0; index < conArrayUpdate.length; index++) {
                result[conArrayUpdate[index]] = conArrayVal[index] == undefined ? '' : conArrayVal[index]
            }
            // var outVal = arrData[index].outputColumn
            // result[outVal] = arrData[index][outVal]

            conArray = Object.keys(result)
            conArrayVal = Object.values(result)
            console.log('result', result)
            arrListTbody.push(result)
            arrList[index]=result
        }
        var contData=[]
        for (let v = 0; v < arrList.length; v++) {
            const valueData =Object.values(arrList[v])
            contData.push(valueData)
        }
        

        var outValue=[]
        for (let v = 0; v < arrData.length; v++) {
            outValue.push(arrData[v].outputColumn)
            // arrData[v].outValue='output'
            const { exclude,pocessing_order,associations,outputColumn,col5, ...arrDataDel } = arrData[v];
            console.log('arrDataDel', arrDataDel)
            var eleValues=[]
            Object.keys(arrDataDel).forEach((element,i) => {
                // eleValues.push({'colTagName':element,'colTagType':element, 'colTagValue':elev[i]})
                eleValues.push({'colTagName':element, 'colTagValue':element})
              const objIndex = eleValues.findIndex((obj => obj.colTagValue == element));
                eleValues[objIndex].colTagValue = "Input"
                //console.log('objIndex', eleValues[objIndex].colTagType);
                
                
            });
        }
        outValue.pop()
        console.log('outValue',JSON.stringify(outValue[0]))
        // ==============================================

        console.log('valueData', arrListTbody)
        console.log('eleValues', eleValues)
        let inputTags = eleValues, colModel = [], colValData=[];
        let inputColTag = [], outputColTag = [], inputCol = [];

        Object.values(inputTags).map(obj => {
            if (obj.colTagValue === 'Input') {
                inputCol.push({
                    colTagName: obj.colTagName,
                    colTagType: obj.colTagValue,
                    colTagValue: ""
                });
            }
            if (obj.colTagName === outValue[0]) {
                inputColTag.push({
                    colTagName: obj.colTagName,
                    colTagType: 'output',
                    colTagValue: ""
                });
            }
        });
        inputCol.map((obj, i) => {
            inputColTag.push(obj);
            if (i + 1 !== inputCol.length)
            inputColTag.push({
                    colTagName: "operator",
                    colTagType: "operator",
                    colTagValue: "",
                    operatorLHSColumn: obj.operatorLHSColumn,
                    operatorRHSColumn: inputCol[i + 1].operatorRHSColumn
                });
        });
        let excludeCol = [{
            colTagName: "exclude",
            colTagType: "exclude",
            colTagValue: ""
        }];
        inputTags = excludeCol.concat(inputColTag);
        colModel = inputColTag.concat(outputColTag);
        console.log('colModel',inputTags)


        const dataRowsall = colValData.slice();
        console.log('dataRowsall',dataRowsall)
        let colNewObj = {};
        if (!dataRowsall.length) {
            let rowNewData = [];
            
            colModel.map(colv => {
                colNewObj = {
                    colTagName: colv.colTagName,
                    colTagType: colv.colTagType,
                    colTagValue: ''
                };
                if(colv.colTagName === 'operator') {
                    colNewObj['operatorLHSColumn'] = colv.operatorLHSColumn; 
                    colNewObj['operatorRHSColumn'] = colv.operatorRHSColumn;
                }
                rowNewData.push(colNewObj);
            });
            colValData.push(rowNewData);
        } else {
            colValData = colValData;
        }
        // colValData[0].pop();
        // colValData[0].push(colValData[0].shift());
        console.log('colValData ===>>>', colValData)
        console.log('colModel====>>>', colModel)
        this.state.colModel=colModel
        this.state.colValData=colValData
        this.setState({
            colModel: colModel,
            colValData: colValData
        })
        // ========================================


        //this.state.conArray = Object.keys(arrList[0])
            // this.state.conArrayVal = arrListTbody
            // this.state.theadData = Object.keys(arrList[0])
    }



    deleteRow = (index) => {
        var newRows = []
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
        this.state.ruleName = this.state.leftSideData[index].ruleName
        this.state.tableShowData = true;
        this.state.createRuleShow = true

        

        this.state.datashowVal = this.state.rulesList[index];
        this.state.rulesdata = Object.values(this.state.leftSideData[index])
        this.state.dta = this.state.rulesdata[2].split(',');
        const dataVal = []
        for (let c = 0; c < this.state.dta.length; c++) {
            const element = this.state.dta[c];
            dataVal.push({ 'label': element, value: c })
        }
        this.state.tableDataListNew=[]
        var simData=''
        for (let v = 0; v < this.state.conArrayVal.length; v++) {
            simData=[this.state.conArrayVal[v]]
            this.state.tableDataListNew.push(simData)
            
        }
        
        console.log('tableDataListNew', this.state.tableDataListNew)
        this.state.dataVal = dataVal;

        
        //Ajay - generate column model and column data
        /*let rulesArray = [
            {
                "rule1":{
                    "exclude":"jobname3",
                    "col1":"col10",
                    "col2":"col20",
                    "col3":"col30",
                    "col4":"col40",
                    "col5":"col50",
                    "outputColumn":"col5",
                    "associations":{"col1-col2":"or","col2-col3":"and"},
                    "pocessing_order":1
                }
            },
            {
                "rule2":{
                    "exclude":"jobname4",
                    "col1":"col11",
                    "col2":"col21",
                    "col3":"col31",
                    "col4":"col41",
                    "col5":"col51",
                    "outputColumn":"col5",
                    "associations":{"col1-col2":"and","col2-col3":"or"},
                    "pocessing_order":2
                }
            }
        ]


        //TODO - generate column model and column data from rulesarray


        let columnModel = [
            {columnName: "exclude", columnType: "exclude", columnValue: ""},
            {columnName: "col1", columnType: "input", columnValue: ""},
            {columnName: "operator", columnType: "operator", columnValue: "", operatorLHSColumn: "col1", operatorRHSColumn: "col2"},
            {columnName: "col2", columnType: "input", columnValue: ""},
            {columnName: "operator", columnType: "operator", columnValue: "", operatorLHSColumn: "col2", operatorRHSColumn: "col3"},
            {columnName: "col3", columnType: "input", columnValue: ""},
            {columnName: "col4", columnType: "output", columnValue: ""},
            {columnName: "col5", columnType: "output", columnValue: ""}
        ];

        let columnData = [	
            [
                {columnName: "exclude", columnType: "exclude", columnValue: ""},
                {columnName: "col1", columnType: "input", columnValue: "col10"},
                {columnName: "operator", columnType: "operator", columnValue: "or", operatorLHSColumn: "col1", operatorRHSColumn: "col2"},
                {columnName: "col2", columnType: "input", columnValue: "col20"},
                {columnName: "operator", columnType: "operator", columnValue: "and", operatorLHSColumn: "col2", operatorRHSColumn: "col3"},
                {columnName: "col3", columnType: "input", columnValue: "col30"},
                {columnName: "col4", columnType: "output", columnValue: "col40"},
                {columnName: "col5", columnType: "output", columnValue: "col50"}
            ],
            [
                {columnName: "exclude", columnType: "exclude", columnValue: ""},
                {columnName: "col1", columnType: "input", columnValue: "col11"},
                {columnName: "operator", columnType: "operator", columnValue: "or", operatorLHSColumn: "col1", operatorRHSColumn: "col2"},
                {columnName: "col2", columnType: "input", columnValue: "col21"},
                {columnName: "operator", columnType: "operator", columnValue: "or", operatorLHSColumn: "col2", operatorRHSColumn: "col3"},
                {columnName: "col3", columnType: "input", columnValue: "col31"},
                {columnName: "col4", columnType: "output", columnValue: "col41"},
                {columnName: "col5", columnType: "output", columnValue: "col51"}
            ]
        ];*/


        this.setState({
            tableDataListNew: this.state.tableDataListNew,
            dta: this.state.dta,
            dataVal: this.state.dataVal,
            activeLink: index,
            selectedValue: Object.values(dataVal),

            //Harshit - new state variables to store data
            //columnModel: columnModel,
            //columnData: columnData

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
            var newArrData = []
            var newArrDataTd = []
            for (let v = 0; v < this.state.users.length; v++) {
                const eleth = this.state.users[v].colName;
                const eletd = this.state.users[v].colValue
                newArrData.push(eleth)
                newArrDataTd.push(eletd)
            }
            // for (let index = 0; index < this.state.theadData.length; index++) {
            //     const element = this.state.theadData[index];
            //     for (let b = 0; b < newArrData.length; b++) {
            //         element.push(newArrData[b])
            //     }
            // }
            // for (let f = 0; f < this.state.tableDataListNew.length; f++) {
            //     const element = this.state.tableDataListNew[f];
            //     for (let j = 0; j < newArrDataTd.length; j++) {
            //         element.push(newArrDataTd[j])
            //     }
            //     this.state.tableDataListNew[f]=element
            // }

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
            console.log('objVal', this.state.objVal)
            this.state.fieldsListThead[0] = Object.values(this.state.objVal)
            for (let v = 0; v < this.state.fieldsList.length; v++) {
                this.state.fieldsList = this.state.fieldsListNew
                this.state.fieldsList[v] = Object.values(this.state.objVal)
            }
        }


        //Harshit - add newly added column to the grid - START
        let inputs = this.state.objVal, columnModel = [], columnData = [];
        let inputColumns = [], outputColumns = [], inputCols = [];
        console.log('inputColumns', inputCols)
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

    // Add row
    /*addClickRow(e) {
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
    }*/

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
        this.state.fullRulesData = rulesObj
        this.setState({
            fullRulesData: this.state.fullRulesData,
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
        this.state.tableDataListNew = [] // Ajay - why doing this way?
        this.state.fieldsList = []
        this.state.theadData[0] = []
        this.state.objVal = []
        this.state.users = [{ colName: "", colValue: "" }]
        this.state.fieldsListThead = []
        this.state.addRowShow = false
        this.state.dataVal = []
        this.state.createRuleShow = false
        this.setState({
            fieldsList: this.state.fieldsList,
            tableDataListNew: this.state.tableDataListNew,
            theadData: this.state.theadData,
            objVal: this.state.objVal,
            users: this.state.users,
            fieldsListThead: this.state.fieldsListThead,
            ruleName: '',
            dataVal: this.state.dataVal
        })
    }

    render() {
        let { tableDataListNew, conArray } = this.state;
        for (let v = 0; v < this.state.rulesList.length; v++) {
            this.state.tabaleTdData.push(Object.values(this.state.rulesList[v]))
        }
        const thdata = this.state.theadData.map((item, index, arrth) => {
            return (item !== undefined && <th key={index}>
                {item}
            </th>)
        }
        );
        let { colModel, colValData, selectedJobsData } = this.state;
        // console.log('colValData', colValData)
        // console.log('colModel', colModel)
        let colsOutput = [];
        colModel.map((co, ti) => {
            return (co !== undefined && co.colTagType === 'output' ? colsOutput.push(co.colTagName) : '');
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


                            </div>

                            <hr />
                            {this.state.columnModel.length ? <RulesTable columnModel={this.state.columnModel} selectedJobsList={this.state.selectedJobsList} columnData={this.state.columnData} saveRulesData={this.createRules} /> : ''}

                            {this.state.addRowShow ? <div className="addRowSec">
                                <span className="btn btn-primary" onClick={this.addClickRow}>Add new row</span></div> : null}
                            {this.state.tableShowData ?
                                <div className="tableList tableListOth">

                                    <table className="table">



                                        <thead>
                                            <tr>{thdata}</tr>
                                        </thead>
                                        {colValData.length ? <tbody>
    {colValData.map((rowValData, rowValIndex) => {
        return <tr key={rowValIndex}>
            <td>{rowValIndex+1}</td>
            <td><span className="minusBtn btn btn-outline-primary" onClick={e => this.removeRow(rowValIndex)}><FontAwesomeIcon icon={faMinus} /></span></td>
            {rowValData && rowValData.length && rowValData.map((colTagData, colValIndex) => {
                return <td key={colValIndex} data-columntype={(colTagData.colTagType === 'output') ? "output" : ''}>
                {colTagData.colTagType === 'operator' ? 
                    <select defaultValue={colTagData.colTagValue} className="form-control" 
                        onChange={e => this.onCellUpdate(rowValIndex, colValIndex, e.target.value)}>
                        <option>Select Operator</option>
                        <option value="and">and</option>
                        <option value="or">or</option>
                    </select> : 
                    (colTagData.colTagType === 'Input' || colTagData.colTagType === 'output' ? 
                        (<input placeholder={'Enter '+colTagData.colTagName+' Value'} type="text" value={colTagData.colTagValue} defaultValue={colTagData.colTagValue} className="form-control" 
                            onChange={e => this.onCellUpdate(rowValIndex, colValIndex, e.target.value)}/>) : 
                            (colTagData.colTagType === 'exclude' ? 
                                <Select closeMenuOnSelect={true} components={animatedComponents} 
                                    value={selectedJobsData.filter(option => option.label === colTagData.colTagValue)}
                                    options={selectedJobsData} onChange={e => this.onCellUpdate(rowValIndex, colValIndex, e.value)} /> : ''
                            )
                    )
                }
                </td>
            })}
        </tr>
    })}
</tbody> : ''} 
                                        {/* <tbody>
                                            {
                                                tableDataListNew.map((numList, i) => (
                                                    
                                                    <tr key={i}>

                                                        {
                                                            numList.map((num, j, arr) => {
                                                                console.log(num)
                                                                return (<td key={j}>

                                                                    {num === 'exclude'  ?
                                                                        <input name='colValue' className="form-control" /> : ''
                                                                    }

                                                                </td>
                                                                )
                                                            }
                                                            )
                                                        }

                                                    </tr>
                                                ))
                                            }
                                        </tbody> */}

                                    </table>

                                </div>
                                : null}
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
