import React, {Component} from "react"
import {connect} from "react-redux"
import {Grid, Header} from "semantic-ui-react"

import {AgGridReact} from "ag-grid-react"
import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-material.css"

import {toggleFooter} from "../../../app/actions/toggleFooterAction.js"

class CourseLevels extends Component {
  constructor(props) {
    super(props)

    this.state = {
      columnDefs: [
        {
          rowDrag: true,
          headerName: "Make",
          field: "make",
          checkboxSelection: true
        },
        {headerName: "Model", field: "model"},
        {headerName: "Price", field: "price"}
      ],
      rowData: []
    }
  }

  componentDidMount() {
    this.props.toggleFooter(true)
    fetch("https://api.myjson.com/bins/15psn9")
      .then(result => result.json())
      .then(rowData => this.setState({rowData}))
  }

  onButtonClick = () => {
    const selectedNodes = this.gridApi.getSelectedNodes()
    const selectedData = selectedNodes.map(node => node.data)
    const selectedDataStringPresentation = selectedData
      .map(node => node.make + " " + node.model)
      .join(", ")
    alert(`Selected nodes: ${selectedDataStringPresentation}`)
  }

  render() {
    return (
      <Grid.Column>
        <Grid columns={1} centered padded="vertically">
          <Grid.Column textAlign="center">
            <Header as="h1">Course Levels</Header>
          </Grid.Column>
          <div
            className="ag-theme-material"
            style={{
              height: "500px",
              width: "600px"
            }}>
            <button type="button" onClick={this.onButtonClick}>
              Get selected rows
            </button>
            <AgGridReact
              enableColResize
              rowDragManaged
              defaultColDef={{
                headerComponentParams: {
                  menuIcon: "fa-bars"
                }
              }}
              rowSelection="multiple"
              onGridReady={params => (this.gridApi = params.api)}
              columnDefs={this.state.columnDefs}
              rowData={this.state.rowData}
            />
          </div>
        </Grid>
      </Grid.Column>
    )
  }
}

const mapStateToProps = state => {
  return {
    course: state.courseReducer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleFooter: () => dispatch(toggleFooter())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseLevels)
