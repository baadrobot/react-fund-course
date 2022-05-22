import React from 'react';
import classes from './MyButton.module.css';

// простой вариант передачи пропсов
// const MyButton = (props) => {
// улучшенный вариант
// нам нужно будет передавать и другие пропсы и слушатели событий,поэтому лучше сразу сделать реструктуризацию
const MyButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.myBtn}>
        {/*    пример от простого вариант передачи пропсов */}
        {/*    {props.children}*/}
            {children}
        </button>
    );
};

export default MyButton;