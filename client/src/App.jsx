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
      console.log("connected", socket.id);
    });

    socket.on("receive-message", (data) => {
      console.log("this is from server..." , data);
      setMessages((messages) => [...messages, data]);
    });

    // socket.on("welcome", (s) => {
    //   console.log(s);
    // });

    return () => {
      // socket.disconnect();
    };
  }, []);

  console.log(messages)

  
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message: message , room : room });
    // setMessage("");
  };

  const handleSetRoom = (e) => {
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


          <h4 className="">
            Room Id: <span>{socketID}</span>
          </h4>

          <hr />

          <div className="">
            <form onSubmit={handleSubmit}>
              <input onChange={(e)=>setMessage(e.target.value)} value={message} type="text" placeholder='add message here...' />
              <input onChange={(e)=>setRoom(e.target.value)} value={room} type="text" placeholder='set a room...' />

              <button type='submit'>submit</button>
            </form>
          </div>

          {/* <div className="">
          <form onSubmit={handleSetRoom}>
            <input onChange={(e)=>setRoom(e.target.value)} value={room} type="text" placeholder='set a room...' />

            <button type='submit'>setroom</button>
          </form>
          </div> */}

          <div className="">
            <div className="">
              messages:
            </div>

            <ul>
              {
                messages.map((m , i)=>{
                  return <li key={i}>{m.data}</li>
                })
              }
            </ul>
          </div>


        </div>
      </div>
    </>
  )
}

export default App
