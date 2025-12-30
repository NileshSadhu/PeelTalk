'use client'

import Link from 'next/link'

interface NavigateLinksProps {
    type: 'SignIn' | 'SignUp'
}

export const NavigateLinks = ({ type }: NavigateLinksProps) => {
    const isLogin = type === 'SignIn'

    return (
        <div className="text-center mt-1.5">
        <Link
            href={isLogin ? '/signin' : '/signup'}
            className="balsamiq-sans-bold font-medium text-[12px] text-amber-900"
        >
            {isLogin
            ? 'Already have an account? Sign in'
            : "Don't have an account? Sign up"}
        </Link>
        </div>
    )
}
