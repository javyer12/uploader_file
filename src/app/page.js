"use client"
import React, { useState } from "react";
import './globals.css';

export default function Home() {
  const [ file, setFile ] = useState();
  const [ succ, setSucc ] = useState(false);

  const handleFileChange = (e) => {
    if (!e.target.files?.[ 0 ]) return;
    setFile(e.target.files?.[ 0 ]);
  }
  const handleSubmitFile = async (e) => {
    // sirve para no recargar la pagina
    e.preventDefault();

    if (!file) return confirm("You forgot picking a file");

    try {
      const formFile = new FormData();
      formFile.set('file', file);
      //api/upload = es el backend || here the image is sent to the server
      const res = await fetch('/api/upload', {
        method: 'PUT',
        body: formFile,
        mode: 'cors',
      });

      if (res.ok) {
        confirm("File uploaded successfully");
        setSucc(true);
      }
    } catch (e) {
      console.error(e.message);
    }
  }
  return (
    <nav className="main ">
      <h2 className="text-center from-slate-900 text-4xl mt-2 ">KGS Vogue...</h2>
      <nav className=" flex m-7 justify-center items-center ">
        <section className="m-9 p-5 bg-zinc-950 shadow-lg shadow-black ">
          <h1 className="text-center m-5 text-3xl main_text">Upload Your Favorites Images</h1>
          <form onSubmit={handleSubmitFile}>
            <input type="file"
              className="bg-zinc-900 text-zinc-200 p-2 rounded block mb-2"
              onChange={handleFileChange}
            />
            <button
              type="submit"
              className="w-full mt-3 p-3 bg-transparent border border-double rounded block disabled:opacity-50 hover:bg-lime-600"
              disabled={!file}
            >
              Upload File
            </button>
          </form>
          {file && (<img src={URL.createObjectURL(file)}
            alt="this is an image uploaded by user"
            className="w-full h-64 object-cover p-5 ps-0 m-4 mx-auto"
          />)}
        </section>
      </nav>
      {succ && (
        <a type="button" href="./files.js" onClick={() => {
          setSucc(false)
        }} className="flex anchor mb-5 m-auto p-3 w-44 justify-center bg-transparent border border-double rounded hover:bg-black "
        >
          Watch Files
        </a>)}
    </nav>
  )
}
// AGREGAR libreria para aceptar arrastrar y soltar archivos 