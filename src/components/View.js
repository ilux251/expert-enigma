import React from "react"
import dateFormat from "dateformat"
  
class View extends React.Component {

  componentDidUpdate = () => {
    console.log(this.props.documents)
  }

  dateToString = (date) => {
    return dateFormat(date, "dd mm yyyy")
  }
  
  render() { 
    return(
      <div id={this.props.id} className="view">
        {this.props.documents.map((value) => (
          <div className="documentEntry" key={value._id}>
            <div className="checkbox">
              <input checked={value.isDone} onChange={() => this.props.changeStatus(value._id)} type="checkbox" id={`checkbox-${value._id.id}`}/>
              <label for={`checkbox-${value._id.id}`}></label>
            </div>
            <div className="filename">{value.filename}</div>
            <div className="path">C:\Users\Alexander Ulrich\Downloads\Test.xlsx</div>
            <div className="date">{this.dateToString(value.date)}</div>
          </div>
        ))}
      </div>
    )
  }

}

export default View;