import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import {useRouter} from "next/router"

const Page = ({ movies }) => {
  const router = useRouter();

  let handleClick = (id) =>{
    router.push(`/${id}`)
  }
  return (
    <>
      <Head>
        <title>Movie Review Application</title>
        <meta name="description" content="Movie Review Application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 style={{textAlign:"center",textDecoration:"underline"}}>Review For Top 4 Movies </h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px", width: "90%", margin: "auto",marginTop:"80px" }}>
          {movies.map((movie) => (
            <div style={{ border: "1px solid gray", margin: "auto" }} key={movie.id}>
              <Image src={movie.Images[0]} width={300} height={300} />
              <h2 onClick={()=>handleClick(movie.id)} style={{ textAlign: "center", cursor: "pointer" }}>{movie.Title}</h2>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps(context) {
  let res = await fetch("http://localhost:8080/movies");
  let data = await res.json();

  return {
    props: {
      movies: data,
    }
  }
}

export default Page
