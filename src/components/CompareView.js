import React from 'react';
import dateFormat from 'dateformat';

class CompareView extends React.Component
{
  constructor(props) {
    super(props);

    this.state = {
      selectedItem: null,
      isShowMore: false
    }
  }

  dateToString = (date) => {
    return dateFormat(date, "dd.mm.yyyy")
  }

  selectItem = (id) => {
    let selectedItem = id ? this.props.documents.find(item => item._id == id) : null;

    console.log("selelected item", selectedItem, id);

    this.setState({selectedItem})
  }

  diffItems = (nvBetrag = 0, pdBetrag = 0) => {

    return nvBetrag - pdBetrag
  }

  prepareCompareMap = () => {
    let selectedItem = this.state.selectedItem;
    let failureItems = [];
    let items = [];

    if (selectedItem)
    {
      for (let item in selectedItem.compare)
      {
        if (item !== "comparedFiles")
        {
          if (selectedItem.compare[item].pdFile === selectedItem.compare[item].nvFile)
          {
            items.push(
              <div className="compareItem">
                <div className="belegnr">{item}</div>
                <div className="nvFileCompare">{selectedItem.compare[item].nvFile}</div>
                <div className="pdFileCompare">{selectedItem.compare[item].pdFile}</div>
                <div className="diffCompare"></div>
              </div>)
          }
          else
          {
            failureItems.push(
              <div className="compareItem">
                <div className="belegnr">{item}</div>
                <div className="nvFileCompare">{selectedItem.compare[item].nvFile}</div>
                <div className="pdFileCompare">{selectedItem.compare[item].pdFile}</div>
                <div className="diffCompare">{this.diffItems(selectedItem.compare[item].nvFile, selectedItem.compare[item].pdFile)}</div>
              </div>)
          }
        }
      }
    }

    return [failureItems, items];
  }

  renderCompareView = () => {
    let [failureItems, items] = this.prepareCompareMap();

    let failureContainer = (
      <div>
        <div className="compareHeader">
          <div>Belegnr</div>
          <div>NV</div>
          <div>PD</div>
          <div>Diff</div>
        </div>
        <div className="failureContainer">{failureItems}</div>
      </div>
    )

    let itemContainer = (
      <div className={`itemContainer ${this.state.isShowMore ? "" : "hidden"}`}>{items}</div>
    )

    return [failureContainer, itemContainer];
  }

  render = () => {
    return (
      <div id={this.props.id} className="view">
        {this.props.documents.map(value => (
          <div className="documentEntry" onClick={() => this.selectItem(value._id)}>
            <div key={value._id}>{this.dateToString(value.date)}</div>
          </div>
        ))}
        <div className={`lookupView ${!this.state.selectedItem ? "hidden" : ""}`}>
          <div className="flexContainer">
            <div onClick={() => this.selectItem(null)}>&lt; Back</div>
            <div onClick={() => this.setState({isShowMore: !this.state.isShowMore})}>Show More ...</div>
          </div>
          {this.renderCompareView()}
        </div>
      </div>
    )
  }
}

export default CompareView;