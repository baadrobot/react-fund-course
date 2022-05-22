import React, {forwardRef} from 'react';
import classes from './MyInput.module.css';

const MyInput = forwardRef((props, ref) => {
    return (
        // разворачиваем в инпут через 3 точки всё что попадает в пропсы
        <input ref={ref} className={classes.myInput} {...props}/>
    );
});

export default MyInput;