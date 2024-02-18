import { useEffect, useMemo, useState } from 'react'
import { io } from "socket.io-client"


function App() {

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketID, setSocketId] = useState("");
  const [roomName, setRoomName] = useState("");

  const socket = useMemo(() => 
        io("http://localhost:3000", {
          withCredentials: true,
        })
    , []
    )


  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      // console.log(socket)
      console.log("connected", socket.id);
    });

    socket.on("receive-message", (data) => {
      console.log(data);
      setMessages((messages) => [...messages, data]);
    });

    socket.on("welcome", (s) => {
      console.log(s);
    });

    return () => {
      // socket.disconnect();
    };
  }, []);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message });
    // setMessage("");
  };

  const joinRoomHandler = (e) => {
    e.preventDefault();
    socket.emit("join-room", roomName);
    setRoomName("");
  };

  // console.log(message)

  return (
    <>
      <div className="">
        <div className="">
          <h1 className="">
            hello this is a socket tutorial...
          </h1>

          <hr />

          <form onSubmit={handleSubmit}>
            <input onChange={(e)=>setMessage(e.target.value)} value={message} type="text" placeholder='add message here...' />

            <button type='submit'>submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
