import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';

import styles from './styles.scss';

//Components
import InputText from 'components/InputTextWithErrors';
import Label from 'components/Label';
import IcoContainer from 'components/IcoContainer';


class PropertyForm extends React.Component {

  constructor(props) {
    super(props);
  }

  handleChange(event) {

    const {
      property
    } = this.props;

    const propertyValue = {
      label: event.target.value,
      id: property
    };

    this.props.onChange(propertyValue);
  }

  makeDefaultLabelName(){

    let label = this.props.property;
    label = label.replace('http://schema.org/', '').replace(/([a-z](?=[A-Z]))/g, '$1 ');

    return label;

  }

  handleRemove(event) {
    this.props.remove(event.target.id);
  }

  render() {

    let value = this.makeDefaultLabelName();

    if(this.props.values) {
      value = this.props.values.get('label');
    }

    const icons = [{ icoType: 'trash', onClick: this.handleRemove.bind(this), id: this.props.property }];


    return (
      <div className="row">
        <div
          className={cn(
            'col-md-10',
            styles.property,
          )}
        >
          <span className={styles.property__name}>
            <Label message={{ id:'semantic-content-type-builder.propertyForm.property.label'}} /> {this.props.property}
          </span>
        </div>
        <div className={cn('col-md-2')}>
            <IcoContainer icons={icons} />
        </div>
        <InputText
          name={this.props.property}
          label='Label'
          onChange={this.handleChange.bind(this)}
          value={value}
        />
      </div>
    );

  }
}


PropertyForm.propTypes = {
  property: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  values: PropTypes.object,
  remove: PropTypes.func.isRequired,
};


export default compose()(injectIntl(PropertyForm));