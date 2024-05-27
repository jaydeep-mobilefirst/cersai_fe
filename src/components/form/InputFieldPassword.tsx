import { FC, InputHTMLAttributes, forwardRef, useState } from "react";
import Eye from "../../assets/images/eye2.svg";
import EyeHide from "../../assets/images/eye-slash.svg";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const InputFieldPassword: FC<InputProps> = forwardRef<
  HTMLInputElement,
  InputProps
>(({ className, error, ...rest }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        className={`${
          error && "border-[red] text-[red]"
        } form-input border flex border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-300 ${className} justify-between align-middle pr-12`}
        style={{
          height: "56px",
          width: "100%",
          padding: "8px 16px",
        }}
        {...rest}
        ref={ref}
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 focus:outline-none"
      >
        <img src={Eye} alt="Eye" className="h-5 w-5 m-[10px]" />
      </button>
    </div>
  );
});

export default InputFieldPassword;
