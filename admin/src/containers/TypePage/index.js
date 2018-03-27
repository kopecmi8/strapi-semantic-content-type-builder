/*
 *
 * TypePage
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
import reducer from './reducer';
import saga from './saga';

import styles from './styles.scss';

//Actions
import {
  fillProperty,
  getTypes,
  removeProperty,
  selectType,
  selectProperties,
} from './actions';

//Selectors
import {
  makeSelectLoading,
  makeSelectTypeProperties,
  makeSelectTypeName,
  makeSelectTypes,
  makeSelectSelectedProperties,
  makeSelectFilledProperties
} from './selectors';

//Components
import ContentHeader from 'components/ContentHeader';
import TypeForm from 'components/TypeForm';



export class TypePage extends React.Component {

  componentDidMount() {
    this.props.getTypes();
  }

  render() {

    return (
      <div className={styles.typePage}>
        <ContentHeader
          name={'semantic-content-type-builder.type.contentHeader.name'}
          description={'semantic-content-type-builder.type.contentHeader.description'}
          styles={{ margin: '-1px 0 3rem 0'}}
        />
        <TypeForm
          filledProperties={this.props.filledProperties}
          fillProperty={this.props.fillProperty}
          removeProperty={this.props.removeProperty}
          selectType={this.props.selectType}
          selectProperties={this.props.selectProperties}
          types={this.props.types}
          typeProperties={this.props.typeProperties}
          selectedType={this.props.typeName}
          selectedProperties={this.props.selectedProperties}
        />

      </div>

    );
  }
}

TypePage.contextTypes = {
  router: PropTypes.object,
};

TypePage.propTypes = {
  filledProperties: PropTypes.object.isRequired,
  fillProperty: PropTypes.func.isRequired,
  getTypes: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  removeProperty: PropTypes.func.isRequired,
  selectedProperties: PropTypes.object.isRequired,
  selectType: PropTypes.func.isRequired,
  selectProperties: PropTypes.func.isRequired,
  typeName: PropTypes.string,
  typeProperties: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
  types: PropTypes.array.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fillProperty,
      getTypes,
      removeProperty,
      selectType,
      selectProperties,
    },
    dispatch,
  );
}

const mapStateToProps = createStructuredSelector({
  filledProperties: makeSelectFilledProperties(),
  loading: makeSelectLoading(),
  selectedProperties: makeSelectSelectedProperties(),
  typeName: makeSelectTypeName(),
  typeProperties: makeSelectTypeProperties(),
  types: makeSelectTypes(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'typePage', reducer });
const withSaga = injectSaga({ key: 'typePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(injectIntl(TypePage));
