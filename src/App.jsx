import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="dark"
          style={{ width: "auto", maxWidth: "420px", bottom: "100px" }}
        />
      </ChatProvider>
    </BrowserRouter>
  );
}

export default App;
