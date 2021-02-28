import React from "react"
import dateFormat from "dateformat"
  
class View extends React.Component {

  componentDidUpdate = () => {
    
  }

  dateToString = (date) => {
    return dateFormat(date, "dd.mm.yyyy")
  }
  
  render() { 
    return(
      <div id={this.props.id} className="view">
        {this.props.documents.length > 0 ? this.props.documents.map((value) => (
          <div className="documentEntry status" key={value._id.id}>
            <div className="checkbox">
              <input checked={this.props.isInSelection(value._id.id)} onChange={() => this.props.changeSelection(value)} type="checkbox" id={`checkbox-${value._id.id}`}/>
              <label htmlFor={`checkbox-${value._id.id}`}></label>
            </div>
            <div className="filename">{value.filename}</div>
            <div className="path">C:\Users\Alexander Ulrich\Downloads\Test.xlsx</div>
            <div className="date">{this.dateToString(value.date)}</div>
          </div>
        )) : 
        (<div className="noContentInfo">Entweder es wurden keine Daten importiert oder Daten konnten aus der Datenbank nicht geladen werden. <br/>Oben rechts können Dateien importiert werden.</div>)}
      </div>
    )
  }

}

export default View;