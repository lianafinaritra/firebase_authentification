import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from './Config/Firebase';

type componentWithChild = {
    children?: React.ReactNode;
}

export default function ProtectedRoute(props: componentWithChild) {

    const {children} = props;

    if (!auth.currentUser) {
        return <Navigate to="/" />
    }
    return (
        <div>
            {children}
        </div>
    );
}
