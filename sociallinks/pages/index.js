import React from 'react'
import Prismic from 'prismic-javascript'
import Head from 'next/head' // Importando para alterar o título da página

// Criando componente index
const Index = ({ data }) => {
    console.log('Client')
    return (
        <div className="flex mb-4" >

            <div className="w-1/3 h-12"></div>
            <Head><title>{data.pagetitle}</title></Head>
            <div className="w-1/3 h-12" >
                <div className="container mt-12">
                    <div className="content" >
                        <div className="max-w-sm rounded overflow-hidden shadow-lg text-center" style={{ backgroundColor: data.background, color: data.text }}>
                            <div className="px-6 py-4">
                                {/* <div className=" w-1/2 mx-auto text-center p-10" > */}
                                <h1 className="font-bold text-xl mb-2">Social Links</h1>

                                {/* Função que transforma um vetor em uma lista de elementos renderizáveis na tela  */}
                                {
                                    data.body.map(item => {
                                        if (item.slice_type === 'image') {
                                            return <img key={true} src={item.primary.perfil.url} alt={item.primary.perfil.alt} className="mx-auto rounded-full" />
                                        }
                                        else if (item.slice_type === 'secao') {
                                            return <h2 className="font-bold text-xl mb-2">{item.primary.nome}</h2>
                                        } else if (item.slice_type === 'link') {
                                            return (<div><a href={item.primary.destino.url} className="inline-block text-lg px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-gray-300 mt-4 mb-3 lg:mt-0 w-64">{item.primary.texto_do_botao}</a></div>)
                                        }
                                        else { return null }
                                    })
                                }

                                {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
                            </div>
                            <div className="px-6 pt-4 pb-2">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#experience</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#works</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#development</span>
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>
            <div className="w-1/3 h-12"></div>
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