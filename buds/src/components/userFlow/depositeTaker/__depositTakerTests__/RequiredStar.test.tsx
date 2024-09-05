import React from 'react';
import { render } from '@testing-library/react';
import RequiredStar from '../RequiredStar';

describe('RequiredStar', () => {
    it('should render a star if regFormFieldsValidations is true', () => {
        const field = {
            regFormFieldsValidations: true,
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

    it('should render a star if schemeFormValidations is true', () => {
        const field = {
            schemeFormValidations: true,
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

    it('should not render a star if regFormFieldsValidations and schemeFormValidations are false', () => {
        const field = {
            regFormFieldsValidations: false,
            schemeFormValidations: false,
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
