import SignUpInfo from './../SignUP/SignUpInfo';
import PersonalInfo from './../PersonalInfo/PersonallInfo';
import styles from './mainPage.module.css'

function MainPage({currentPage, changePage}) {

  return (
    <div className={styles.mainPage}>
      <span>SignUpInfo {currentPage === 2 && "/ PersonalInfo"}</span>
      { currentPage === 1 && <SignUpInfo changePage={changePage} />}
      { currentPage === 2 && <PersonalInfo changePage={changePage} />}
    </div>
  );
}

export default MainPage;