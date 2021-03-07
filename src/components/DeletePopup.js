import React from "react"

const {ipcRenderer} = window.require("electron");

class DeletePopup extends React.Component {

    closePopup = () =>
    {
			this.props.changeState({key: "showDeletePopup", value: false});
			this.props.changeState({key: "showPopup", value: false});
    }

    deleteFiles = () => {
      let pdIds = Object.keys(this.props.selection.pdView);
      let nvIds = Object.keys(this.props.selection.nvView);
      let compareIds = Object.keys(this.props.selection.compareView);
  
      console.log("xxx", pdIds, nvIds, compareIds);

      this.delelteFileEvent("pd/delete-files", pdIds);
      this.delelteFileEvent("nv/delete-files", nvIds);
      this.delelteFileEvent("compare-save/delete-files", compareIds);

      ipcRenderer.send("pd/get-files");
      ipcRenderer.send("nv/get-files");
      ipcRenderer.send("compare-save/get-all");

      this.props.resetSelection();

      this.closePopup();
    }
  
    delelteFileEvent = (event, ids) => 
    {
      ipcRenderer.send(event, ids);
    }

    showSelection = () => 
    {
      let selection = [];
      let {pdView, nvView, compareView} = this.props.selection;

      console.log("xxx", Object.keys(pdView), nvView, compareView);

      if (Object.keys(pdView).length > 0)
      {
        selection.push(<div>PD: {Object.keys(pdView).length} Datei(en) ausgewählt</div>)
      }

      if (Object.keys(nvView).length > 0)
      {
        selection.push(<div>NV: {Object.keys(nvView).length} Datei(en) ausgewählt</div>)
      }

      if (Object.keys(compareView).length > 0)
      {
        selection.push(<div>Vergleich: {Object.keys(compareView).length} Datei(en) ausgewählt</div>)
      }

      return selection;
    }

    render() {
       return (
            <div className={`popup deletePopup ${this.props.showDeletePopup ? "active" : "hidden"}`}>
							<div className="closePopup" onClick={this.closePopup}></div>
							<div className="container">
                {this.showSelection()}
                <button className="delete" onClick={() => this.deleteFiles()}>Löschen</button>
							</div>
            </div>
        );
    }
 }
 export default DeletePopup;