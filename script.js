const input = document.querySelector("#ingresopalabra");
const botonguardar = document.querySelector("#boton-guardar");
let palabras = ["PERRO","ARBOL","PEZ","ARDILLA","HUMANO"];

//todo lo que hay que ocultar al comienzo 
document.getElementById("div-pantalla-palabra").style.display = 'none';
document.getElementById("div-pantalla-juego").style.display = 'none';
document.getElementById("mensaje-ganador").style.display = 'none';
document.getElementById("mensaje-perdedor").style.display = 'none';

/*zona de botones*/
//botones de la pagina inicial
document.getElementById("boton-inicio").onclick = (e) => {
    document.getElementById("div-pantalla-juego").style.display = 'block';
    document.getElementById("div-pantalla-inicio").style.display = 'none';
    numrandom()
}
document.getElementById("boton-agregar").onclick = (e) => {
    document.getElementById("div-pantalla-palabra").style.display = 'block';
    document.getElementById("div-pantalla-inicio").style.display = 'none';
}


//botones de la pagina palabra
document.getElementById("boton-guardar").onclick = (e) => {
    //cambia de estado
    document.getElementById("div-pantalla-juego").style.display = 'block';
    document.getElementById("div-pantalla-palabra").style.display = 'none';
    //guarda la parabra en una lista
    e.preventDefault();
    palabras.push(input.value.toUpperCase());
    console.log(palabras);
    numrandom()
}

document.getElementById("boton-cancelar").onclick = (e) => {
    document.getElementById("div-pantalla-inicio").style.display = 'block';
    document.getElementById("div-pantalla-palabra").style.display = 'none';
}


//botones del juego
document.getElementById("boton-juego").onclick = (e) => {
    numrandom()
}

document.getElementById("boton-desistir").onclick = (e) => {
    document.getElementById("div-pantalla-juego").style.display = 'none';
    document.getElementById("div-pantalla-inicio").style.display = 'block';
}


////parte del calculo de la palabra que hay que adivinar 
var num = 0;
var palabraescogida = "";
var palabranueva,letrasusadas ;
var aciertos=0;

function numrandom(){
    num = parseInt(Math.random()*(palabras.length));
    palabraescogida = palabras[num];
    palabranueva=[];
    letrasusadas=[];
    aciertos=0;
    //crea los espacios de en que van a estar las letras de la palabra que se esta buscando 
    for(i=0;i<palabraescogida.length;i++){
        palabranueva.push(' ');
    }

    //coloca la cantida de espacios necesarios para colocar la parabra en el juego
    for( i = 1 ; i<=8 ; i++){
        var numero = i.toString();
        document.getElementById(numero).style.display = 'inline-block';
        if (i!=1)
            document.getElementById("muneco"+numero).style.display = 'none';
    }
    for( i = 1 ; i<=8-palabraescogida.length ; i++){
        var numero = i.toString();
        document.getElementById(numero).style.display = 'none';
    }
    quitarpalabra()
    document.getElementById("muneco1").style.display = 'block';
    document.getElementById("mensaje-ganador").style.display = 'none';
    document.getElementById("mensaje-perdedor").style.display = 'none';
}


////la parte que tiene que ver con recolectar datos del teclado
document.addEventListener('keyup',(event)=>{
    var keyValue=event.key;
    var charCode = event.keyCode;
    if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)){
        revisasiesta(keyValue.toUpperCase())
    }
},false)


//revisa y crea las listas de palabras necesarias para el ahorcado
function revisasiesta(letra){
    //si esta en la palabra
    if(palabraescogida.indexOf(letra)!=-1){
        for(i in palabraescogida){
            if(palabraescogida[i]==letra && palabranueva[i]!=letra){
                palabranueva[i]=letra;
                aciertos++
            }
        }
    }
    else{
        if(letrasusadas.indexOf(letra)==-1){
            letrasusadas.push(letra);
        }
        
    }
    ponerpalabra(palabranueva,letrasusadas);
    control_muneco();
    frases();
}
//pone las palabras y las letras en pantalla
function ponerpalabra (texto1,texto2){
    var a = ''
    for (i in texto1){
        a=a.concat('<p>');
        a=a.concat(texto1[i]);
        a=a.concat('</p>');
    }
    document.getElementById('letras-superiores').innerHTML= a ;
    document.getElementById('letras-inferiores').innerHTML= texto2 ;
}

//quita las palabras y las letras existentes en la pantalla
function quitarpalabra(){
    document.getElementById('letras-superiores').innerHTML= '<p> </p>' ;
    document.getElementById('letras-inferiores').innerHTML= '<p> </p>' ;
}

function control_muneco(){
    for(i=1;i<=letrasusadas.length;i++){
        if (i<=8)
        document.getElementById("muneco"+i).style.display = 'none';
    }

    switch(letrasusadas.length){
        case 0:
            document.getElementById("muneco"+(letrasusadas.length+1)).style.display = 'block';
            break;
        case 1:
            document.getElementById("muneco"+(letrasusadas.length+1)).style.display = 'block';
            break;
        case 2:
            document.getElementById("muneco"+(letrasusadas.length+1)).style.display = 'block';
            break;
        case 3:
            document.getElementById("muneco"+(letrasusadas.length+1)).style.display = 'block';
            break;
        case 4:
            document.getElementById("muneco"+(letrasusadas.length+1)).style.display = 'block';
            break;
        case 5:
            document.getElementById("muneco"+(letrasusadas.length+1)).style.display = 'block';
            break;
        case 6:
            document.getElementById("muneco"+(letrasusadas.length+1)).style.display = 'block';
            break;
        case 7:
            document.getElementById("muneco"+(letrasusadas.length+1)).style.display = 'block';
            break;
        default:
            document.getElementById("muneco8").style.display = 'block';

    }
    
}

//frases de victoria o derrota 
function frases(){
    if (letrasusadas.length>=7){
        document.getElementById("mensaje-ganador").style.display = 'none';
        document.getElementById("mensaje-perdedor").style.display = 'block';
    }
    else if (aciertos>=palabraescogida.length){
        document.getElementById("mensaje-ganador").style.display = 'block';
        document.getElementById("mensaje-perdedor").style.display = 'none';
    }
}