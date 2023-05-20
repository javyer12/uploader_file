import { writeFile } from 'fs/promises'
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request) {
    try {
        const data = await request.formData();
        const file = data.get('file');

        // buffer, file es convertido en un arreglo de bytes
        const bytes = await file.arrayBuffer();
        // objeto globla de node (Buffer)
        const buffer = Buffer.from(bytes);
        // cwd current working directory = ruta actual 
        const pathFile = path.join(process.cwd(), 'public', file.name);
        console.log(pathFile);
        //modulo de node que modifica archivos/ recibe dos parametros = la ruta donde sera guardado
        //y segundo, el buffer "el valor del archivo"

        writeFile(pathFile, buffer);
        console.log("File uploaded to " + pathFile);
        return new Response(JSON.stringify({
            message: "uploaded file..."
        }))
    } catch (e) {
        return NextResponse.json(
            JSON.stringify({
                message: 'File not found',
            }),
            {
                status: 400,
            }
        )
    }
}
