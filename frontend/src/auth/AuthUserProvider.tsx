// import { User } from "firebase/auth";
// import {
//   createContext,
//   useContext,
//   ReactNode,
//   useState,
//   useEffect,
//   FC
// } from "react";
// import { auth } from "../utils/firebase";

// // other imports
// import { WrappedComponentProps } from 'react-with-firebase-auth';
// import { createComponentWithAuth } from '../utils/firebase';

// type AuthData = {
//   user?: User | null;
// };

// const AuthUserContext = createContext<AuthData>({user:null});
// //const AuthUserContext=createContext,AuthData>({user:null});

// /*

// const AuthUserProvider: FC<WrappedComponentProps> = ({ children, ...auth }) => (
//   <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
// );

// export default createComponentWithAuth(AuthUserProvider);

// export const useAuth = () => {
//   const context = useContext(AuthUserContext);
//   if (!context) throw new Error('AuthUserContext has no value');
//   return context;
// };
// */

// export default function AuthUserProvider({
//   children,
// }:{
//   readonly children: ReactNode;
// }){
//   const [user, setUser]=useState<AuthData>({user:null});
//   useEffect(()=>{
//     auth.onAuthStateChanged(async (userAuth)=>{
//       console.log("Current user: ", userAuth);
//       if (userAuth){
//         setUser({user: userAuth});
//       }else{
//         setUser({user:null});

//       }
//     });
//   }, []);
//   return (
//     <AuthUserContext.Provider value={user}>{children}</AuthUserContext.Provider>
//   )
// };

// export const useAuth=()=>{
//   const context=useContext(AuthUserContext);
//   return context;
// };



import { User } from "firebase/auth";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { auth } from "../utils/firebase";

type AuthData = {
  user?: User | null;
};

const AuthUserContext = createContext<AuthData>({ user: null });

export default function AuthUserProvider({ children }: { readonly children: ReactNode }) {
  const [user, setUser] = useState<AuthData>({ user: null });
  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        setUser({ user: userAuth });
      } else {
        setUser({ user: null });
      }
    });
  }, []);
  return (
    <AuthUserContext.Provider value={user}>{children}</AuthUserContext.Provider>
  );
}

export const useAuth = () => {
  console.log("Inside useAuth");
  if (!AuthUserContext) console.log("AuthUserContext is null")
  else console.log("AuthUserContext is not null");
  const context = useContext(AuthUserContext);
  console.log(context);
  return context;
};