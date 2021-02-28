import React from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import ImportPopup from './components/ImportPopup';
import ComparePopup from './components/ComparePopup';

const {ipcRenderer} = window.require("electron");

class App extends React.Component {

  constructor () {
    super();

    this.state = {
      selection: {pdView: {},
                  nvView: {}},
      currentTab: "nvView",
      compareKeys: ["aus Belegnr.", "DL (MW) abs"],
      comparedData: []
    }
  }

  componentDidMount = () => {
    ipcRenderer.on("compare-save/create/reply", (_, response) => {
      console.log("xxx create compare-save reply xxx", response);
      ipcRenderer.send("compare-save/get-all");
    });
    this.getData("compare-save/get-all", "comparedData");
  }

  getData = (event, key) =>
  {
    ipcRenderer.on(event + "/reply", (_, data) => {
      this.setState ({[key]: data})
    })
    ipcRenderer.send(event);
  }

  changeState = ({key, value}) => {
    this.setState({[key]: value});
  }

  isInSelection = (target) => {
    return (this.state.currentTab in this.state.selection && 
            target in this.state.selection[this.state.currentTab]);
  }

  changeSelection = (file) => {
    let currentTab = this.state.currentTab;
    let selection = {...this.state.selection};

    if (currentTab in selection)
    {
      if (file._id.id in selection[currentTab])
      {
        delete selection[currentTab][file._id.id]
      }
      else
      {
        selection[currentTab][file._id.id] = file;
      }

      this.setState({selection});
    }
  }

  getHeaderTitleToMap = (content) => {
    let headerTitle = {};

    for (let index in content)
    {
      let title = content[index];
      headerTitle = {...headerTitle,
                     [title]: index};
    }

    return headerTitle;
  }

  compareFiles = () => 
  {
    let {pdView, nvView} = this.state.selection;
    let pdKey = Object.keys(pdView)[0];
    let nvKey = Object.keys(nvView)[0];
    let pdFile = pdView[pdKey];
    let nvFile = nvView[nvKey];

    // side-effects for pdFile and nvFile -> remove header title
    let pdFileHeader = this.getHeaderTitleToMap(pdFile["content"].shift());
    let nvFileHeader = this.getHeaderTitleToMap(nvFile["content"].shift());

    let compareMap = {};

    for (let row of nvFile["content"])
    {
      let key = row[nvFileHeader[this.state.compareKeys[0]]];
      let value = row[nvFileHeader[this.state.compareKeys[1]]];
      
      if (compareMap[key])
      {
        compareMap[key].nvFile = value;
      }
      else 
      {
        compareMap[key] = {nvFile: value};
      }
    }

    for (let row of pdFile["content"])
    {
      let key = row[pdFileHeader[this.state.compareKeys[0]]];
      let value = row[pdFileHeader[this.state.compareKeys[1]]];
      
      if (compareMap[key])
      {
        compareMap[key].pdFile = value;
      }
      else 
      {
        compareMap[key] = {pdFile: value};
      }
    }

    compareMap["comparedFiles"] = [Object.keys(nvView)[0], Object.keys(pdView)[0]];

    console.log(compareMap)

    ipcRenderer.send("compare-save/create", {compare: compareMap, date: new Date()});
  }

  render() {
    return (
      <React.Fragment>
        <Header changeState={this.changeState} selection={this.state.selection} compareFiles={this.compareFiles} />
        <Main changeState={this.changeState} 
              isInSelection={this.isInSelection} 
              changeSelection={this.changeSelection}
              selection={this.state.selection}
              currentTab={this.state.currentTab} 
              comparedData={this.state.comparedData} />
        <ImportPopup showImportPopup={this.state.showImportPopup} changeState={this.changeState}/>
        <ComparePopup showComparePopup={this.state.showComparePopup} changeState={this.changeState}/>
        <div className={`background ${this.state.showPopup ? "active" : ""}`}></div>
      </React.Fragment>
      );
  }
}
export default App;