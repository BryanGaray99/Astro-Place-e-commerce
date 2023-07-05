import React, { useState } from 'react'

const AuthLocalStorage = () => {
    const [account, setAccount] = useState({});
    const [signOut, setSignOut] = useState(false);

    const accountInLocalStorage = localStorage.getItem('account');
    const signOutInLocalStorage = localStorage.getItem('sign-out');
    let parsedAccount;
    let parsedSignOut;

    if (!accountInLocalStorage) {
        localStorage.setItem('account', JSON.stringify({}));
        parsedAccount = {}
    } else {
        parsedAccount = JSON.parse(accountInLocalStorage);
    }

    if (!signOutInLocalStorage) {
        localStorage.setItem('sign-out', JSON.stringify(false));
        parsedSignOut = false;
    } else {
        parsedSignOut = JSON.parse(signOutInLocalStorage);
    }

    return {
        account,
        setAccount, 
        signOut,
        setSignOut
    };
}

export default AuthLocalStorage;