import React from "react"
import readXlsxFile from 'read-excel-file'

const {ipcRenderer, remote, shell} = window.require("electron");
const {dialog} = remote;

class ImportPopup extends React.Component {

		componentDidMount = () => 
		{
			let input = document.getElementById('inputImport');

			input.addEventListener('change', () => {
				readXlsxFile(input.files[0]).then((rows) => {
					console.log(rows);
				})
			})
		}

    closePopup = () =>
    {
			this.props.changeState({key: "showImportPopup", value: false})
			this.props.changeState({key: "showPopup", value: false})
    }

		createNvFile = () =>
		{
      // ipcRenderer.send("nv/create-file", {filename: "Filename 1", date: new Date(), isDone: false, content: []});
      ipcRenderer.send("nv/get-files");
		}

    componentDidMount = () =>
    {
      ipcRenderer.on("nv/create-file/reply", this.eventHandler);
      ipcRenderer.on("nv/get-files/reply", this.eventHandler);
    }

    componentWillUnmount = () => 
    {
      ipcRenderer.removeListener("nv/create-file/reply", this.removeHandler);
      ipcRenderer.removeListener("nv/get-files/reply", this.removeHandler);
    }

    eventHandler = (_, data) =>
    {
      console.log("eventHandler", data[0]._doc.filename);
      console.log("eventHandler", data[0]);
    }

    removeHandler = (_, data) =>
    {
      console.log("removeHandler", data);
    }

    render() {
       return (
            <div class={`popup ${this.props.showImportPopup ? "active" : "hidden"}`}>
							<div class="closePopup" onClick={this.closePopup}></div>
							<div class="container">
								<div><input id="inputImport" type="file" placeholder="Datei auswählen"/></div>
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