import React from 'react';
import View from './View';
import CompareView from './CompareView';

const {ipcRenderer} = window.require("electron");

class Main extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
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

  showCompareTabButton = () => 
  {
    if (this.props.comparedData.length > 0)
    {
      return (<button id="compareTab" onClick={() => this.props.changeState({key: "currentTab", value: "compareView"})}>Vergleich</button>)
    }
  }
 
   render() {
      return (
        <main>
          <div className={`tabContainer ${this.props.currentTab}`}>
            <div className="tabs">
              <button id="nvTab" onClick={() => this.props.changeState({key: "currentTab", value: "nvView"})}>NV Dateien</button>
              <button id="pdTab" onClick={() => this.props.changeState({key: "currentTab", value: "pdView"})}>PD Dateien</button>
              {this.showCompareTabButton()}
            </div>
            <View id="nvView" headerTitles={["Dateiname", "Datum", "Abgeschlossen"]} documents={this.state.nvFiles} isInSelection={this.props.isInSelection} changeSelection={this.props.changeSelection} />
            <View id="pdView" headerTitles={["Dateiname", "Datum", "Abgeschlossen"]} documents={this.state.pdFiles} isInSelection={this.props.isInSelection} changeSelection={this.props.changeSelection}/>
            <CompareView id="compareView" documents={this.props.comparedData} isInSelection={this.props.isInSelection} changeSelection={this.props.changeSelection}/>
          </div>
        </main>
      );
   }
}

export default Main;
