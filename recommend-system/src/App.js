import React, { useContext } from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import Right from './components/Right/Right';
import { AppContext } from './context/AppContext';
import './App.css';

const App = () => {
    const { sizes, handleMouseDown, handleMouseUp, handleMouseMove, containerRef } = useContext(AppContext);

    return (
        <div
            className="App"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <div className="left-pane" style={{ width: sizes.leftWidth }}>
                <div className="header" style={{ height: sizes.headerHeight }}>
                    <Header />
                </div>
                <div className="resizer horizontal" onMouseDown={() => handleMouseDown('header')} />
                <div className="main" style={{ height: sizes.mainHeight }}>
                    <Main />
                </div>
                <div className="resizer horizontal" onMouseDown={() => handleMouseDown('footer')} />
                <div className="footer" style={{ height: sizes.footerHeight }}>
                    <Footer />
                </div>
            </div>
            <div className="resizer vertical" onMouseDown={() => handleMouseDown('leftPane')} />
            <div className="right-pane" style={{ width: sizes.rightWidth }}>
                <Right />
            </div>
        </div>
    );
};

export default App;
