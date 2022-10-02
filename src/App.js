import logo from './logo.svg';
import {useState} from 'react'
import styles from './App.module.css';
import MainPage from './components/mainPage/MainPage';
import {FIRST_PAGE} from './constants'


function App() {
  let [currentPage, setCurrentPage] = useState(FIRST_PAGE)

  function changePage(id) {
    setCurrentPage(id)
  }

  return (
    <div className={styles.App}>
      <header className={styles.App_header}>
        <img className={styles.App_logo} src={logo}/>
      </header>
      <MainPage currentPage={currentPage} changePage={changePage}/>
      <footer className={styles.footer}></footer>
    </div>
  );
}

export default App;
