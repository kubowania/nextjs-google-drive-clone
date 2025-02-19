import { CldVideoPlayer } from "next-cloudinary"
import { useState, useEffect } from "react"
import {saveAs } from "file-saver"

const VideoCard = ({ asset }) => {
    const { public_id, display_name } = asset
    const [isLoading, setIsLoading] = useState(true)
    const [ retries, setRetries] = useState(0)
    const [ errorOccurred, setErrorOccurred] = useState(false)

    const downloadOGVideo = () => {
        const vidSrc = asset.url
        saveAs(vidSrc, display_name)
    }

    const handleVideoError = (err) => {
        if (err?.player?.videojs?.error_?.statusCode === 423) {
            if (!errorOccurred) {
                setErrorOccurred(true)
                setIsLoading(true)
                setRetries((prev) => prev + 1)
                console.log("Retrying video load...")
            }
        }
    }

    const handleMetaDataLoad = () => {
        setIsLoading(false)
        setErrorOccurred(false)
    }

    useEffect(() => {
        if (errorOccurred) {
            const intervalId = setInterval(() => {
                setRetries((prev) => prev + 1)
            }, 5000)

            return () => clearInterveral(intervalId)
        }
    }, [errorOccurred])

    useEffect(() => {
        if ( retries > 0 && !isLoading) {
            setIsLoading(false)
        }
    }, [retries])

    return (
        <article className="card">
            <div className="title-container">
                <h4><span className="emoji">▶</span>{display_name}</h4>
                <h4>⫶</h4>
            </div>

            {isLoading && <p>Loading...</p>}

            <div className="video-container" 
                 style={{ visibility: isLoading ? "hidden" : "visible"}}
            >
                <CldVideoPlayer
                    src={public_id}
                    id={public_id}
                    width="300"
                    height="300"
                    alt={display_name}
                    transformation={{
                        width: 300,
                        height: 300,
                        crop: "fill",
                        gravity: "auto"
                    }}
                    onMetadataLoad={handleMetaDataLoad}
                    onError={handleVideoError}

                />
            </div>

            <div className="controls-container">
                <div className="control-container">
                    <button onClick={downloadOGVideo}>↓ download original</button>
                </div>
            </div>
        </article>
    )
}
export default VideoCard