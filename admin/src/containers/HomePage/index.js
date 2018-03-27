/*
 *
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { bindActionCreators, compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { router } from 'app';

//Components
import ContentHeader from 'components/ContentHeader';
import TableList from 'components/TableList';
import EmptyContentTypeView from 'components/EmptyContentTypeView';

// import Form from 'containers/Form';

// Selectors
import { makeSelectLoading, makeSelectMenu, makeSelectModels } from 'containers/App/selectors';
import selectHomePage from './selectors';

//Actions
import { deleteContentType } from 'containers/App/actions';

// Styles
import styles from './styles.scss';

import reducer from './reducer';
import saga from './saga';
import {size} from "lodash";
import {storeData} from "../../utils/storeData";

export class HomePage extends React.Component {

  handleDelete = (contentTypeName) => {
    this.props.deleteContentType(contentTypeName, this.context);
  }

  handleButtonClick = () => {
    // if (storeData.getIsModelTemporary()) {
    //   strapi.notification.info('content-type-builder.notification.info.contentType.creating.notSaved');
    // } else {
    //   this.toggleModal();
    // }
    router.push('/plugins/semantic-content-type-builder/type');
  }

  toggleModal = () => {
    const locationHash = this.props.location.hash ? '' : '#create::contentType::baseSettings';
    router.push(`/plugins/semantic-content-type-builder/${locationHash}`);
  }

  renderTableListComponent = () => {
    const availableNumber = size(this.props.models);
    const title = availableNumber > 1 ? 'semantic-content-type-builder.table.contentType.title.plural'
      : 'semantic-content-type-builder.table.contentType.title.singular';


    return (
      <TableList
        availableNumber={availableNumber}
        title={title}
        buttonLabel={'semantic-content-type-builder.button.contentType.add'}
        onButtonClick={this.handleButtonClick}
        onHandleDelete={this.handleDelete}
        rowItems={this.props.models}
      />
    );
  }

  render() {
    const component = size(this.props.models) === 0 ?
      <EmptyContentTypeView handleButtonClick={this.toggleModal} />
      : this.renderTableListComponent();

    return (
      <div className={styles.homePage}>
        <ContentHeader
          name={'semantic-content-type-builder.home.contentHeader.name'}
          description={'semantic-content-type-builder.home.contentHeader.description'}
          styles={{ margin: '-1px 0 3rem 0'}}
        />
        {component}
        {/*<Form*/}
          {/*hash={this.props.location.hash}*/}
          {/*toggle={this.toggleModal}*/}
          {/*routePath={this.props.match.path}*/}
          {/*popUpHeaderNavLinks={this.popUpHeaderNavLinks}*/}
          {/*menuData={this.props.menu}*/}
          {/*redirectRoute={`${this.props.match.path}`}*/}
        {/*/>*/}
      </div>
    );
  }
}

HomePage.contextTypes = {
  plugins: PropTypes.object,
  updatePlugin: PropTypes.func,
};

HomePage.propTypes =  {
  deleteContentType: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  menu: PropTypes.array.isRequired,
  models: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};

const mapStateToProps = createStructuredSelector({
  homePage: selectHomePage(),
  modelsLoading: makeSelectLoading(),
  models: makeSelectModels(),
  menu: makeSelectMenu(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      deleteContentType,
    },
    dispatch,
  );
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
