import React from 'react'
import Prismic from 'prismic-javascript'
import Head from 'next/head' // Importando para alterar o título da página

// Criando componente index
const Index = ({ data }) => {
    console.log('Client')
    return (
        <div className="content" >
            <Head><title>{data.pagetitle}</title></Head>
            <div className="max-w-sm rounded overflow-hidden shadow-lg text-center" style={{ backgroundColor: data.background, color: data.text }}>
                <div className="px-6 py-4">
                    {/* Função que transforma um vetor em uma lista de elementos renderizáveis na tela  */}
                    {
                        data.body.map(item => {
                            if (item.slice_type === 'image') {
                                return <img src={item.primary.perfil.url} alt={item.primary.perfil.alt} className="mx-auto mt-10 rounded-full" />
                            }
                            else if (item.slice_type === 'secao') {
                                return <h2 className="font-bold mt-4 text-xl mb-4">{item.primary.nome}</h2>
                            } else if (item.slice_type === 'link') {
                                return (<div><a href={item.primary.destino.url} className="inline-block text-lg px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-gray-300 mt-4 mb-3 lg:mt-0 w-64">{item.primary.texto_do_botao}</a></div>)
                            }
                            else { return null }
                        })
                    }

                    {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
                </div>
                <div className="px-6 pt-4 pb-2">

                    <a href="https://lp.devpleno.com/devreactjs/"> <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#devpleno</span></a>
                    <a href="https://omnweb.negocio.site/"><span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#omnweb</span></a>
                    <a href="https://github.com/omnweb/Social-Links"><span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-6">#thecode</span></a>
                </div>
            </div>
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