import { useState } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';
import { AudioResult } from './AudioResult';


export function AudioElement() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null); // State to hold the URL of the recorded audio

  // Function to handle the recording completion and update the audio URL state
    const handleRecordingComplete = (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        console.log(url);
        
        setAudioUrl(url); 
    };

  return (
    <div className='flex items-center'>
        {/* Pass the handleRecordingComplete function to the AudioRecorder component */}
        <AudioRecorder
            onRecordingComplete={handleRecordingComplete}
            audioTrackConstraints={{ noiseSuppression: true, echoCancellation: true,}}
            onNotAllowedOrFound={(err) => console.table(err)}
            downloadFileExtension="webm"
            mediaRecorderOptions={{audioBitsPerSecond: 128000,}}
            showVisualizer
            
        />
        <br />

        {/* Pass the audio URL as a prop to the AudioResult component */}
        <AudioResult audioUrl={audioUrl} />
      
    </div>
  );
}
