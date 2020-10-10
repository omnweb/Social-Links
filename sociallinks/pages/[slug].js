import React, { useEffect } from 'react' // Usando para fazer hook
import Prismic from 'prismic-javascript'
import { useRouter } from 'next/router' // Importando user router do next
import Head from 'next/head'


const redirectTo = () => {
    const router = useRouter()
    useEffect(() => {
        setTimeout(() => {
            router.push("/") // Redirecionando para o raiz usando userRouter do next
        }, 3000)
    }, [])
    return (
        <div className="w-1/2 mx-auto text-center p-12">
            <Head>
                <title>Página não encontrada</title>
            </Head>
            <div class="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md" role="alert">
                <div class="flex">
                    <div class="py-1"><svg class="fill-current h-6 w-6 red-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg></div>
                    <div>
                        <h1 class="font-bold">ERRO 404 - Página não foi encontrada.</h1>
                        <p class="text-sm">Em segundos você será redirecionado ao início...</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps({ params, res }) {
    const client = Prismic.client('https://omnweb.cdn.prismic.io/api/v2')
    const link = await client.getByUID('shortlink', params.slug)
    if (link) {
        res.statusCode = 301 // Conteúdo removido permanentemente
        res.setHeader('Location', link.data.destino.url) // Redireciona
        res.end()
        return
    }
    return {
        props: {},
    }
}

export default redirectTo; 