// App.tsx

import './App.css';
import LeftSidebar from './components/LeftSideBar';
import RightSidebar from './components/RightSideBar';
import Routes from './routes';

import { Layout } from 'antd';

const { Content } = Layout;

function App() {
  return (
    <div className="App">
      <Routes />
      <Layout style={{ minHeight: '100vh' }}>
        <LeftSidebar />
        <Content>
          {/* Burada içerik yer alacak */}
        </Content>
        <RightSidebar />
      </Layout>
    </div>
  );
}

export default App;
