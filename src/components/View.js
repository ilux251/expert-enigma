import React from "react"
  
class View extends React.Component {

  componentDidMount = () => {
    console.log("xxx", this.props);
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
            {this.props.data.map((value) => (
              <tr>
                <td>{value.name}</td>
                <td>{value.date}</td>
                <td><input type="checkbox" checked={value.isDone} onChange={() => this.props.changeStatus(value.id)}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

}

export default View;