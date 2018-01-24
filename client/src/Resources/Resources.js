import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index'

import { Container } from 'reactstrap'
import Modal from '../UI/Modal/Modal'
import Resource from './Resource/Resource'
import CreateResource from './CreateResource/CreateResource'
import EditResource from './EditResource/EditResource'
import ResourcesList from './ResourcesList/ResourcesList'

class Resources extends Component {
  state = {
    resource: '',
    showResource: false,
    showResourcesList: false,
    createResource: false,
    editResource: false
  }

  componentDidMount() {
    this.props.onFetchResources();
  }

  showResourcesList = () => {
    this.setState({
      showResourcesList: true
    })
  }

  closeResourcesList = () => {
    this.setState({
      showResourcesList: false
    })
  }

  //********SHOW_RESOURCE form handling**************************
  showResourceClose = () => {
    this.setState({ showResource: false })
  }

  //********CREATE_RESOURCE form handling **************************
  createResourceForm = () => {
    this.setState({ createResource: true })
  }

  createResourceFormCancel = () => {
    this.setState({ createResource: false })
  }

  createResource = (newResourceData) => {
    this.props.onCreateResource(newResourceData)
    this.setState({ createResource: false })
  }

  //********EDIT_RESOURCE form handling**************************
  showEditResourceForm = (id) => {
    let resourceData = this.props.resources.filter(resource => resource.id === id)[0]
    this.setState({
      resource: resourceData,
      editResource: true
    })
  }

  editResourceUpdate = (data) => {
    this.props.onUpdateResource(data)
    this.setState({
      editResource: false,
      resource: null
    })
  }

  closeEditResourceForm = () => {
    this.setState({
      editResource: false,
      resource: null
    })
  }

  render() {

    const { match, resources } = this.props;

    return (
      <Container>
        <hr />
        <button onClick={() => this.showResourcesList()}><Link to='/resources/'>ALL resources</Link></button>
        {/*********CREATE RESOURCE MODAL********************************************/}
        <button onClick={this.createResourceForm}>Add Resource</button>
        <Modal
          show={this.state.createResource}
          modalClosed={this.createResourceFormCancel}>
          <CreateResource
            createResource={(newResourceData) => this.createResource(newResourceData)}
            createResourceCancel={this.createResourceFormCancel} />
        </Modal>

        {/**********EDIT RESOURCE MODAL**********************************************/}
        <Modal
          show={this.state.editResource}
          modalClosed={this.closeEditResourceForm}>
          {this.state.resource ? <EditResource
            id={this.state.resource.id}
            title={this.state.resource.title}
            category={this.state.resource.category}
            description={this.state.resource.description}
            format={this.state.resource.format}
            location={this.state.resource.location}
            url={this.state.resource.url}
            close={() => this.closeEditResourceForm()}
            updateResource={(data) => this.editResourceUpdate(data)}
          /> : null}
        </Modal>

        {/**********RESOURCES LIST**********************************************/}
        <div>
          <Switch>
            <Route path={`${match.url}/:id/edit`} exact component={EditResource} />
            <Route path={`${match.url}/new`} exact component={CreateResource} />
            <Route path={`${match.url}/:id`} exact component={Resource} />
            <Route path={match.ur} exact />
          </Switch>
        </div>
        <div>
          {this.state.showResourcesList ?
            <div><h5 className="IndexHeaderBackground">ALL resources</h5>
              <ResourcesList
                resources={resources}
                edit={(id) => this.showEditResourceForm(id)}
                delete={(id) => this.props.onDeleteResource(id)}
                close={() => this.closeResourcesList()}
              /></div> : null}
        </div>
      </Container >
    )
  }
};

const mapStateToProps = state => {
  return {
    resources: state.res.resources
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchResources: () => dispatch(actions.fetchResources()),
    onCreateResource: (data) => dispatch(actions.createResource(data)),
    onUpdateResource: (data) => dispatch(actions.updateResource(data)),
    onDeleteResource: (id) => dispatch(actions.deleteResource(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Resources);