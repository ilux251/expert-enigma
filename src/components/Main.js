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
    ipcRenderer.on("nv/get-files/reply", (event,data) => {
      console.log("Ritsch ist der aller Beste!", data)
      this.setState ({nvFiles: data})
    })
    ipcRenderer.send("nv/get-files");
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
          <div class={`tabContainer ${this.state.currentTab}`}>
            <div id="compareButton">
              <button onClick={this.showComparePopup}>vergleichen</button>
            </div>
            <div class="tabs">
              <button id="nvTab" onClick={() => this.changeView("nvView")}>NV Dateien</button>
              <button id="pdTab" onClick={() => this.changeView("pdView")}>Persönliche Dateien</button>
            </div>
            <View id="nvView" headerTitles={["Dateiname", "Datum", "Abgeschlossen"]} documents={this.state.nvFiles} changeStatus={this.changeStatusForNvFile}/>
            <View id="pdView" headerTitles={["Dateiname", "Datum", "Abgeschlossen"]} documents={this.state.pdFiles} changeStatus={this.changeStatusForPdFile}/>
          </div>
        </main>
      );
   }
}

export default Main;
