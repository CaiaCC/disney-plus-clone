import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { auth, provider } from '../../firebase';
import {
    selectUserName,
    selectUserPhoto,
    setUserLoginDetails,
} from "../../features/user/userSlice";

import { Login, Logo, Nav, NavMenu, UserImg } from './StyledHeaderElement';

const Header = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    const handleAuth = () => {
        auth
            .signInWithPopup(provider)
            .then(result => {
                setUser(result.user);
            })
            .catch(error => {
                alert(error.message);
            })
    };

    const setUser = (user) => {
        dispatch(
            setUserLoginDetails({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
            })
        )
    }

    return (
        <Nav>
            <Logo>
                <img src="/images/logo.svg" alt="Disney+" />
            </Logo>
            {!userName ? (
                <Login onClick={handleAuth}>Login</Login>
            ) : (
                <>
                    <NavMenu>
                        <a href="/home">
                            <img src="/images/home-icon.svg" alt="HOME" />
                            <span>HOME</span>
                        </a>
                        <a>
                            <img src="/images/search-icon.svg" alt="SEARCH" />
                            <span>SEARCH</span>
                        </a>
                        <a>
                            <img
                                src="/images/watchlist-icon.svg"
                                alt="WATCHLIST"
                            />
                            <span>WATCHLIST</span>
                        </a>
                        <a>
                            <img
                                src="/images/original-icon.svg"
                                alt="ORIGINAL"
                            />
                            <span>ORIGINAL</span>
                        </a>
                        <a>
                            <img src="/images/movie-icon.svg" alt="MOVIE" />
                            <span>MOVIE</span>
                        </a>
                    </NavMenu>
                    <UserImg src={userPhoto} alt={userName} />
                </>
            )}
        </Nav>
    );
}

export default Header
