import React from 'react';
import PropTypes from 'prop-types';
import { includes, isEmpty, isFunction, mapKeys, reject } from 'lodash';
import cn from 'classnames';

//components
import Label from 'components/Label';
import Select from 'react-select';
import InputDescription from 'components/InputDescription';
import InputErrors from 'components/InputErrors';

import styles  from './styles.scss';

class PropertiesSelect extends React.Component {


  render() {

    const {
      className,
      customBootstrapClass,
      inputDescription,
      inputDescriptionClassName,
      inputDescriptionStyle,
      label,
      labelClassName,
      labelStyle,
      name,
      selectedProperties,
      style,
    } = this.props;

    const value = selectedProperties.toArray();


    return (
      <div className={cn(
        styles.container,
        customBootstrapClass,
        !isEmpty(className) && className,
      )}
           style={style}
      >
        <Label
          className={labelClassName}
          htmlFor={name}
          message={label}
          style={labelStyle}
        />
        <Select
          name="form-field-name"
          value={value}
          onChange={this.props.onChange}
          options={this.props.properties}
          multi={true}
        />
        <InputDescription
          className={inputDescriptionClassName}
          message={inputDescription}
          style={inputDescriptionStyle}
        />
      </div>
    );
  }
}

PropertiesSelect.defaultProps = {
  autoFocus: false,
  className: '',
  customBootstrapClass: 'col-md-6',
  deactivateErrorHighlight: false,
  didCheckErrors: false,
  disabled: false,
  errors: [],
  errorsClassName: '',
  errorsStyle: {},
  inputClassName: '',
  inputDescription: '',
  inputDescriptionClassName: '',
  inputDescriptionStyle: {},
  inputStyle: {},
  label: '',
  labelClassName: '',
  labelStyle: {},
  selectedProperties: [],
  style: {},
  tabIndex: '0',
};

PropertiesSelect.propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  deactivateErrorHighlight: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  properties: PropTypes.array.isRequired,
};


export default PropertiesSelect;