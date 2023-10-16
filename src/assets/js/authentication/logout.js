export default function logout(authCtx, navigateTo, auth){
    const ls = window.localStorage;
    auth.signOut().then(function() {
        console.log('Signed Out');
        authCtx.setIsLoggedIn(false);
        const userLC = {
         isLoggedIn: false,
         uid: ""
        }
        ls.setItem('auth', JSON.stringify(userLC));
        ls.setItem("currentUser", "");
        navigateTo("/signin")
    }, function(error) {
      console.error('Sign Out Error', error);
    });
} 