// import React from "react";
// import { render } from "@testing-library/react";
// import SchemeSearchTabsContainer from "../schemeSearchTabs";

// describe("SchemeSearchTabsContainer", () => {
//     it("renders SchemeSearchTab components with correct props", () => {
//         const { getByText } = render(<SchemeSearchTabsContainer />);
        
//         const schemeRegisteredTab = getByText("Scheme Registered");
//         expect(schemeRegisteredTab).toBeInTheDocument();
//         expect(schemeRegisteredTab).toHaveAttribute("value", "1000k");
//         expect(schemeRegisteredTab).toHaveClass("bg-[#E7F0FF]");
        
//         const bannedTab = getByText("Banned");
//         expect(bannedTab).toBeInTheDocument();
//         expect(bannedTab).toHaveAttribute("value", "1000k");
//         expect(bannedTab).not.toHaveClass("bg-[#E7F0FF]");
        
//         const activeTab = getByText("Active");
//         expect(activeTab).toBeInTheDocument();
//         expect(activeTab).toHaveAttribute("value", "1000k");
//         expect(activeTab).toHaveClass("bg-[#E7F0FF]");
        
//         const underLitigationTab = getByText("Under litigation");
//         expect(underLitigationTab).toBeInTheDocument();
//         expect(underLitigationTab).toHaveAttribute("value", "1000k");
//         expect(underLitigationTab).not.toHaveClass("bg-[#E7F0FF]");
        
//         const depositsNotBeingTakenTab = getByText("Active - deposits not being taken");
//         expect(depositsNotBeingTakenTab).toBeInTheDocument();
//         expect(depositsNotBeingTakenTab).toHaveAttribute("value", "1000k");
//         expect(depositsNotBeingTakenTab).toHaveClass("bg-[#E7F0FF]");
//     });
// });
