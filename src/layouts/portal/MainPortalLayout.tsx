import MainPortalSidebar from "../../components/userFlow/mainPortal/MainPortalSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/userFlow/mainPortal/Header";
import FormHandlerProviders from "../../contextAPI/useFormFieldHandlers";
import useInactivity from "../../custom hooks/useInactivity";
import { useEffect } from "react";
import Swal from "sweetalert2";

type Props = {};

const MainPortalLayout = (props: Props) => {
  const isActive = useInactivity(10 * 60 * 1000); // 10 minutes in milliseconds
  const navigate = useNavigate();

  useEffect(() => {
    if (!isActive) {
      Swal.fire({
        icon: "error",
        title: "User inactive for 10 minutes. Please login again",
        timer: 5000,
      });

      setTimeout(() => {
        navigate("/");
        sessionStorage.clear();
      }, 2000);
    }
  }, [isActive, navigate]);
  useEffect(() => {
    const refreshPage = sessionStorage.getItem("refreshCount");

    // Handle page refresh detection
    if (refreshPage === "1") {
      Swal.fire({
        icon: "error",
        title: "Do not refresh the page. Please login again",
        timer: 5000,
      });

      setTimeout(() => {
        sessionStorage.clear();
        navigate("/");
      }, 2000);
    }

    // Increment the refresh count on page unload (refresh)
    const incrementRefreshCount = () => {
      const count = parseInt(sessionStorage.getItem("refreshCount") || "0", 10);
      sessionStorage.setItem("refreshCount", (count + 1).toString());
    };

    // Listen for page refresh or unload
    window.addEventListener("beforeunload", incrementRefreshCount);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", incrementRefreshCount);
    };
  }, [navigate]);
  return (
    <div>
      <MainPortalSidebar
        layout={
          <FormHandlerProviders>
            <Outlet />
          </FormHandlerProviders>
        }
      />
    </div>
  );
};

export default MainPortalLayout;
