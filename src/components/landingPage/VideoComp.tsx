
const VideoComp =()=>{
    return(
        <div className='' >
            <iframe
                className="w-[100%] md:w-[350px] md:h-[302px] lg:w-[500px] lg:h-[280px] xl:w-[540px] xl:h-[302px] mt-5 video-border"
                src="https://www.youtube.com/embed/FF3fuYLnApQ"
                allowFullScreen
                // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                >
             </iframe>
        </div>

    )
}
export default VideoComp;