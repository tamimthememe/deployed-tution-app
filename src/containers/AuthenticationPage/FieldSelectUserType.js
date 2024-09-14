import React from 'react';
import { bool, string } from 'prop-types';
import { Field } from 'react-final-form';
import classNames from 'classnames';
import { intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import * as validators from '../../util/validators';
import { FieldSelect } from '../../components';
import { useLocation } from 'react-router-dom';
import css from './AuthenticationPage.module.css';

const FieldHidden = props => {
  const { name } = props;
  return (
    <Field id={name} name={name} type="hidden" className={css.unitTypeHidden}>
      {fieldRenderProps => <input {...fieldRenderProps?.input} />}
    </Field>
  );
};

const FieldSelectUserType = props => {
  const { rootClassName, className, name, userTypes, hasExistingUserType, intl } = props;
  const hasMultipleUserTypes = userTypes?.length > 1;
  const classes = classNames(rootClassName || css.userTypeSelect, className);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userType = queryParams.get('userType') || ''; // Default to empty if not present

  return hasMultipleUserTypes && !hasExistingUserType ? (
    <>
      <FieldSelect
        id={name}
        name={name}
        className={classes}
        label={intl.formatMessage({ id: 'FieldSelectUserType.label' })}
        validate={validators.required(intl.formatMessage({ id: 'FieldSelectUserType.required' }))}
        userType={userType}
      >
        <option disabled value="">
          {intl.formatMessage({ id: 'FieldSelectUserType.placeholder' })}
        </option>
        {userType
          ? userTypes.map(config => {
              if (userType === config.userType) {
                return (
                  <option key={config.userType} value={config.userType} selected>
                    {config.label}
                  </option>
                );
              }
            })
          : userTypes.map(config => (
              <option key={config.userType} value={config.userType}>
                {config.label}
              </option>
            ))}
      </FieldSelect>
    </>
  ) : (
    <>
      <FieldHidden name={name} />
    </>
  );
};

FieldSelectUserType.defaultProps = {
  rootClassName: null,
  className: null,
  hasExistingUserType: false,
};

FieldSelectUserType.propTypes = {
  rootClassName: string,
  className: string,
  name: string.isRequired,
  userTypes: propTypes.userTypes.isRequired,
  hasExistingUserType: bool,
  intl: intlShape.isRequired,
};

export default FieldSelectUserType;
