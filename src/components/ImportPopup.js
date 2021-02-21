import React from "react"
import readXlsxFile from 'read-excel-file'

const {ipcRenderer} = window.require("electron");

class ImportPopup extends React.Component {

		componentDidMount = () => 
		{

		}

    closePopup = () =>
    {
			this.props.changeState({key: "showImportPopup", value: false})
			this.props.changeState({key: "showPopup", value: false})
    }

		createNvFile = () =>
		{
      let inputImport = this.state.inputImport;
      console.log("inputimport", inputImport)
      readXlsxFile(inputImport).then(rows => {
        console.log("dick ===========>", rows)
        ipcRenderer.send("nv/create-file", {filename: inputImport.name, date: new Date(), isDone: false, content: rows});
      })
      // ipcRenderer.send("nv/create-file", {filename: "Filename 1", date: new Date(), isDone: false, content: []});
      // ipcRenderer.send("nv/get-files");
		}

    componentDidMount = () =>
    {
      ipcRenderer.on("nv/create-file/reply", this.eventHandler);
      // ipcRenderer.on("nv/get-files/reply", this.eventHandler);
    }

    componentWillUnmount = () => 
    {
      ipcRenderer.removeListener("nv/create-file/reply", this.removeHandler);
      // ipcRenderer.removeListener("nv/get-files/reply", this.removeHandler);
    }

    eventHandler = (_, data) =>
    {
      console.log("eventHandler", data);
    }

    removeHandler = (_, data) =>
    {
      console.log("removeHandler", data);
    }

    changeState = (state) =>
    {
      this.setState(state)
    }

    render() {
       return (
            <div class={`popup ${this.props.showImportPopup ? "active" : "hidden"}`}>
							<div class="closePopup" onClick={this.closePopup}></div>
							<div class="container">
								<div><input id="inputImport" type="file" placeholder="Datei auswählen" onChange={(e) => this.changeState({inputImport: e.target.files[0]})}/></div>
								<div><input type="text" placeholder="Datum setzen"/></div>
								<div class="buttonContainer">
									<button onClick={this.createNvFile}>NV</button>
									<button>Persönliche Dateien</button>
								</div>
							</div>
            </div>
        );
    }
 }
 export default ImportPopup;