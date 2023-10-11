import { FC, useEffect, useState } from 'react';

import useTodoContext from 'modules/todos/pinboard/context/useTodoContext';

import css from './ErrorAlert.module.scss';

const ErrorAlert: FC = () => {
    const { errors } = useTodoContext();
    const [errorBeingShown, setErrorBeingShown] = useState<string | null>(null);

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
            <p className={css["text"]}>{errorBeingShown}</p>
        </div>
    );
};

export default ErrorAlert;
