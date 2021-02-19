import React from 'react';
import View from './View';

class Main extends React.Component {

  constructor () {
    super();

    this.state = {
      currentTab: "nvView",
      nvFiles: [{
        id: 1,
        name: "filename 1",
        date: "10.02.2020",
        isDone: false
      },
      {
        id: 2,
        name: "filename 2",
        date: "10.02.1998",
        isDone: true
      },
      {
        id: 3,
        name: "das ist ein langer dateiname!!!",
        date: "10.02.1998",
        isDone: true
      }],
      pdFiles: [{
        id: 1,
        name: "pd - filename 1",
        date: "10.02.2020",
        isDone: false
      },
      {
        id: 2,
        name: "pd - filename 2",
        date: "10.02.1998",
        isDone: true
      },
      {
        id: 3,
        name: "pd - das ist ein langer dateiname!!!",
        date: "10.02.1998",
        isDone: true
      }],
      pdMap: {
        1: {
          id: 1,
          name: "pd - filename 1",
          date: "10.02.2020",
          isDone: false
        },
        2: {
          id: 2,
          name: "pd - filename 2",
          date: "10.02.1998",
          isDone: true
        },
        3: {
          id: 3,
          name: "pd - das ist ein langer dateiname!!!",
          date: "10.02.1998",
          isDone: true
        }
      }
    }
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
      return file.id === id ? {...file, isDone: !file.isDone} : file;
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
            <View id="nvView" headerTitles={["Dateiname", "Datum", "Abgeschlossen"]} data={this.state.nvFiles} changeStatus={this.changeStatusForNvFile}/>
            <View id="pdView" headerTitles={["Dateiname", "Datum", "Abgeschlossen"]} data={this.state.pdFiles} changeStatus={this.changeStatusForPdFile}/>
          </div>
        </main>
      );
   }
}

export default Main;
