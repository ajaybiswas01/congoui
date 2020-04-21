import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons'
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
        this.addNewRow = this.addNewRow.bind(this);
        this.state = {
            selectedOption: null,
            leftSideData:Object.values(data),
            rulesList: [],
            rulesdata: Object.keys(data[0].RULES),
            keyNames : [],
            tabaleTdData: [],
            tabaleTdDataNew: new Array(),
            dataVal: [],
            columnName: ' ',
            columnValue: ' ',
            colValue:'',
            theadData: new Array(),
            datashowVal:[],
            tableDataList:[],
            tableDataListNew:new Array(),
            clickRowvalue:new Array(),
            dta:[]
        };
        for (let c = 0; c < this.state.leftSideData.length; c++) {
            this.state.rulesList.push(Object.values(this.state.leftSideData[c].RULES))
            this.state.tableDataList.push(Object.values(this.state.rulesList[c]))
        
        for (let b = 0; b < this.state.tableDataList[c].length; b++) {
            //console.log('b', Object.values(this.state.tableDataList[c][b]))
            //this.state.tableDataListNew.push(Object.values(this.state.tableDataList[c][b]))
            // if (this.state.keyNames == b) {
            //     console.log('Rule', this.state.keyNames[b])
            // }
            this.state.theadData.push(Object.keys(this.state.tableDataList[c][b]))
        }
    }   
    
        // for (let f = 0; f < this.state.rulesList.length; f++) {
        //     for (let v = 0; v < this.state.rulesList.length; v++) {
        //         this.state.keyNames.push(Object.keys(this.state.rulesList[f][v]))
        //     }
            
        // }
        

        
        console.log('data full',this.state.rulesList)
        console.log('data key',this.state.theadData)
    }
    state = {
        workActive: false,
        rulesActive: false,
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
    listClick =(index)=>{
        this.state.clickRowvalue=[];
        this.state.tableDataListNew=[];
        this.state.keyNames=[];
        var arrX=[];
        var arrY=[];
        var arrZ=[];
        var k=0;
        this.state.datashowVal = this.state.rulesList[index];
        console.log('Full jason', this.state.datashowVal)
        this.state.datashowVal.forEach((v, i) => {
            this.state.datashowVal.forEach((vx, ix) => {
                if (arrX.indexOf(ix) == -1) {
                    arrX[k]=ix;
                    k++
                }
                
                //arrY[i][ix]= vx;
            });
            
        });
        arrY.forEach((vy, iy) => {
            for (let n = 0; n < arrX.length; n++) {
                arrZ = vy[arrX[n]]?vy[arrX[n]]:null;
                console.log('arrZ',arrZ)
            }
        });
        console.log('datashowVal', arrY)
        for (let x = 0; x < this.state.datashowVal.length; x++) {
            const element = this.state.datashowVal[x];
            this.state.clickRowvalue.push(Object.values(element))
            this.state.keyNames.push(Object.keys(element))
        }
        
        this.state.tableDataListNew=this.state.clickRowvalue
        console.log('element', this.state.clickRowvalue);
        this.setState({ tableDataListNew: this.state.tableDataListNew });
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
        for (let x = 0; x < this.state.rulesList.length; x++) {
            pushDataFull.push(this.state.rulesList[x]);
        }
        this.state.rulesList.forEach((element,index) => {
            element=(pushDataFull[index] != undefined ? pushDataFull[index] : '')
        });
        // updated.push(this.state.colValue);
        this.setState({ rulesList: this.state.rulesList });
        console.log('rulesList', this.state.rulesList)
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.state.tabaleTdData = []
        const form = {
            columnName: this.state.columnName,
            columnValue: this.state.columnValue
        }
        this.state.keyNames.push(this.state.columnName);
        const pushData = new Array();
        for (let x = 0; x < this.state.rulesList.length; x++) {
            pushData.push(this.state.rulesList[x][this.state.columnName]);
        }
        this.state.rulesList.forEach((element,index) => {
            element[this.state.columnName]=(pushData[index] != undefined ? pushData[index] : this.state.columnValue)
        });
        this.setState({
            columnName: '',
            columnValue: ''
        })
        console.log('data', this.state.rulesList)
     }

    render() {
        for (let c = 0; c < this.state.rulesdata.length; c++) {
            const element = this.state.rulesdata[c];
            this.state.dataVal.push({ 'label': element, value: c })
        }
        for (let v = 0; v < this.state.rulesList.length; v++) {
            this.state.tabaleTdData.push(Object.values(this.state.rulesList[v]))
        }
        const thdata = this.state.theadData[0].map((item, index) => (
            <th key={index}>
                {item}
            </th>
        ));

        const rulesListData = this.state.leftSideData.map((item, index, values) => (
            <li key={index}>
                <span className="listVal" onClick={() => { this.listClick(index); }}>{item.ruleName}</span>
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
                        <div className="rulesContainer p-4">
                            <h3 className="h3 text-center mb-4">Rules Manager</h3>
                            <div className="form-group d-flex align-items-center">
                                <label className="form-label">Rule name<em>*</em></label>
                                <div className="input-box">
                                    <input type="text" value="" className="form-control" />
                                </div>
                            </div>
                            <div className="form-group d-flex align-items-center">
                                <label className="form-label">Job Link<em>*</em></label>
                                <div className="input-box">
                                    {/* <Select closeMenuOnSelect={false} className="basic-multi-select" classNamePrefix="select" isMulti value={selectedOption}  onChange={this.handleChange} options={dataVal} /> */}
                                    <Select key={this.state.value} ref={this.wrapper}
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}
                                        isMulti
                                        options={this.state.dataVal}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Rule Defination<em>*</em></label>
                                <form>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label className="form-label">Column Name</label>
                                        <div className="input-box d-flex">
                                            <input type="text" name='columnName' value={this.state.columnName} onChange={e => this.handleChange(e)} className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Column Value</label>
                                        <div className="input-box d-flex">
                                            <div className="selBox">
                                                <input type="text" name='columnValue' value={this.state.columnValue} onChange={e => this.handleChange(e)} className="form-control"/>
                                            </div>
                                            <div className="addBtnSec">
                                            <button className="addBtn" onClick={(e) => this.onSubmit(e)}><FontAwesomeIcon icon={faPlus} /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </form>
                            </div>

                            <div className="tableList">
                                <table className="table">
                                    <thead>
                                        <tr>{thdata}</tr>
                                    </thead>
                                    {/* <tr>{thdata}</tr>
                                    {thdata} */}
                                    {/* {this.state.rulesList.map((r) => (
                                    <tr>
                                        <td><input value={r} /></td>
                                    </tr>
                                    ))} */}
                                    <tbody>
                                        {
                                            this.state.tableDataListNew.map((numList, i) => (
                                                <tr key={i}>
                                                    {
                                                        numList.map((num, j) =>
                                                            <td key={j}><input name='colValue' value={num} className="form-control" onChange={e => this.inputChange(e)} /></td>
                                                        )
                                                    }
                                                </tr>
                                            ))
                                        }
                                    </tbody>

                                </table>
                                <button onClick={this.addNewRow}>ADD</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
