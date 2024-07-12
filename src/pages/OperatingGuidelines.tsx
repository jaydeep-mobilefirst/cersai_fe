import { useEffect, useState } from "react";
import { useOperatingGuidelinesStore } from "../zust/useOperatingGuidelinesStore";
import axios from "axios";
import { bffUrl } from "../utils/api";

const OperatingGuidelines = () => {
  const { guidelinesPageData, setGuidelinesPageData } =
    useOperatingGuidelinesStore((state) => state);
  const [state, setState] = useState(true);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    GuidelinesPageCmsApi();
  }, [state]);

  const GuidelinesPageCmsApi = () => {
    setLoader(true);
    // setHomePageData(data.data.content)
    axios
      .get(bffUrl + `/websitecontent/list/4`)
      .then((response) => {
        setGuidelinesPageData(response?.data?.data?.content);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  };
  
  console.log("Guidelines",guidelinesPageData)

  return <div>abc</div>;
};
export default OperatingGuidelines;
