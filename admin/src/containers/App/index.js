/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Switch, Route, withRouter } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';

// Utils
import { pluginId } from 'app';

// Containers
import HomePage from 'containers/HomePage';
import NotFoundPage from 'containers/NotFoundPage';
import ExamplePage from 'containers/ExamplePage';
import TypePage from 'containers/TypePage';

import saga from './sagas';
import {modelsFetch} from './actions';

//Utils
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {storeData} from '../../utils/storeData';


class App extends React.Component {

  componentDidMount() {
    this.props.modelsFetch();
  }

  componentWillUnmount() {
    // Empty the app localStorage
    storeData.clearAppStorage();
  }

  render() {
    return (
      <div className={pluginId}>
        <Switch>
          <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
          <Route path={`/plugins/${pluginId}/type`} component={TypePage} exact />
          <Route path={`/plugins/${pluginId}/type`} component={ExamplePage} exact />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

App.contextTypes = {
  plugins: PropTypes.object,
  router: PropTypes.object.isRequired,
  updatePlugin: PropTypes.func,
};

App.propTypes = {
  modelsFetch: PropTypes.func.isRequired,
  shouldRefetchContentType: PropTypes.bool,
};

App.defaultProps = {
  shouldRefetchContentType: false,
};

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      modelsFetch,
    },
    dispatch
  );
}

const mapStateToProps = createStructuredSelector({
  // shouldRefetchContentType: makeSelectShouldRefetchContentType(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'global', saga });
// const withFormReducer = injectReducer({ key: 'form', reducer: formReducer });
// const withFormSaga = injectSaga({ key: 'form', saga: formSaga });
export default compose(
  // withFormReducer,
  // withFormSaga,
  withSaga,
  withRouter,
  withConnect,
)(App);
