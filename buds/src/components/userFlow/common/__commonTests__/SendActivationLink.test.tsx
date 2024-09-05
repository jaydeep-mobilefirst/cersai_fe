import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import SendActivationLink from '../SendActivationLink';
import React from 'react';
import InputFieldPassword from '../InputFieldPassword';

jest.mock('axios');

describe('SendActivationLink', () => {
    it('should render the component', () => {
        render(<SendActivationLink email="test@example.com" />);
        
        // Assert that the component is rendered
        expect(screen.getByAltText('Send')).toBeInTheDocument();
    });

    test("toggles password visibility on button click", () => {
        render(<InputFieldPassword />);
        const inputElement = screen.getByRole("textbox") as HTMLInputElement;
        const toggleButton = screen.getByRole("button");
    
        // Password should be hidden by default
        expect(inputElement.type).toBe("password");
    
        // Click the toggle button
        fireEvent.click(toggleButton);
    
        // Password should be visible
        expect(inputElement.type).toBe("text");
    
        // Click the toggle button again
        fireEvent.click(toggleButton);
    
        // Password should be hidden again
        expect(inputElement.type).toBe("password");
    });

    // it('should handle error when sending activation link', async () => {
    //     // Mock axios post request to throw an error
    //     mockedAxios.post.mockRejectedValueOnce(new Error('Failed to send activation link'));
    
    //     render(<SendActivationLink email="test@example.com" />);
            
    //     // Click on the send button
    //     fireEvent.click(screen.getByAltText('Send'));
    
    //     // Assert that the loader is displayed
    //     expect(screen.getByTestId('loader')).toBeInTheDocument();
    
    //     // Wait for the axios post request to reject
    //     // Your test implementation here
    // });
});

