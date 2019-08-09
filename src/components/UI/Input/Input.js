import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    let inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValid && props.touched) {
        inputClasses.push(classes.Invalid);
    }
    switch (props.elementType) {
        case ('input'):
            inputElement =
                <input
                    onChange={props.changed}
                    value={props.value}
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    placeholder={props.elementConfig.placeholder} />;
            break;
        case ('textarea'):
            inputElement =
                <textarea
                    value={props.value}
                    onChange={props.changed}
                    className={inputClasses}
                    {...props.elementConfig}
                    placeholder={props.elementConfig.placeholder} />;
            break;
        case ('select'):
            inputElement =
                <select
                    className={inputClasses}>
                    {props.elementConfig.options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.displayValue}</option>
                    ))
                    }
                </select>
            break;
        default:
            inputElement = <input className={inputClasses} {...props.elementConfig} placeholder={props.value} />

    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}

        </div>
    )
};


export default input;