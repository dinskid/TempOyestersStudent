
export const refreshTokenSetup= (res) => {
    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

    const refreshToken = async () => {
        const newAuthres = await res.reloadAuthResponse();
        refreshTiming = ( newAuthres.expires_in || 3600 - 5 * 60 ) * 1000;
        
        console.log(newAuthres.id_token);
        setTimeout(refreshToken,refreshTiming);
    }
    setTimeout(refreshToken,refreshTiming);
}