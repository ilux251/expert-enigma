import React from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import ImportPopup from './components/ImportPopup';
import DeletePopup from './components/DeletePopup';

const {ipcRenderer} = window.require("electron");

class App extends React.Component {

  constructor () {
    super();

    this.state = {
      selection: {pdView: {},
                  nvView: {},
                  compareView: {}},
      currentTab: "nvView",
      compareKeys: ["aus Belegnr.", "DL Anteil"],
      comparedData: []
    }
  }

  componentDidMount = () => {
    ipcRenderer.on("compare-save/create/reply", (_, response) => {
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

  resetSelection = () => {
    this.setState({selection: {pdView: {}, nvView: {}, compareView: {}}});
  }

  changeSelection = (file) => {
    let currentTab = this.state.currentTab;
    let selection = {...this.state.selection};

    if (currentTab in selection)
    {
      if (file._id in selection[currentTab])
      {
        delete selection[currentTab][file._id]
      }
      else
      {
        selection[currentTab][file._id] = file;
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

  roundTo = (number, places) => 
  {
    let factor = 10 ** places;
    return Math.round(number * factor) / factor;
  }

  compareFiles = () => 
  {
    let {pdView, nvView} = this.state.selection;
    let pdKey = Object.keys(pdView)[0];
    let nvKey = Object.keys(nvView)[0];
    let pdFile = Object.assign({}, pdView[pdKey]);
    let nvFile = Object.assign({}, nvView[nvKey]);

    let pdFileHeader = this.getHeaderTitleToMap(pdFile["content"][0]);
    let nvFileHeader = this.getHeaderTitleToMap(nvFile["content"][0]);

    let compareMap = {};

    for (let row of nvFile["content"].slice(1))
    {
      let key = row[nvFileHeader[this.state.compareKeys[0]]];
      let value = row[nvFileHeader[this.state.compareKeys[1]]];

      value = this.roundTo(value, 2);

      if (compareMap[key])
      {
        compareMap[key].nvFile += value;
      }
      else 
      {
        compareMap[key] = {nvFile: value};
      }
    }

    for (let row of pdFile["content"].slice(1))
    {
      let key = row[pdFileHeader[this.state.compareKeys[0]]];
      let value = row[pdFileHeader[this.state.compareKeys[1]]];

      value = this.roundTo(value, 2);

      if (compareMap[key])
      {
        compareMap[key].pdFile = "pdFile" in compareMap[key] ? compareMap[key].pdFile + value : value;
      }
      else 
      {
        compareMap[key] = {pdFile: value};
      }
    }

    compareMap["comparedFiles"] = [nvFile.filename, pdFile.filename];

    ipcRenderer.send("compare-save/create", {compare: compareMap, date: new Date()});

    this.resetSelection();
  }

  render() {
    return (
      <React.Fragment>
        <Header changeState={this.changeState} selection={this.state.selection} compareFiles={this.compareFiles}/>
        <Main changeState={this.changeState} 
              isInSelection={this.isInSelection} 
              changeSelection={this.changeSelection}
              selection={this.state.selection}
              currentTab={this.state.currentTab} 
              comparedData={this.state.comparedData} />
        <ImportPopup showImportPopup={this.state.showImportPopup} changeState={this.changeState}/>
        <DeletePopup showDeletePopup={this.state.showDeletePopup} selection={this.state.selection} changeState={this.changeState} resetSelection={this.resetSelection}/>
        <div className={`background ${this.state.showPopup ? "active" : ""}`}></div>
      </React.Fragment>
      );
  }
}
export default App;