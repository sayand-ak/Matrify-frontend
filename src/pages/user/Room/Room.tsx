import { useCallback, useEffect, useMemo, useState } from "react";
import ReactPlayer from "react-player";
import { IoVideocam } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { ImPhoneHangUp } from "react-icons/im";
import { SiGoogleclassroom } from "react-icons/si";
import { FaVideoSlash, FaVideo } from "react-icons/fa";
import { useAppDispatch } from "../../../hooks/useTypedSelectors";
import { changeCallStatus, getCallStatus } from "../../../services/videoCallApi";
import showToast from "../../../components/Toast/Toast";
import { ToastContainer } from "react-toastify";
import { userProfile } from "../../../services/userAPI";
import { socket } from "../../../services/socket"; // Import the socket instance
import "./Room.css";

function Room() {
    const navigate = useNavigate();
    const roomId = useParams();
    const dispatch = useAppDispatch();

    const [myStream, setMyStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [remoteUserId, setRemoteUserId] = useState<string>();
    const [isVideoEnable, setIsVideoEnable] = useState(true);
    const [remoteUsername, setRemoteUsername] = useState<string>("");

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
        if (stream) {
            stream.getTracks().forEach((track) => {
                peer.addTrack(track, stream);
            });
        } else {
            console.error("No stream to send.");
        }
    };

    const handleNewUserJoined = useCallback(async ({ callerId }: { callerId: string }) => {
        try {
            const offer = await createOffer();
            socket.emit('call-user', { callerId, offer });
            setRemoteUserId(callerId);
        } catch (error) {
            console.error("Error handling new user joined:", error);
        }
    }, [createOffer]);

    const handleIncomingCall = useCallback(async (data: { from: string, offer: RTCSessionDescriptionInit }) => {
        try {
            const { from, offer } = data;
            const ans = await createAnswer(offer);
            if (ans) {
                socket.emit('call-accepted', { from, ans });
                setRemoteUserId(from);
            } else {
                console.log("call accept error --------");
            }
        } catch (error) {
            console.log("error in incoming call --------", error);
        }
    }, [createAnswer]);

    const handleCallAccepted = useCallback(async ({ ans }: { ans: RTCSessionDescriptionInit }) => {
        try {
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
            console.log(error, "--------------------------");
        }
    }, [sendStream]);

    const handleNegotiation = useCallback(async () => {
        const offer = await createOffer();
        socket.emit("call-user", { callerId: remoteUserId, offer });
    }, [createOffer, remoteUserId]);

    useEffect(() => {
        socket.on("user-joined", handleNewUserJoined);
        socket.on("incoming-call", handleIncomingCall);
        socket.on("call-accepted", handleCallAccepted);

        return () => {
            socket.off('user-joined', handleNewUserJoined);
            socket.off("incoming-call", handleIncomingCall);
            socket.off("call-accepted", handleCallAccepted);
        };
    }, [handleNewUserJoined, handleCallAccepted, handleIncomingCall]);

    useEffect(() => {
        getUserMediaStream();
    }, [getUserMediaStream]);

    useEffect(() => {
        peer.addEventListener("negotiationneeded", handleNegotiation);
        return () => {
            peer.removeEventListener("negotiationneeded", handleNegotiation);
        };
    }, [handleNegotiation, peer]);

    const hangUp = async (roomId: string) => {
        const response = await dispatch(changeCallStatus({ roomId: roomId, status: "ended" }));
        if (response.payload.success) {
            peer.close();
            setRemoteStream(null);
        } else {
            alert("something went wrong");
        }
    };

    const handleRejectCall = useCallback(async () => {
        const response = await dispatch(getCallStatus(roomId.id || ""));
        if (response.payload.data.status === "rejected") {
            showToast("info", "Call rejected", () => {
                navigate("/chat");
            });
        } else if (response.payload.data.status === "ended") {
            showToast("info", "Call ended", () => {
                navigate("/chat");
            });
        }
    }, [dispatch, navigate, roomId.id]);

    const fetchUserData = useCallback(async () => {
        const response = await dispatch(userProfile(remoteUserId || ""));
        if (response.payload.data) {
            setRemoteUsername(response.payload.data[0].username);
        }
    }, [remoteUserId, dispatch]);

    useEffect(() => {
        fetchUserData();
        handleRejectCall();
    }, [handleRejectCall, fetchUserData]);

    return (
        <div className="max-h-[100vh] bg-[#000] overflow-hidden">
            <div className="text-[#fff] w-[100vw] top-0 bg-[#24292e] h-[10vh] pl-10 font-semibold text-xl drop-shadow-lg flex gap-3 items-center">
                <IoVideocam className="text-[30px]" />
                <p>Matrify</p>
            </div>

            {remoteUserId && (
                <div className="flex items-center pl-10 absolute z-10 h-[4rem] w-full text-[#aaaaaadc] font-bold bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10">
                    Connected to {remoteUsername}
                </div>
            )}

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
                    {!remoteStream ? (
                        <p className="text-[#c3c2c2] font-bold mx-auto">Connecting...</p>
                    ) : (
                        <ReactPlayer url={remoteStream} playing height="100%" width="100%" autoPlay={true} muted />
                    )}
                </div>

                <div className="caller-div flex flex-col items-center justify-center absolute bottom-3 right-4 rounded-[20px] overflow-hidden h-[150px] min-w-[200px]">
                    {isVideoEnable && (
                        <ReactPlayer url={myStream || ""} playing height="100%" width="100%" autoPlay={true} muted />
                    )}
                    <div className="current-user-label min-h-6 absolute w-full bottom-0 text- pr-4 text-white bg-gradient-to-b from-[#00000055] to-[#000000] pl-5">
                        <p className="font-semibold text-[14px] text-end">You</p>
                    </div>
                </div>
            </div>

            <div className="buttons-container flex justify-center h-[10vh] w-[100vw] items-center gap-4">

                <span className="absolute hidden md:flex md:left-10 text-white font-bold items-center gap-3 text-[15px] md:text-[15px]">
                    <SiGoogleclassroom className="text-[25px]" />
                    Room: {roomId.id}
                </span>

                <button
                    onClick={() => hangUp(roomId.id || "")}
                    className="bg-[#FF4D5A] rounded-full p-2 text-white h-[50px] w-[50px] flex justify-center items-center"
                >
                    <ImPhoneHangUp size={20} />
                </button>

                <button
                    onClick={() => {
                        setIsVideoEnable(!isVideoEnable);
                        if (myStream) {
                            myStream.getVideoTracks()[0].enabled = !isVideoEnable;
                        }
                    }}
                    className="bg-[#e9e9e8af] rounded-full p-2 text-white h-[50px] w-[50px] flex justify-center items-center"
                >
                    {isVideoEnable ? <FaVideo size={20} /> : <FaVideoSlash size={20} />}
                </button>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Room;
