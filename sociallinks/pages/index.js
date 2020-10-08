import React from 'react'
import Prismic from 'prismic-javascript'

// Criando componente index

const Index = ({ data }) => {
    console.log('Client')
    return (
        <div style={{ backgroundColor: data.background, color: data.text }}>
            <h1>Social Links (central de links)</h1>
            <ul>
                {/* Função que transforma um vetor em uma lista de elementos renderizáveis na tela  */}
                {
                    data.body.map(item => {
                        return (<li><a href={item.primary.destino.url}>{item.primary.texto_do_botao}</a></li>)
                    })
                }
            </ul>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )

}

// Pegando os links que estão dentro da central de links
export async function getServerSideProps() {
    // Função faz com que a página sempre seja renderizada no servidor
    console.log('server')
    //Criando um novo cliente para o prismic
    const client = Prismic.client('https://omnweb.cdn.prismic.io/api/v2')
    const centralLinks = await client.getSingle('centrallinks')
    console.log(centralLinks)
    return {
        props: {
            data: centralLinks.data, //
        },

    }
}

export default Index;