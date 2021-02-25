import React from 'react';
import View from './View';

const {ipcRenderer} = window.require("electron");
const mongoose = window.require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

ObjectId.prototype.valueOf = function () {
	return this.toString();
};

class Main extends React.Component {

  constructor () {
    super();

    this.state = {
      currentTab: "nvView",
      nvFiles: [],
      pdFiles: []
    }
  }
  componentDidMount = () =>
  {
    this.getData("pd/get-files", "pdFiles");
    this.getData("nv/get-files", "nvFiles");
  }
  
  getData = (event, key) =>
  {
    ipcRenderer.on(event + "/reply", (_, data) => {
      this.setState ({[key]: data})
    })
    ipcRenderer.send(event);
  }

  showComparePopup = () =>
  {
    this.props.changeState({key: "showComparePopup", value: true})
    this.props.changeState({key: "showPopup", value: true})
  }
  changeView = (clickedTab) => 
  {
    this.setState({currentTab: clickedTab});
  }

  changeStatusForNvFile = (id) => 
  {
    this.setState({nvFiles: this.getToggledMapById(this.state.nvFiles, id)});  
  } 

  changeStatusForPdFile = (id) => 
  {
    this.setState({pdFiles: this.getToggledMapById(this.state.pdFiles, id)});
  }

  getToggledMapById = (files, id) => {
    return files.map(file => {
      return file._id == id ? {...file, isDone: !file.isDone} : file;
    });
  }
 
   render() {
      return (
        <main>
          <div className={`tabContainer ${this.state.currentTab}`}>
            <div id="compareButton">
              {/* <button onClick={this.showComparePopup}>vergleichen</button> */}
            </div>
            <div className="tabs">
              <button id="nvTab" onClick={() => this.changeView("nvView")}>NV Dateien</button>
              <button id="pdTab" onClick={() => this.changeView("pdView")}>PD Dateien</button>
              <button id="compareTab" oncClick={() => this.changeView("compareView")}>Vergleich</button>
            </div>
            <View id="nvView" headerTitles={["Dateiname", "Datum", "Abgeschlossen"]} documents={this.state.nvFiles} changeStatus={this.changeStatusForNvFile}/>
            <View id="pdView" headerTitles={["Dateiname", "Datum", "Abgeschlossen"]} documents={this.state.pdFiles} changeStatus={this.changeStatusForPdFile}/>
          </div>
        </main>
      );
   }
}

export default Main;
