import React, { ReactNode, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

interface LayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false); 
  
  const toggleSidebar = () => {
    setIsSidebarHidden(prevState => !prevState);
  };

  return (
    <div className="flex">
      <Sidebar isSidebarHidden={isSidebarHidden} />
      <section id="content">
        <Header toggleSidebar={toggleSidebar} />
        <main>
          {children}
        </main>
      </section>
    </div>
  );
};

export default MainLayout;
