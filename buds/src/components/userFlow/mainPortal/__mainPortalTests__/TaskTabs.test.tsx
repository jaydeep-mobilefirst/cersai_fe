// import { render, screen, fireEvent } from "@testing-library/react";
// import { BrowserRouter } from "react-router-dom";
// import TaskTabs from "../TaskTabs";
// import React from "react";

// test("renders TaskTabs component", () => {
//     render(
//         <BrowserRouter>
//             <TaskTabs />
//         </BrowserRouter>
//     );

//     // Assert that the component is rendered
//     const taskTabsElement = screen.getByTestId("task-tabs");
//     expect(taskTabsElement).toBeInTheDocument();

//     // Assert that the tabs are rendered
//     const profileTab = screen.getByText("Profile");
//     const resetPasswordTab = screen.getByText("Reset Password");
//     expect(profileTab).toBeInTheDocument();
//     expect(resetPasswordTab).toBeInTheDocument();
// });

// test("changes active tab on click", () => {
//     render(
//         <BrowserRouter>
//             <TaskTabs />
//         </BrowserRouter>
//     );

//     // Assert that the initial active tab is "Profile"
//     // const profileTab = screen.getByText("Profile");
//     // expect(profileTab).toHaveClass("active");

//     // // Click on the "Reset Password" tab
//     // const resetPasswordTab = screen.getByText("Reset Password");
//     // fireEvent.click(resetPasswordTab);

//     // // Assert that the active tab is now "Reset Password"
//     // expect(profileTab).not.toHaveClass("active");
//     // expect(resetPasswordTab).toHaveClass("active");
// });
