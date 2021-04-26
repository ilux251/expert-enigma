import React from "react"

const idKeyDefault = "aus Belegnr.";
const dlKeyDefault = "DL Anteil";
const dbKeyDefault = "DB Anteil";

class ComparePopup extends React.Component {

  constructor () 
  {
    super();

    this.state = {
      idDropdown: idKeyDefault,
      dlDropdown: dlKeyDefault,
      dbDropdown: dbKeyDefault
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

  getHeaderTitleAndContent = () =>
  { 
    let {pdView, nvView} = this.props.selection;
    let pdKey = Object.keys(pdView)[0];
    let nvKey = Object.keys(nvView)[0];
    let pdFile = Object.assign({}, pdView[pdKey]);
    let nvFile = Object.assign({}, nvView[nvKey]);
    let pdFileHeader; 
    let nvFileHeader;

    if (Object.keys(pdFile).length > 0 &&
        Object.keys(nvFile).length > 0)
    {
      nvFileHeader = this.getHeaderTitleToMap(pdFile["content"][0]);
      pdFileHeader = this.getHeaderTitleToMap(nvFile["content"][0]);
    }

    return {pdFile, nvFile, pdFileHeader, nvFileHeader}
  }



  closePopup = () =>
  {
    this.props.changeState({key: "showComparePopup", value: false});
    this.props.changeState({key: "showPopup", value: false});
  }

  renderOptions = (id, pdFileHeader) => 
  {
    let options = [];
      for (let headerTitle in pdFileHeader) {
          let option = (<option value={headerTitle} key={`${id}-${headerTitle}-option`}>{headerTitle}</option>);
          options.push(option);
      }
      return options;
  }

  renderSelection = (pdFileHeader) =>
  {
   return (<div>
        <div>ID:
          <select value={this.state.idDropdown} size="1" onChange={(e)=>this.setState({idDropdown:e.target.value})}>
            {this.renderOptions("id", pdFileHeader)}
          </select>
        </div>
        <div>DL:
          <select value={this.state.dlDropdown} onChange={(e)=>this.setState({dlDropdown:e.target.value})}>
            {this.renderOptions("dl", pdFileHeader)}
          </select>
        </div>
        <div>DB:
          <select value={this.state.dbDropdown} size="1" onChange={(e)=>this.setState({dbDropdown:e.target.value})}>
            {this.renderOptions("db", pdFileHeader)}
          </select>
        </div>
    </div>)
  }

  startCompare = (pdFile, nvFile, id, dl) => {
    this.props.compareFiles(pdFile, nvFile, id, dl);
    this.closePopup();
  }

  reset = () => {
    this.setState({
      idDropdown: idKeyDefault,
      dlDropdown: dlKeyDefault,
      dbDropdown: dbKeyDefault
    });
  }

  render() {
   let {pdFile, nvFile, pdFileHeader, nvFileHeader} = this.getHeaderTitleAndContent(); 
    return (
        <div className={`popup ${this.props.showComparePopup ? "active" : "hidden"}`}>
          <div className="closePopup" onClick={this.closePopup}></div>
          <div className="container"> 
            {this.renderSelection(pdFileHeader)}
            <div className="buttonContainer">
                <button onClick={() => this.reset()}>reset</button>
                <button onClick={() => this.startCompare(pdFile, nvFile, pdFileHeader[this.state.idDropdown], pdFileHeader[this.state.dlDropdown])}>starten</button>
            </div>
          </div>
        </div>
    );
  }
}
export default ComparePopup;