import React, { useEffect } from 'react' // Usando para fazer hook
import Prismic from 'prismic-javascript'
import { useRouter } from 'next/router' // Importando user router do next


const redirectTo = () => {
    const router = useRouter()
    useEffect(() => {
        console.log('Carregou...')
        setTimeout(() => {
            console.log('Redireciona...')
            router.push("/") // Redirecionando para o raiz usando userRouter do next
        }, 3000)
    }, [])
    return (
        <div className="redirect">
            <h1>Página não foi encontrada</h1>
            <p>Rentonando para a página de link em segudos...</p>
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