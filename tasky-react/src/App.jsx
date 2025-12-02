import {BrowserRouter, Route, Routes, Navigate} from "react-router";
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signupPage";
import TasksPage from "./pages/tasksPage";
import StartPage from "./pages/startPage";
import ProfilePage from "./pages/profilePage";
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus:false
    },
  },
});

// 项目的根组件
// 流程
// App   -->    main.jsx     -->     public/index.html(div id = "root") 
//     被引入到             渲染到
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <div className="container">
        <h1>Tasky</h1>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to='/' /> } />
        </Routes>
      </div>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
 
};

export default App;