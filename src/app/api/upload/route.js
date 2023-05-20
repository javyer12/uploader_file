import { writeFile } from 'fs/promises'
import { NextResponse } from 'next/server';
import path from 'path';

export async function PUT(request) {
    const data = await request.formData();
    const file = data.get('file');
    if (!file) {
        return NextResponse.json({ success: false });
    }
    // buffer, file es convertido en un arreglo de bytes
    const bytes = await file.arrayBuffer();
    // objeto globla de node (Buffer)
    const buffer = Buffer.from(bytes);
    // cwd current working directory = ruta actual 
    const pathFile = path.join(process.cwd(), 'public', file.name);
    //modulo de node que modifica archivos/ recibe dos parametros = la ruta donde sera guardado
    //y segundo, el buffer "el valor del archivo"
    writeFile(pathFile, buffer);
    console.log("File uploaded to " + pathFile);
    return NextResponse.json({ success: true })
}
