export default function logout(authCtx, navigateTo, auth){
    const lc = window.localStorage;
    auth.signOut().then(function() {
        console.log('Signed Out');
        authCtx.setIsLoggedIn(false);
        const userLC = {
         isLoggedIn: false,
         uid: ""
        }
        lc.setItem('auth', JSON.stringify(userLC));
        navigateTo("/signin")
    }, function(error) {
      console.error('Sign Out Error', error);
    });
} 