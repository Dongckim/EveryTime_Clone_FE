import logo from './logo.svg';
import './App.css';
import Router from './shared/Router';
import { QueryClient, QueryClientProvider } from 'react-query';
import BackgroundLayout from './core/BackgroundLayout';
const queryClient = new QueryClient();

function App() {
  return (
    <div className='body'>
      <QueryClientProvider client={queryClient}>
        <BackgroundLayout>
          <Router/>
        </BackgroundLayout>
      </QueryClientProvider>
    </div>
    
  );
}

export default App;
