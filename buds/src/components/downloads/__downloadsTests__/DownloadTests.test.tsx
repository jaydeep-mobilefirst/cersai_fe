import React from "react";
import { render } from "@testing-library/react";
import DownloadItem from "../DownloadItem";

test("renders DownloadItem component with title", () => {
    const title = "Sample Title";
    const { getByText } = render(<DownloadItem title={title} />);
    
    const titleElement = getByText(title);
    expect(titleElement).toBeInTheDocument();
});
test("renders DownloadItem component with correct class names", () => {
    const title = "Sample Title";
    const { container } = render(<DownloadItem title={title} />);
    
    const divElement = container.firstChild;
    if (divElement) {
        expect(divElement).toHaveClass("md:w-[643px] xl:w-[48%] w-full min-h-16 md:px-4 px-2 py-3 bg-white rounded-lg border border-neutral-700/opacity-20 flex justify-start items-center");
        
        const pElement = divElement.firstChild;
        if (pElement) {
            expect(pElement).toHaveClass("w-[68%] md:w-full md:text-base text-[14px] font-bold text-gilroy-semibold");
        }
    
        const downloadDiv = divElement.lastChild;
        if (downloadDiv) {
            expect(downloadDiv).toHaveClass("md:w-[140px] h-11 md:px-6 px-4 py-2.5 bg-blue-900 rounded-lg justify-center items-center gap-2 inline-flex");
            
            const imgElement = downloadDiv.firstChild;
            // Continue with your checks for imgElement
        }
    }
});
