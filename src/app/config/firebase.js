import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDTyWcB_0iF3_pPLxR9XuLsrMUmCx144Ck",
	authDomain: "codeparty-c6656.firebaseapp.com",
	databaseURL: "https://codeparty-c6656.firebaseio.com",
	projectId: "codeparty-c6656",
	storageBucket: "",
	messagingSenderId: "194127365104",
	appId: "1:194127365104:web:6d4020a846af32a08ed335"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
