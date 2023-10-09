function getApiUrl(path: string) {
    let baseUrl = process.env.NEXT_PUBLIC_API_URL
    if (process.env.NODE_ENV == 'production') {
        baseUrl = 'https://' + process.env.NEXT_PUBLIC_VERCEL_URL + '/api/';
    }

    return new URL(path, baseUrl)
}


export default getApiUrl;
