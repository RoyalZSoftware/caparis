import Button from "../../../ui-components/src/button";

export function AppWriteGoogleSignIn({authProvider}: {authProvider: AppWriteGoogleLogin}) {
    return <Button onPress={() => {
        window.open(authProvider.createSignInUrl());
    }} title={'Sign in'}></Button>
}
