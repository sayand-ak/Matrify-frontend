import { useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { IoVideocam } from "react-icons/io5";
import "./Room.css";
import { useNavigate, useParams } from "react-router-dom";
import { ImPhoneHangUp } from "react-icons/im";
import { SiGoogleclassroom } from "react-icons/si";
import { FaVideoSlash } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { useSocket } from "../../../hooks/useSocket";
import { usePeer } from "../../../hooks/usePeer";



export function Room() {
    const { socket } = useSocket();
    const { peer, createOffer, createAnswer, setRemoteAns, sendStream, remoteStream, hangUp } = usePeer();
    const [myStream, setMyStream] = useState<MediaStream | null>(null);
    const [remoteUserId, setRemoteUserId] = useState<string>();
    const [isVideoEnable, setIsVideoEnable] = useState(true);
    const navigate = useNavigate();
    const roomId = useParams();

    const handleNewUserJoined = useCallback(async ({ callerId }: { callerId: string }) => {
        try {         
            console.log(callerId, "{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}");
             
            const offer = await createOffer();
            socket.emit('call-user', { callerId, offer });
            setRemoteUserId(callerId);
        } catch (error) {
            console.error("Error handling new user joined:", error);
        }
    }, [createOffer, socket]);


    const handleIncomingCall = useCallback(async (data: {from: string, offer: RTCSessionDescriptionInit}) => {
        try {

            const { from, offer } = data;
            const ans = await createAnswer(offer);
            console.log(ans);
            
            if (ans) {
                socket.emit('call-accepted', { from, ans });
                setRemoteUserId(from);

            } else {
                console.log("call accept error --------");
            }
        } catch (error) {
            console.log("error in incoming call --------", error);
        }
    }, [createAnswer, socket]);


    const handleCallAccepted = useCallback(async ({ ans }: {ans: RTCSessionDescriptionInit}) => {
        try {
            console.log("Call accepted with answer:", ans);
            if (peer.signalingState === "have-local-offer") {
                await setRemoteAns(ans);
            } else {
                console.error("Invalid signaling state for setting remote answer:", peer.signalingState);
            }
        } catch (error) {
            console.error("Error handling call accepted:", error);
        }
    }, [peer, setRemoteAns]);

    const getUserMediaStream = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true
            });
            setMyStream(stream);
            sendStream(stream);
        } catch (error) {
            console.log(error, "-==-------------------------");
        }
    }, [sendStream]);

    const handleNegotiation = useCallback(async () => {
        const offer = await createOffer();
        socket.emit("call-user", { userId: remoteUserId, offer });
    }, [createOffer, remoteUserId, socket]);

    useEffect(() => {        
        socket.on("user-joined", handleNewUserJoined);
        socket.on("incoming-call", handleIncomingCall);
        socket.on("call-accepted", handleCallAccepted);

        return () => {
            socket.off('user-joined', handleNewUserJoined);
            socket.off("incoming-call", handleIncomingCall);
            socket.off("call-accepted", handleCallAccepted);
        }
    }, [handleNewUserJoined, handleCallAccepted, handleIncomingCall, socket]);

    useEffect(() => {
        getUserMediaStream();
    }, [getUserMediaStream]);

    useEffect(() => {
        peer.addEventListener("negotiationneeded", handleNegotiation)
        return () => {
            peer.removeEventListener("negotiationneeded", handleNegotiation);
        }
    }, [handleNegotiation, peer]);

    return (
        <div className="max-h-[100vh] bg-[#000] overflow-hidden">
            <div className="header text-[#fff] w-full sticky top-0 bg-[#24292e] h-[10vh] pl-10 font-semibold text-xl drop-shadow-lg flex gap-3 items-center">
                <IoVideocam className="text-[30px]" />
                <p>Matrify</p>
            </div>

            {
                remoteUserId &&
                <div className="flex items-center pl-10 absolute z-10 h-[4rem] w-full text-[#aaaaaadc] font-bold bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10">
                    Connected to {remoteUserId}
                </div>
            }

            <div className="flex flex-col md:flex-row h-[80vh] w-[100vw] relative py-10">
                <div
                    className="bg-[#000] h-[100%] w-[100%] flex items-center"
                    style={{
                        backgroundImage: !remoteStream ? "url('/src/assets/images/profile copy.png')" : "none",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                    }}
                >
                    {!remoteStream ? (<p className="text-[#c3c2c2] font-bold mx-auto">Connecting...</p>)
                    : (
                        <ReactPlayer url={remoteStream} playing height='100%' width='100%' autoPlay={true} muted />
                    )}
                </div>

                <div className="caller-div flex flex-col items-center justify-center absolute bottom-3 right-4 rounded-[20px] overflow-hidden h-[150px] min-w-[200px]">
                    {
                        isVideoEnable && (
                            <ReactPlayer url={myStream || ""} playing height="100%" width="100%" autoPlay={true} muted />
                        )
                    }
                    <div className="current-user-label min-h-6 absolute w-full bottom-0 text- pr-4 text-white  bg-gradient-to-b from-[#00000055] to-[#000000] pl-5">
                        <p className="font-semibold text-[14px] text-end">You</p>
                    </div>
                </div>
            </div>

            <div className="relative min-h-[10vh] bg-[#24292E] flex items-center justify-center gap-6 text-white">
                <span className="absolute hidden md:flex md:left-10 top-8 font-bold items-center gap-3 text-[15px] md:text-[15px]">
                    <SiGoogleclassroom className="text-[25px]"/>
                    Room: {roomId.id}
                </span>
                <button 
                    className={`rounded-full font-semibold text-[20px] px-4 py-2 ${!isVideoEnable ? "bg-red-500": "bg-[#3C4043] "}`}
                    onClick={() => setIsVideoEnable(!isVideoEnable)}
                >
                    {
                        isVideoEnable ? (
                            <FaVideo className="text-[30px]" />
                        ) : (
                            <FaVideoSlash className="text-[30px]" />
                        )
                    }
                </button>

                <button
                    className="bg-red-500 rounded-3xl font-semibold text-[20px] px-4 py-2"
                    onClick={() => {
                        hangUp();
                        navigate("/chat")
                    }}
                >
                    <ImPhoneHangUp className="text-[30px]" />
                </button>

                <img src="../src/assets/images/logo.png" alt="" className="h-14 absolute right-0 md:right-10" />

            </div>
        </div>
    )
}