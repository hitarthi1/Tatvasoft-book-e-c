import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import Shared from "../utils/shared";
import { RoutePaths } from "../utils/enum";
//import UserModel from "../models/UserModel";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { userrr} from "../utils/enum";

// export interface AuthContextModel {
// 	setUser: (user) => void;
// 	user: UserModel;
// 	signOut: () => void;
// 	appInitialize: boolean;
// }

const initialState = {
	setUsser: (user) => {},
	
	useer : {userrr
	},

	signOut: () => {},
	appInitialize: false,
};

export const AuthContext = createContext(initialState);

export const AuthWrapper = ({children}) => {
	const [appInitialize, setAppInitialize] = useState(false);
	const [useer, setUseer] = useState();
	const [hp, setHp] = useState();

	const history = useHistory();
	const { pathname } = useLocation();

	const setUsser = (userr) => {
		localStorage.setItem(Shared.LocalStorageKeys.USER, JSON.stringify(userr));
		//_setUser(JSON.stringify(userr));
		
		// const itemStrr =
		// 	(JSON.parse(
		// 		localStorage.getItem(Shared.LocalStorageKeys.USER) 
		// 	) ) ;


		setUseer(JSON.stringify(userr));
		

	// setUseer((JSON.stringify(
	// 	localStorage.getItem(Shared.LocalStorageKeys.USER) 
	// ) ))
	

		// console.log(JSON.stringify(userr)+"setusercalled")
		// console.log(userr+"setusercalled")

		//console.log(JSON.parse(user)+"set user called")
		console.log(useer+"set user called realonetest")

		// console.log(JSON.stringify(
		// 	localStorage.getItem(Shared.LocalStorageKeys.USER) 
		// )+"getusercalled")
		// console.log((JSON.parse(
		// 	localStorage.getItem(Shared.LocalStorageKeys.USER) 
		// )).id+"getusercalled")
		// console.log({authContext.useer})
		// 	localStorage.getItem(Shared.LocalStorageKeys.USER) 
		// +"getusercalled")
		console.log(JSON.stringify(useer)+"set user called")
		console.log(useer+"set user called realonetest")

	};


	useEffect(() => {
		
		if(localStorage.getItem(Shared.LocalStorageKeys.USER)  && typeof (localStorage.getItem(Shared.LocalStorageKeys.USER)) !== 'undefined' ){
			const itemStr =
			(JSON.parse(
				localStorage.getItem(Shared.LocalStorageKeys.USER) 
			) ) ;

			if(!itemStr){	
				//	if (!itemStr.id) {
						history.push(`${RoutePaths.Login}`);
					}
					if(itemStr){setUseer(itemStr);}
		}
		
			//console.log(user.id+"set user called")

		// if the item doesn't exist, return null
	
		

		console.log(useer,"user")
	}, []);


	const signOut = () => {
		//console.log("before signout called",useer)
		
		setUsser();
		//console.log("before signout called",useer)
		localStorage.removeItem('user');
		//localStorage.removeItem(Shared.LocalStorageKeys.USER);
		
		history.push(`..${RoutePaths.Login}`);
	};

	useEffect(() => {
		if (pathname === RoutePaths.Login && useer) {
			history.push(RoutePaths.BookListing);
		}

		if (!useer) {
			return;
		}
		const access= Shared.hasAccess(pathname, useer);
		if (!access) {
			toast.warning("Sorry, you are not authorized to access this page");
			history.push(RoutePaths.BookListing);
			return;
		}
		setAppInitialize(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname, useer]);

	let value= {
		useer,
		setUsser,
		signOut,
		appInitialize,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
	return useContext(AuthContext);
};
