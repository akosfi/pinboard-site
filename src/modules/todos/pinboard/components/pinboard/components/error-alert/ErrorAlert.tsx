import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import pinboardSelectors from 'modules/todos/pinboard/redux/selectors';
import { AppDispatch } from 'redux/store';
import { pinboardSliceActions } from 'modules/todos/pinboard/redux/pinboardSlice';
import css from './ErrorAlert.module.scss';

const ErrorAlert: FC = () => {
    const [errorBeingShown, setErrorBeingShown] = useState<string | null>(null);
    const errors = useSelector(pinboardSelectors.getErrors);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (errorBeingShown !== null || !errors.length) {
            return;
        }

        console.log(errors);


        const errorToShow = errors[0];
        dispatch(pinboardSliceActions.setErrors({ errors: errors.slice(1) }))
        if (!errorToShow) {
            return;
        }

        setErrorBeingShown(errorToShow);

        setTimeout(() => {
            setErrorBeingShown(null);
        }, 3000);
    }, [errors, errorBeingShown]);

    if (!errorBeingShown) {
        return null;
    }

    return (
        <div className={css['alert']}>
            <p className={css['text']}>{errorBeingShown}</p>
        </div>
    );
};

export default ErrorAlert;
