
// export default ActionButton;
import React, { FC, forwardRef } from "react";

// Import your SVG icons
import EyeSvg from "../../assets/images/eye2.svg";
import EditSvg from "../../assets/images/bedit.svg";
import DeleteSvg from "../../assets/images/delete.svg";
import SendSvg from "../../assets/images/send.svg";
import ExportSvg from "../../assets/images/export.svg";
import ArrowDownSvg from "../../assets/images/arrow-down.svg";
import AddCircleSvg from "../../assets/images/add-circle.svg";
import ExportWhiteSvg from "../../assets/images/export_white.svg";
import MagicPenSvg from "../../assets/images/magicpen-svgrepo-com.svg";
import "./ActionButton.css";

// Interface for component props
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "eye"
    | "edit"
    | "delete"
    | "send"
    | "export"
    | "exportWhite"
    | "arrowDown"
    | "addCircle"
    | "magicpen";
  variantHeight?: number;
  variantWidth?: number;
}

// ActionButton component
const ActionButton: FC<Props> = forwardRef<HTMLButtonElement, Props>(
  (
    { variant = "edit", variantHeight = 45, variantWidth = 45, ...Props },
    ref
  ) => {
    // Object mapping variant to SVG
    const svgObject: { [key: string]: string } = {
      eye: EyeSvg,
      edit: EditSvg,
      delete: DeleteSvg,
      send: SendSvg,
      export: ExportSvg,
      arrowDown: ArrowDownSvg,
      addCircle: AddCircleSvg,
      exportWhite: ExportWhiteSvg,
      magicpen: MagicPenSvg,
    };

    // Render button with SVG image
    return (
      <button
        ref={ref}
        {...Props}
        className="action-button"
        style={{ width: variantWidth, height: variantHeight }}
      >
        <img
          src={svgObject[variant]}
          alt={`${variant} Icon`}
          style={{ width: "100%", height: "100%" }}
        />
      </button>
    );
  }
);

export default ActionButton;
