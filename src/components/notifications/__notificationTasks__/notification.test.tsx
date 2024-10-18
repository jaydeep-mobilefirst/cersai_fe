import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NotificationItem from "../NotificationItem"; // Adjust the path as needed

describe("NotificationItem Component", () => {
  const mockButtons = [
    {
      name: "View Details",
      text: "View",
      img: null, // No image for the test
      link: "https://example.com",
    },
  ];

  test("renders the notification title, date, and button text", () => {
    render(
      <NotificationItem
        title="Sample Notification"
        date="2024-10-01"
        links={null}
        buttons={mockButtons}
        notificationType="type"
      />
    );

    // Check if the title and date are rendered
    expect(screen.getByText("Sample Notification")).toBeInTheDocument();
    expect(screen.getByText("2024-10-01")).toBeInTheDocument();

    // Check if the button text is rendered
    expect(screen.getByText("View")).toBeInTheDocument();
  });

  test("opens the correct URL when the button is clicked", () => {
    const openSpy = jest.spyOn(window, "open").mockImplementation(() => null);

    render(
      <NotificationItem
        title="Sample Notification"
        date="2024-10-01"
        links={mockButtons[0].link}
        buttons={mockButtons}
        notificationType="type"
      />
    );

    // Simulate button click
    const button = screen.getByText("View");
    fireEvent.click(button);

    // Verify that window.open is called with the correct link
    expect(openSpy).toHaveBeenCalledWith("https://example.com", "_blank");

    // Clean up
    openSpy.mockRestore();
  });

  test("renders default alt text for the button image when no image is provided", () => {
    render(
      <NotificationItem
        title="Sample Notification"
        date="2024-10-01"
        links={null}
        buttons={mockButtons}
        notificationType="type"
      />
    );

    // Check if the image is rendered with the correct alt text
    const img = screen.getByAltText("eye");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("alt", "eye");
  });

  test("renders the button with a valid image if provided", () => {
    const buttonWithImage = [
      {
        name: "View Details",
        text: "View",
        img: "https://example.com/image.png",
        link: "https://example.com",
      },
    ];

    render(
      <NotificationItem
        title="Sample Notification"
        date="2024-10-01"
        links={buttonWithImage[0].link}
        buttons={buttonWithImage}
        notificationType="type"
      />
    );

    // Check if the image is rendered with the correct src
    const img = screen.getByAltText("eye");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/image.png");
  });
});
