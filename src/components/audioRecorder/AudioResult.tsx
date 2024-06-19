interface AudioResultProps {
    audioUrl: string | null; 
}

export function AudioResult ({ audioUrl }: AudioResultProps) { 
    return(
        <div>
            {audioUrl && <audio src={audioUrl} controls></audio>} 
        </div>
    )
}
