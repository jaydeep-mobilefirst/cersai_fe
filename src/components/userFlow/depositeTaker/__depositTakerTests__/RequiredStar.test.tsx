import React from 'react';
import { render } from '@testing-library/react';
import RequiredStar from '../RequiredStar';

describe('RequiredStar', () => {
   
    it('should render a star if schemeFormValidations is an array containing the required validation', () => {
        const field = {
            schemeFormValidations: [{ validationId: 1 }],
        };
        const allFormData = {
            validations: [
                {
                    vld_type_name: 'Required',
                    id: 1,
                },
            ],
        };

        const { getByText } = render(
            <RequiredStar field={field} allFormData={allFormData} />
        );

        expect(getByText('*')).toBeInTheDocument();
    });

    it('should not render a star if regFormFieldsValidations is false and schemeFormValidations is an empty array', () => {
        const field = {
            regFormFieldsValidations: false,
            schemeFormValidations: [],
        };
        const allFormData = {
            validations: [
                {
                    vld_type_name: 'Required',
                    id: 1,
                },
            ],
        };

        const { queryByText } = render(
            <RequiredStar field={field} allFormData={allFormData} />
        );

        expect(queryByText('*')).toBeNull();
    });
});
