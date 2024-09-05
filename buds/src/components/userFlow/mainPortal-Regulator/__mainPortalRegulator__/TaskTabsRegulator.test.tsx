// import { render, screen, fireEvent } from "@testing-library/react";
// import { BrowserRouter } from "react-router-dom";
// import TaskTabsRegulator from "../TaskTabsRegulator";
// import React from "react";

// test("renders TaskTabsRegulator component", () => {
//     render(
//         <BrowserRouter>
//             <TaskTabsRegulator />
//         </BrowserRouter>
//     );

//     // Assert that the component renders without errors
//     const taskTabsRegulatorElement = screen.getByTestId("task-tabs-regulator");
//     expect(taskTabsRegulatorElement).toBeInTheDocument();

//     // Assert that the initial active tab is "Profile"
//     const profileTabElement = screen.getByText("Profile");
//     expect(profileTabElement).toHaveClass("active");

//     // Simulate clicking on the "Reset Password" tab
//     const resetPasswordTabElement = screen.getByText("Reset Password");
//     fireEvent.click(resetPasswordTabElement);

//     // Assert that the active tab is now "Reset Password"
//     expect(profileTabElement).not.toHaveClass("active");
//     expect(resetPasswordTabElement).toHaveClass("active");
// });
