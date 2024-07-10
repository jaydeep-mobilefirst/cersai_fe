

import { useLandingStore } from "../../zust/useLandingStore";

const VideoComp =()=>{
    const { homePageData } = useLandingStore((state) => state);
    return(
        <div className='' >
            <iframe
                className="w-[100%] md:w-[350px] md:h-[302px] lg:w-[500px] lg:h-[280px] xl:w-[540px] xl:h-[302px] mt-5 video-border"
                src={homePageData?.homePageData?.aboutBudsComp[4].link}
                allowFullScreen
                title={homePageData?.homePageData?.aboutBudsComp[4].link}
                // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                >
             </iframe>
        </div>

    )
}
export default VideoComp;