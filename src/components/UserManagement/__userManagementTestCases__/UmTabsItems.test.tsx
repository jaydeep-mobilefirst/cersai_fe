// import React from "react";
// import { render, fireEvent } from "@testing-library/react";
// import UmTabsItem from "../UmTabItems";

// describe("UmTabsItem", () => {
//     test("renders text correctly", () => {
//         const { getByText } = render(
//             <UmTabsItem text="Test Text" isActive={false} onClick={() => {}} />
//         );
//         const textElement = getByText("Test Text");
//         expect(textElement).toBeInTheDocument();
//     });

//     // test("applies active styles when isActive is true", () => {
//     //     const { container } = render(
//     //         <UmTabsItem text="Test Text" isActive={true} onClick={() => {}} />
//     //     );
//     //     const listItem = container.querySelector("li");
//     //     expect(listItem).toHaveClass("font-bold text-[#1C468E]");
//     //     const divider = container.querySelector(".self-stretch");
//     //     expect(divider).toHaveClass("bg-[#1C468E]");
//     // });

//     // test("applies inactive styles when isActive is false", () => {
//     //     const { container } = render(
//     //         <UmTabsItem text="Test Text" isActive={false} onClick={() => {}} />
//     //     );
//     //     const listItem = container.querySelector("li");
//     //     expect(listItem).not.toHaveClass("font-bold text-[#1C468E]");
//     //     const divider = container.querySelector(".self-stretch");
//     //     expect(divider).toHaveClass("bg-white");
//     // });

//     test("calls onClick when clicked", () => {
//         const onClickMock = jest.fn();
//         const { container } = render(
//             <UmTabsItem text="Test Text" isActive={false} onClick={onClickMock} />
//         );
//         const listItem = container.querySelector("li");
//         if (listItem) {
//             fireEvent.click(listItem);
//             expect(onClickMock).toHaveBeenCalled();
//         }
//     });
// });
