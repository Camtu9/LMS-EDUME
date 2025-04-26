import {clerkClient} from '@clerk/express'

export const protectEducator = async (req, resizeBy, next) => {
    try {
        const userId = req.auth.userId
        const response = await clerkClient.users.getUser(userId)
        if(response.publicMetadata.role !== 'educator'){
            return res.json({
                success: false, 
                message: 'Unauhthorized'
            })
        }
        next()
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}