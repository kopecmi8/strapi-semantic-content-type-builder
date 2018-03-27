/**
 * Properties form component
 */

import React from 'react';
import PropTypes from 'prop-types';

import PropertyForm from 'components/PropertyForm';


class PropertiesForm extends React.Component {


  render() {

    return (
      <div className="col-md-12">
        {this.props.properties.map((item, i) => {
          const propertyValues = this.props.propertiesValues.get(item);

          return (
            <PropertyForm
              property={item}
              key={i}
              onChange={this.props.changeProperty}
              remove={this.props.removeProperty}
              values={propertyValues}
            />
          );
        })}
      </div>
    );


  }
}

PropertiesForm.propTypes = {
  changeProperty: PropTypes.func.isRequired,
  propertiesValues: PropTypes.object.isRequired,
  properties: PropTypes.object.isRequired,
  removeProperty: PropTypes.func.isRequired,
};

export default PropertiesForm;