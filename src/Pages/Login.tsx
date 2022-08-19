import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRef } from "react";
import {
    auth,
    logInWithEmailAndPassword,
    db
} from "../Config/Firebase";
import {
    GoogleAuthProvider,
    signInWithPopup,
    FacebookAuthProvider,
    GithubAuthProvider,
} from "firebase/auth";
import {
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    const vantaRef = useRef<HTMLDivElement>();
    const [vantaEffect, setVantaEffect] = useState<any>(0);
    const [Loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate("/home");
        else if (!user) navigate("/");
    }, [user, loading, navigate]);

    function toggle() {
        var x: any = document.getElementById("password-field");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    const githubProvider = new GithubAuthProvider();
    const githubLogin = async () => {
        setLoading(true)
        signInWithPopup(auth, githubProvider)
            .then((result) => {
                GithubAuthProvider.credentialFromResult(result);
            }).catch((error) => {
            GithubAuthProvider.credentialFromError(error);
        }).finally(() => {
                setLoading(false)
            }
        );
    }

    const facebookProvider = new FacebookAuthProvider();
    const facebookLogin = async () => {
        setLoading(true)
        signInWithPopup(auth, facebookProvider)
            .then((result) => {
                FacebookAuthProvider.credentialFromResult(result);
            })
            .catch((error) => {
                FacebookAuthProvider.credentialFromError(error);
            }).finally(() => {
                setLoading(false)
            }
        );
    }

    const googleProvider = new GoogleAuthProvider();
    const signInWithGoogle = async () => {
        setLoading(true)
        try {
            const res = await signInWithPopup(auth, googleProvider);
            const user = res.user;
            const q = query(collection(db, "users"), where("uid", "==", user.uid));
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
                await addDoc(collection(db, "users"), {
                    uid: user.uid,
                    name: user.displayName,
                    authProvider: "google",
                    email: user.email,
                });
            }
        } catch (err: any) {
            console.error(err);
            alert(err.message);
        }
        finally {
            setLoading(false)
        }
    };
    // @ts-ignore
    return (
        <div className="allLogin">
            <div className="login">
                <div className="login-wrap p-0">
                    <h3 className="mb-4 text-center"> Have an account? </h3>
                    <form action="#" className="signin-form">
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                        </div>
                        <div className="form-group">
                            <input id="password-field"
                                   value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Password"
                                   required />
                            <span onClick={toggle}
                                  className="fa fa-fw fa-eye field-icon toggle-password"></span>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="form-control btn btn-primary submit px-3" onClick={() => logInWithEmailAndPassword(email, password)}>Sign in</button>
                        </div>
                        <div className="form-group d-md-flex">
                            <div className="w-50">
                                <label className="checkbox-wrap checkbox-primary">Remember Me
                                    <input type="checkbox" checked />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                        </div>
                    </form>
                    <p className="w-100 text-center">&mdash; Or Sign In With &mdash;</p>
                    {Loading ? <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> :
                        <div className="social d-flex text-center">
                            <a href="#" className="px-2 py-2 mr-md-1 rounded" onClick={signInWithGoogle}><span
                                className="ion-logo-google mr-2">
                                <i className="fa fa-google"></i>
                            </span> Google</a>
                            <a href="#" className="px-2 py-2 mr-md-1 rounded" onClick={facebookLogin}><span
                                className="ion-logo-facebook mr-2">
                                <i className="fa fa-facebook"></i>
                            </span> Facebook</a>
                            <a href="#" className="px-2 py-2 mr-md-1 rounded" onClick={githubLogin}><span
                                className="ion-logo-facebook mr-2">
                                <i className="fa fa-github"></i>
                            </span> Github</a>
                        </div>
                    }
                </div>
                <div className="footer">
                    <div className="w-50">
                        <label className="checkbox-wrap checkbox-primary">This is not a template, it's a work of art
                        </label>
                    </div>
                </div>
            </div>
            <div className="rightLogin">
            <span className="react-logo">
			<span className="nucleo"></span>
		    </span>
            </div>
        </div>
    );
}

export default Login;

