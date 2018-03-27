import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import {get, map, includes, split, isEmpty, findIndex} from 'lodash';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

//Components
import PropertiesSelect from 'components/PropertiesSelect';
import TypeSelect from 'components/TypeSelect';
import PropertyForm from 'components/PropertyForm';
import Button from 'components/Button';


import styles from './styles.scss';
import Immutable from 'immutable';
import PropertiesForm from "../PropertiesForm";

class TypeForm extends React.Component {

  getSaveButton() {
    if(this.props.typeName){
      return (
        <Button label={'semantic-content-type-builder.typeForm.button.text'} secondaryHotlineAdd />
      );
    }

    return;
  }

  generatePropertiesForm() {

    if(this.props.selectedProperties.size > 0) {
      return  (
        <PropertiesForm
          properties={this.props.selectedProperties}
          propertiesValues={this.props.filledProperties}
          changeProperty={this.props.fillProperty}
          removeProperty={this.props.removeProperty}
        />
      );

    }

    return;
  }

  generatePropertiesSelect() {

    if (this.props.selectedType && this.props.typeProperties.size != 0) {

      const properties = this.props.typeProperties.map((item) => {
        return (
          { value:  item.get('@id'), label:  item.get('label') }
        );
      }).toArray();


      return (
          <PropertiesSelect
            onChange={this.props.selectProperties}
            properties={properties}
            name="Properties"
            selectedProperties={this.props.selectedProperties}
            label={{ id: 'semantic-content-type-builder.typeForm.properties.label'}}
          />
      );
    }
    return;
  }


  render() {

    const propertiesSelect = this.generatePropertiesSelect();
    const propertiesForm = this.generatePropertiesForm();
    const saveButton = this.getSaveButton();

    return (
      <div>
        <div className="row">
          <TypeSelect
            options={this.props.types}
            label={{ id: 'semantic-content-type-builder.typeForm.type.label'}}
            name="Type"
            value={this.props.selectedType}
            onChange={this.props.selectType}
          />
          {propertiesSelect}
          {propertiesForm}
        </div>
        {saveButton}
      </div>
    );
  }
}

TypeForm.defaultProps = {
  typeProperties: false
};

TypeForm.propTypes = {
  fillProperty: PropTypes.func.isRequired,
  filledProperties: PropTypes.object.isRequired,
  removeProperty: PropTypes.func.isRequired,
  selectedProperties: PropTypes.object,
  selectedType: PropTypes.string,
  selectType: PropTypes.func.isRequired,
  selectProperties: PropTypes.func.isRequired,
  typeProperties: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
  types: PropTypes.array,
};


export default TypeForm;
