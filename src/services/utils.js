

export const asyncCall = async (callback,url,payload,config) => {

    try {
        if(payload) {
            const res = await callback(url,payload,config)
            return [res, null]
        } else {
            const res = await callback(url,config)
            return [res, null]
        }
    } catch (e) {
        return [null,e]
    }
}