/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        SERVER: process.env.SERVER,
        LOGIN: process.env.LOGIN,
        REGISTER: process.env.REGISTER,
        GETUSERPOSTS: process.env.GETUSERPOSTS,
        GETUSERDATA: process.env.GETUSERDATA,
        CREATEPOST: process.env.CREATEPOST,
        LIKEPOST: process.env.LIKEPOST,
    }
}

module.exports = nextConfig
