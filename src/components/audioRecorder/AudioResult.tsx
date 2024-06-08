interface AudioResultProps {
    audioUrl: string | null; 
}

export function AudioResult ({ audioUrl }: AudioResultProps) { // Corrected the props parameter
    return(
        <div className="absolute top-[-70px] right-10 ">
            {audioUrl && <audio src={audioUrl} controls></audio>} {/* Added controls to the audio tag */}
        </div>
    )
}
