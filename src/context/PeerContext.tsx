import React, { useCallback, useEffect, useMemo, useState, ReactNode } from "react";
import { useAppDispatch } from "../hooks/useTypedSelectors";
import { changeCallStatus } from "../services/videoCallApi";

interface PeerContextType {
    peer: RTCPeerConnection;
    createOffer: () => Promise<RTCSessionDescriptionInit>;
    createAnswer: (offer: RTCSessionDescriptionInit) => Promise<RTCSessionDescriptionInit>;
    setRemoteAns: (ans: RTCSessionDescriptionInit) => Promise<void>;
    sendStream: (stream: MediaStream | null) => void;
    remoteStream: MediaStream | null;
    hangUp: (roomId: string) => void;
}

interface PeerProviderProps {
    children: ReactNode;
}

export const PeerContext = React.createContext<PeerContextType>({} as PeerContextType);

export function PeerProvider({ children }: PeerProviderProps) {
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

    const dispatch = useAppDispatch();

    const peer = useMemo(() => {
        const pc = new RTCPeerConnection({
            iceServers: [
                {
                    urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"],
                },
            ],
        });

        pc.addEventListener("track", (event) => {
            setRemoteStream(event.streams[0]);
        });

        return pc;
        
    }, []);

    const createOffer = async (): Promise<RTCSessionDescriptionInit> => {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(new RTCSessionDescription(offer));
        return offer;
    };

    const createAnswer = async (offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit> => {
        await peer.setRemoteDescription(offer);
        const answer = await peer.createAnswer();
        await peer.setLocalDescription(new RTCSessionDescription(answer));        
        return answer;
    };

    const setRemoteAns = async (ans: RTCSessionDescriptionInit): Promise<void> => {
        try {
            await peer.setRemoteDescription(new RTCSessionDescription(ans));
        } catch (error) {
            console.log(error, "setRemoteAns");
        }
    };

    const sendStream = (stream: MediaStream | null): void => {
        console.log("stream in context", stream);
        
        if (stream) {
            stream.getTracks().forEach((track) => {
                peer.addTrack(track, stream);
            });
        } else {
            console.error("No stream to send.");
        }
    };

    const handleTrackEvent = useCallback((event: RTCTrackEvent) => {
        try {
            const stream = event.streams[0];
            setRemoteStream(stream);
            
        } catch (error) {
            console.log(error, "handleTrackEvent");
        }
    }, []);

    useEffect(() => {
        console.log("from use effect");
        peer.addEventListener("track", handleTrackEvent);
        return () => {
            peer.removeEventListener("track", handleTrackEvent);
        };
    }, [handleTrackEvent, peer]);

    

    const hangUp = async(roomId: string) => {
        const response = await dispatch(changeCallStatus({roomId: roomId, status: "ended"}));
        if(response.payload.success) {
            peer.close();
            setRemoteStream(null);
        } else {
            alert("something went wrong")
        }
    };

    console.log(remoteStream, "remoteStream");
    

    return (
        <PeerContext.Provider value={{ peer, createOffer, createAnswer, setRemoteAns, sendStream, remoteStream, hangUp }}>
            {children}
        </PeerContext.Provider>
    );
}
