// import React from "react";
// import { render } from "@testing-library/react";
// import ReviewMainListing from "../ReviewMainListing";

// describe("ReviewMainListing", () => {
//     it("renders without crashing", () => {
//         const allFormData = {
//             entitySections: [],
//             formFields: {
//                 form_fields: [],
//             },
//         };
//         const urlList: any[] = [];
//         const documentData: never[] = [];
//         const isPdfMode = false;

//         render(
//             <ReviewMainListing
//                 allFormData={allFormData}
//                 urlList={urlList}
//                 documentData={documentData}
//                 isPdfMode={isPdfMode}
//             />
//         );
//     });

//     it("renders section name correctly", () => {
//         const allFormData = {
//             entitySections: [
//                 {
//                     id: 1,
//                     sectionName: "Section 1",
//                 },
//                 {
//                     id: 2,
//                     sectionName: "Section 2",
//                 },
//             ],
//             formFields: {
//                 form_fields: [],
//             },
//         };
//         const urlList: any[] = [];
//         const documentData: never[] = [];
//         const isPdfMode = false;

//         const { getByText } = render(
//             <ReviewMainListing
//                 allFormData={allFormData}
//                 urlList={urlList}
//                 documentData={documentData}
//                 isPdfMode={isPdfMode}
//             />
//         );

//         expect(getByText("Section 1")).toBeInTheDocument();
//         expect(getByText("Section 2")).toBeInTheDocument();
//     });

//     // Add more test cases as needed...
// });
