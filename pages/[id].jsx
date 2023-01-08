import React from 'react';
import Image from 'next/image'
import { useRouter } from 'next/router';

const Page = ({ movies }) => {
  let router = useRouter();
  return (
    <>
    <div style={{display:"flex", justifyContent:"space-between",width:"50%",margin:"auto",padding:"20px", backgroundColor:"#141B29",marginTop:"20px"}}>
      <button  onClick={()=>router.back()}>Back</button>
      <button  onClick={()=>router.push(`/${movies.id+1}`)}>Next Blog</button>
    </div>

      <div style={{width:"40%",border:"1px solid white",margin:"auto",marginTop:"30px",backgroundColor:"#141B29",borderRadius:"20px"}}>
      <Image style={{display:"block",margin:"auto",marginTop:"50px"}} width={600} height={300} src={movies.Images[0]} />
      <div style={{textAlign:"center"}}>
      <h1>Movie Title:{movies.Title}</h1>
        <h4>Released Date: {movies.Released}</h4>
        <h4>Genre: {movies.Genre}</h4>
        <h4>IMDB Rating: {movies.imdbRating}</h4>
      </div>
        
      </div>

    </>
  )
}

export async function getStaticPaths(){
  let res = await fetch("http://localhost:8080/movies");
  let data = await res.json();

  return{
    paths: data.map((movie) => ({params:{id:movie.id.toString()}})),
    fallback: false,
  }
}

export async function getStaticProps(context){
  let id = context.params.id;
  let res = await fetch(`http://localhost:8080/movies/${id}`);
  let data = await res.json();

  return{
    props:{
      movies:data,
    }
  }
}
export default Page
