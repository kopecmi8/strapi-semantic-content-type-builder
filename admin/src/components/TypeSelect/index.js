import React from 'react';
import PropTypes from 'prop-types';
import { includes, isEmpty, isFunction, mapKeys, reject } from 'lodash';
import cn from 'classnames';

//components
import Label from 'components/Label';
import Select from 'react-select';
import InputDescription from 'components/InputDescription';

//styles
import styles  from './styles.scss';

class TypeSelect extends React.Component {


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
      onChange,
      style,
      options,
      value
    } = this.props;

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
          name={name}
          value={value}
          onChange={onChange}
          options={options}
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

TypeSelect.defaultProps = {
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
  opitions: [],
  style: {},
  tabIndex: '0',
  value: null,
};

TypeSelect.propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  deactivateErrorHighlight: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
};


export default TypeSelect;