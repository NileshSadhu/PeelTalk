import { User } from "../../models/user.model"
import { generateUsername } from "./generateUsername"

export const getUniqueGuestUsername = async (): Promise<string> => {
    const MAX_ATTEMPTS = 5

    for (let i = 0; i < MAX_ATTEMPTS; i++) {
        const username = generateUsername()

        const exists = await User.exists({ username })
        if (!exists) {
        return username
        }
    }

    throw new Error("Failed to generate unique username")
}
