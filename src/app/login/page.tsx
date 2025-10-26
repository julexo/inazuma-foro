'use client'
import {Auth} from '@supabase/auth-ui-react'
import {ThemeSupa} from '@supabase/auth-ui-shared'
import {supabase} from '@/lib/supabaseClient'
import {useRouter} from 'next/navigation'
import { useEffect } from 'react'

export default function LoginPage(){
    const router = useRouter()

    useEffect(() => {
        const {data : {subscription} } = supabase.auth.onAuthStateChange((event)=>{
            if(event === 'SIGNED_IN'){
                router.push('/')
                router.refresh()
            }
        })
    return subscription.unsubscribe()
    },[router])

    return(
        <div style = {{maxWidth : '460px', margin : '96px auto'}}>
            <Auth 
                supabaseClient={supabase}
                appearance={{theme : ThemeSupa}}
                providers={['github', 'google']}
                redirectTo='http://localhost:3000'
            />

            <style>{`
                .c-bOcPnF-cmFMMs-color-primary {
                    background-color: white !important;
                    border-color: orange;
                    color: black;
                }
            `}</style>
        </div>
        
    )
}