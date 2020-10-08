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
                        if (item.slice_type === 'image') {
                            return <img src={item.primary.perfil.url} alt="Imagem de Perfil"></img>
                        }
                        else if (item.slice_type === 'secao') {
                            return <h2>{item.primary.nome}</h2>
                        } else if (item.slice_type === 'link') {
                            return (<li><a href={item.primary.destino.url}>{item.primary.texto_do_botao}</a></li>)
                        }
                        else { return null }
                    })
                }
            </ul>
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
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