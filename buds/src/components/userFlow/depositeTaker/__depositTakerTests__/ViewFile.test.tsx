import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import ViewFile from '../ViewFile';

jest.mock('axios');

describe('ViewFile', () => {
    const uploadFileId = '123';

    it('should render the "View" button', () => {
        const { getByText } = render(<ViewFile uploadFileId={uploadFileId} />);
        const viewButton = getByText('View');
        expect(viewButton).toBeInTheDocument();
    });

    // it('should open the file in a new tab when the "View" button is clicked', async () => {
    //     const mockData = {
    //         status: 'success',
    //         data: {
    //             data: new ArrayBuffer(10),
    //         },
    //     };
    //     axios.get.mockResolvedValueOnce({ data: mockData });

    //     const { getByText } = render(<ViewFile uploadFileId={uploadFileId} />);
    //     const viewButton = getByText('View');

    //     fireEvent.click(viewButton);

    //     await waitFor(() => {
    //         expect(window.open).toHaveBeenCalledTimes(1);
    //         expect(window.open).toHaveBeenCalledWith(expect.any(String), '_blank', 'noopener');
    //     });
    // });

    // it('should display an error message when there is an internal server error', async () => {
    //     const mockData = {
    //         status: 'INTERNAL_SERVER_ERROR',
    //     };
    //     axios.get.mockResolvedValueOnce({ data: mockData });

    //     const { getByText } = render(<ViewFile uploadFileId={uploadFileId} />);
    //     const viewButton = getByText('View');

    //     fireEvent.click(viewButton);

    //     await waitFor(() => {
    //         expect(window.open).not.toHaveBeenCalled();
    //         expect(getByText('Internal Server Error')).toBeInTheDocument();
    //     });
    // });

    // it('should display the loader while loading the file', async () => {
    //     const mockData = {
    //         status: 'success',
    //         data: {
    //             data: new ArrayBuffer(10),
    //         },
    //     };
    //     axios.get.mockResolvedValueOnce({ data: mockData });

    //     const { getByText, getByTestId } = render(<ViewFile uploadFileId={uploadFileId} />);
    //     const viewButton = getByText('View');

    //     fireEvent.click(viewButton);

    //     expect(getByTestId('loader')).toBeInTheDocument();

    //     await waitFor(() => {
    //         expect(getByTestId('loader')).not.toBeInTheDocument();
    //     });
    // });
});
