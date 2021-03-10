import React from "react"
import readXlsxFile from 'read-excel-file'

const {ipcRenderer} = window.require("electron");

class ImportPopup extends React.Component {

    constructor () 
    {
      super();

      this.state = {
        inputImport: false
      }
    }

    componentDidMount = () => {
      ipcRenderer.on("nv/create-file/reply", (_, data) => {
        console.log("ImportPopup", data);
        ipcRenderer.send("nv/get-files");
        this.clearInput();
      });

      ipcRenderer.on("pd/create-file/reply", (_, data) => {
        console.log("ImportPopup", data);
        ipcRenderer.send("pd/get-files");
        this.clearInput();
      });
    }

    closePopup = () =>
    {
			this.props.changeState({key: "showImportPopup", value: false});
			this.props.changeState({key: "showPopup", value: false});
      this.clearInput();
    }

    clearInput = () => {
      let input = document.getElementById("inputImport");
      input.value = "";
      
      this.setState({inputImport: false})
    }
    
		createFile = (event) =>
		{
      let inputImport = this.state.inputImport;
      readXlsxFile(inputImport).then(rows => {
        ipcRenderer.send(event, {filename: inputImport.name, date: new Date(), isDone: false, content: rows, path: inputImport.path});
      })
		}

    changeState = (state) =>
    {
      this.setState(state);
    }

    render() {
       return (
            <div className={`popup ${this.props.showImportPopup ? "active" : "hidden"}`}>
							<div className="closePopup" onClick={this.closePopup}></div>
							<div className="container">
								<div><input id="inputImport" type="file" placeholder="Datei auswählen" onChange={(e) => this.changeState({inputImport: e.target.files[0]})}/></div>
								{/* <div><input type="text" placeholder="Datum setzen"/></div> */}
								<div className="buttonContainer">
									<button disabled={!this.state.inputImport} onClick={() => this.createFile("nv/create-file")}>NV</button>
									<button disabled={!this.state.inputImport} onClick={() => this.createFile("pd/create-file")}>PD</button>
								</div>
							</div>
            </div>
        );
    }
 }
 export default ImportPopup;