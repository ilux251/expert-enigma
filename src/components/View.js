import React from "react"
import dateFormat from "dateformat"
  
class View extends React.Component {

  componentDidUpdate = () => {
    
  }

  dateToString = (date) => {
    return dateFormat(date, "dd mm yyyy")
  }
  
  render() { 
    return(
      <div id={this.props.id} class="view">
        <table>
          <colgroup>
            <col width="60%"/>
          </colgroup>
          <thead>
            <tr>
              {this.props.headerTitles.map(value => (
                <th>{value}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.props.documents.map((value) => (
              <tr key={value._id.id}>
                <td>{value.filename}</td>
                <td>{this.dateToString(value.date)}</td>
                <td><input type="checkbox" checked={value.isDone} onChange={() => this.props.changeStatus(value._id)}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

}

export default View;