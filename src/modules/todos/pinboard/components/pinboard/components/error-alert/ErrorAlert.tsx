import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import pinboardSelectors from 'modules/todos/pinboard/redux/selectors';

import css from './ErrorAlert.module.scss';

const ErrorAlert: FC = () => {
    const [errorBeingShown, setErrorBeingShown] = useState<string | null>(null);
    const errors = useSelector(pinboardSelectors.getErrors);

    useEffect(() => {
        if (errorBeingShown !== null || !errors.length) {
            return;
        }

        const errorToShow = errors.shift();
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
