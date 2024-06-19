import { AudioRecorder } from 'react-audio-voice-recorder';

interface AudioElementProps {
  setAudioFile: (audioFile: File) => void;
}



export function AudioElement({setAudioFile}: AudioElementProps) {

  // Function to handle the recording completion and update the audio URL state
    const handleRecordingComplete = (blob: Blob) => {
              
        const audioFile = new File([blob], 'recording.webm', {
          type: blob.type,
          lastModified: Date.now(),
        });
        setAudioFile(audioFile); 
        
        console.log("from audio element",audioFile);
        
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

    </div>
  );
}
