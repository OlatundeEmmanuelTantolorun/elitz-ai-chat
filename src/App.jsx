import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Chat from "./pages/Chat";
import { ChatProvider } from "./context/ChatContext";

function App() {
  return (
    <BrowserRouter>
      <ChatProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat/:chatId" element={<Chat />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <ToastContainer
          position="bottom-center"
          autoClose={4000}
          closeOnClick
          pauseOnHover
          draggable
          newestOnTop
          pauseOnFocusLoss={false}
          hideProgressBar={false}
          transition={Slide}
          limit={3}
          theme="dark"
          toastStyle={{
            background: "#161616",
            color: "#fff",
            border: "1px solid rgba(255,153,0,.2)",
            borderRadius: "16px",
            boxShadow: "0 10px 35px rgba(0,0,0,.45)",
          }}
          progressStyle={{
            background: "#FF9900",
          }}
          style={{
            width: "auto",
            maxWidth: "420px",
            bottom: "95px",
          }}
        />
      </ChatProvider>
    </BrowserRouter>
  );
}

export default App;
