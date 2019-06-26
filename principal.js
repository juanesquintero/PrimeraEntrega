const fs = require('fs')
const opciones = require('./opciones')
const cursos = require('./cursos')
const yargs = require('yargs')
const argv = yargs
            .command('inscribir','Inscripcion a un curso de extension',opciones)
            .argv

const comandos = argv._

let imprimirCursos=()=>{
    console.log('Cursos de Extension')
    for(let i=0; i<cursos.length; i++){
        setTimeout(function() { 
            let {id,nombre,duracion,valor} =cursos[i]
            console.log(
                (i+1)+'. El curso "'+nombre+'" tiene duracion de '+
                duracion+' horas, vale $'+valor+' pesos y su id es '+id+'.'
            )}
        ,2000*(i+1));
    }
}

let crearArchivo=(curso,nombre,cedula)=>{
    let {duracion, valor, id} = curso
    let texto = 'El estudiate: '+nombre+' con cedula: '+cedula+
                '\nse ha matriculado en el curso '+curso.nombre+
                '\ncon duracion de '+duracion+' horas, con valor'+
                '\n$'+valor+' pesos y id es '+id+'.'

    fs.writeFile('matricula.txt',texto,(err)=>{
        if(err) throw err
        console.log('Curso: '+curso.nombre,' Se ha creado el Archivo de Matricula')
    })
}

let inscripcion =  () =>{
    let {id, nombre, cedula } = argv
    let bool = cursos.some((e)=>e.id==id)
    if(bool){
        let curso = cursos.find((e)=>{if(e.id == id)return e})
        crearArchivo(curso,nombre,cedula)
    }else{
        console.log('¡Este curso no existe!')
        imprimirCursos()
    }
}

if(comandos.includes('inscribir')){
    inscripcion()
}else{
    imprimirCursos()
}