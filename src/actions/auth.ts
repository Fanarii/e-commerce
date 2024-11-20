import db from "@/app/api/db";

export const getUserByEmail = async (email: string) => {
    const response = await db.user.findUnique({
        where: {email: email}
    })

    return response
}