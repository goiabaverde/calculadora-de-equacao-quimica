const { divide } = require("mathjs")

class Node{
    constructor(data){
        this.data = data
        this.next = null
    }
}

class Conjunto{
    constructor(){
        this.head = null
        this.size = 0
    }
    
    includes(element){
        let pointer = this.head
        if(pointer == null){return 'the set is empty'}
        while(pointer.next != null){
            if(pointer.data == element || pointer.data == element.data){return true}
            pointer = pointer.next
           
        }
        if(pointer.data == element || pointer.data == element.data){return true}
        return false
    }
    
    append(element){
        if(this.head == null){
            this.head = new Node(element)
        }else{
            console.log(element)
            console.log(` resultado: ${this.includes(element)}`)
            if(this.includes(element)){
                return 'Não adiciona'}
            let pointer = this.head
            while(pointer.next != null){
                pointer = pointer.next
            }
            pointer.next = new Node(element)
        }
        this.size += 1
    }

    insersection(other){
        let result = new Conjunto()
        if(this.head == null || other.head == null){
            return result
        }
        let pointer = this.head
        while(pointer.next != null){
            if(other.includes(pointer.data)){
                result.append(pointer.data)
            }
            pointer = pointer.next
        }
        if(other.includes(pointer.data)){
            result.append(pointer.data)
        }
        return result
    }
    
    symmetricDifference(other){
        var result = new Conjunto()
        if(this.head == null || other.head == null){
            return result
        }
        let inter = this.insersection(other)
        let sets = [this, other]
        console.log(sets.lenght)
        for(var i = 0; i < sets.length; i++){
            let pointer = sets[i].head
            console.log(pointer.data)
            while(pointer.next != null){
                if(inter.includes(pointer.data) == false){
                    result.append(pointer.data)
                }
                pointer = pointer.next
                console.log(result.exibir())
            }
            if(inter.includes(pointer.data) == false){
                result.append(pointer.data)
            }
        }
        console.log(result)
        return result
    }

    exibir(){
        if(this.size == 0){return '{}'}
        let result = '{'
        let pointer = this.head
        while(pointer.next != null){
            result += `${pointer.data}, `
            pointer = pointer.next
        }
        result += pointer.data
        result += '}'
        return result;
      };

    exibir_lista(){
        if(this.size == 0){return []}
        let result = []
        let pointer = this.head
        while(pointer.next != null){
            result.push(`${pointer.data}`)
            pointer = pointer.next
        }
        result.push(`${pointer.data}`) 
        return result;
      };

    isEmpty(){
        if(this.size == 0){return true}
        else{return false}
    }
}

function isCapitalLetter(letter){
    letter = String(letter)
    console.log(`A LETRA É ${letter} e o tipó é ${typeof(letter)}, código ${letter.charCodeAt(0)}`)
    if(65 <= parseInt(letter.charCodeAt(0)) && parseInt(letter.charCodeAt(0)) <= 90){
        return true}else{
            return false
        }
}

function isLowercaseLetter(letter){
    letter = String(letter)
    console.log(`A LETRA É ${letter} e o tipó é ${typeof(letter)}, código ${letter.charCodeAt(0)}`)
    console.log(`${letter.charCodeAt(0)}, tipo : ${typeof(letter.charCodeAt(0))}`)
    if(letter.charCodeAt(0) == 117){return false}
    else{if(97 <= parseInt(letter.charCodeAt(0)) && parseInt(letter.charCodeAt(0))  <= 122){
        return true}else
        {return false}
    }
}

function isNum_2_9(char){
    char = String(char)
    if(50 <= parseInt(char.charCodeAt(0)) && parseInt(char.charCodeAt(0)) <= 57){return true}
    else{return false}
}

function check_if_is_equal(str){
    let counter_letter = 0
    let counter_ones = 0
    let letters = []
    for(var i = 0; i < str.length ; i++){
        if(str[i] == '1'){counter_ones++}
        if( 65 <= str[i].charCodeAt(0) && str[i].charCodeAt(0) <= 90){
            letters.push(str[i].charCodeAt(0))
            counter_letter++}

    }
    if(counter_letter == counter_ones){
        return letters
    }else{
        return []
    }
}


var reagente = "H2SO4 + NaOH"
var produto = "Na2SO4 + H2O"

var abreviacoes_elementos = [
    "H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "K", "Ar", "Ca",
    "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Ni", "Co", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr", "Rb", "Sr", "Y", "Zr",
    "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "I", "Te", "Xe", "Cs", "Ba", "La", "Ce", "Pr", "Nd",
    "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg",
    "Tl", "Pb", "Bi", "Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr", "Rf", "Db", "Sg",
    "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts", "Og"
]

console.log(reagente.split('+'))
let reagentes = reagente.split('+')
let produtos = produto.split('+')
var atomos_reagentes = new Conjunto()
var atomos_produtos = new Conjunto()
var elementos_reagentes = []
var elementos_produtos = []
var elementos_quantificados = [elementos_reagentes, elementos_produtos]
var elementos = [reagentes, produtos]
var atomos = [atomos_reagentes, atomos_produtos]
var error = false

for(var j = 0; j < 2; j++){
    elementos[j].forEach(element=>{
        if(error){return 1}
        var atomos_do_elemento = []
        element = element.trim()
        console.log(element.length)
        for(var i = 0; i < element.length; i++){
            console.log(element[i])
            console.log(element[i+1])
            console.log(element[i+2])
            try{
                if(isCapitalLetter(element[i]) && isLowercaseLetter(element[i+1])){
                    if(abreviacoes_elementos.includes(element[i] + element[i+1])){
                        let item = {}
                        try{
                            if(isNum_2_9(element[i+2])){
                                let k = i+2
                                let number = ''
                                while(isNum_2_9(element[k])){
                                    number += element[k]
                                    k++
                                }
                             
                                item[element[i] + element[i+1]] = parseInt(number)
                                atomos[j].append(element[i] + element[i+1])
                                i =  k - 1
                                
                            }else{
                                item[element[i] + element[i+1]] = 1
                                atomos[j].append(element[i] + element[i+1])
                                i += 1
                            }
                            atomos_do_elemento.push(item)
                            console.log(atomos[j].exibir())
                            
                        }catch(e){console.log(e)}}else{
                            console.log(`${element[i] + element[i+1]} don't exist, please correct`)
                            error = true
                            break}
                        
                }else if(isCapitalLetter(element[i])){
                    if(abreviacoes_elementos.includes(element[i])){
                        let item = {}
                        try{
                            if(isNum_2_9(element[i+1])){
                                let k = i+1
                                let number = ''
                                while(isNum_2_9(element[k])){
                                    number += element[k]
                                    k++
                                }
                                                         
                                item[element[i]] = parseInt(number)
                                atomos[j].append(element[i])
                                i = k -1  
                                
                            }else{item[element[i]] = 1
                                atomos[j].append(element[i])
                            }

                            atomos_do_elemento.push(item)
                            
                            console.log(atomos[j].exibir())
                        }catch(e){console.log(e)}
                    }else{
                        console.log(`${element[i]} don't exist, please correct`)
                        error = true
                        break
                    }
                }
            }catch(e){console.log(e)}
    }
    elementos_quantificados[j].push(atomos_do_elemento)
    })
}

const dif = atomos_produtos.symmetricDifference(atomos_reagentes)

if(dif.isEmpty()){
    var equacoes = []
    var counter = 0
    var resultado = ''
    const atomos_presentes = atomos_produtos.exibir_lista()
    for(var k = 0; k < atomos_presentes.length; k++){
        elementos_quantificados.forEach(elemento=>{
            console.log(elemento)
            for(var i = 0; i < elemento.length; i++){
                 console.log(elemento[i])
                for(var j = 0; j < elemento[i].length; j++){
                    if(elemento[i][j][atomos_presentes[k]] != undefined){
                        if(resultado.length == 0 || resultado[resultado.length - 1] == '('){
                            resultado += `${String.fromCharCode(65 + counter)}*${(elemento[i][j][atomos_presentes[k]])}`
                        }else{
                            resultado += ` + ${String.fromCharCode(65 + counter)}*${(elemento[i][j][atomos_presentes[k]])}`
                        }
                    }
                }
                 counter++
            }
            counter = 2
            resultado += '-('
        })
        counter = 0
        resultado = resultado.substr(0,resultado.length - 2)
        resultado += ')'
        equacoes.push(resultado)
        resultado = ''
    }
    console.log(atomos_presentes)
    console.log(equacoes)
    
}else{
    console.log("A equação está errada, verifique novamente")
}


class Coeficientes{
    constructor(num_elem_rea, num_elem_pro){
        console.log(num_elem_rea)
        console.log(num_elem_pro)
        this.qtd = num_elem_pro + num_elem_rea
        console.log(`QTD : ${this.qtd}`)
        let lista = []
        for(var i = 0; i < this.qtd; i++){
           lista.push(0)
        }
        this.coef = lista
    }

    change(index, data){
        if(this.coef[index] == undefined){
            return 1
        }else{
            this.coef[index] = data
        }

    }

    get_index(index){
        if(this.coef[index] == undefined){
            return ''
        }else{
            return this.coef[index]
        }
    }

    exibir(){
        return this.coef

    }

    letras_nao_nulas(){

        let result = []
        for(var i = 0; i < this.coef.length; i++){
            if(this.coef[i] != 0){
                result.push(65 + i)
            }
        }
        return result
    }

}

var coeficientes = new Coeficientes(reagentes.length, produtos.length)
console.log("ANTES")
console.log(coeficientes.exibir())
equacoes.forEach(eq=>{
    if(check_if_is_equal(eq).length != 0){
        let letters = check_if_is_equal(eq)
        letters.forEach(letter=>{
            coeficientes.change(letter - 65, 1)
        })
    }
})
console.log("DEPOITS")
console.log(coeficientes.exibir())
let equacoes_algebricas = []



function resolver_eq(eq){
    eq = eq.trim()
    var incognita = []
    for(var i = 0; i < eq.length; i++ ){
        if(isCapitalLetter(eq[i])){
            if(coeficientes.get_index(eq[i].charCodeAt(0) - 65) == 0){
                incognita.push(eq[i].charCodeAt(0) - 65)
            }
            if(incognita.length == 2){
                return 1}
        }
    }
    incognita = incognita[0]
    let letras_n_nulas = coeficientes.letras_nao_nulas()
    letras_n_nulas.forEach(letra=>{
    if(letra == 65){ A = 1}
    if(letra == 66){ B = 1}
    if(letra == 67){ C = 1}
    if(letra == 68){ D = 1}
    if(letra == 69){ E = 1}
    if(letra == 70){ F = 1}
})

    let parts = eq.split('-')
    //Check where is the incognita

    for(var m=0; m < 2; m++){
        if(parts[m].includes(incognita)){var local_incognita =  m}
    }
    //Check if the incognita is alone and has a divisor
    if(parts[local_incognita].split('+').length != 0){
        for(var n = 0; n < parts[local_incognita].split('+').length; n++){

        }
    }
    for(var m = 0 ; m < 2; m++){
        try{
            var valor = eval(parts[m])
            for(var i = 0; i < eq.length ; i++){
                if((eq[i].charCodeAt(0) - 65) == incognita){
                    console.log(`VALOR : ${valor}`)
                    if(m == 0){
                        if(parts[0].includes(1)){
                            var divisor = 1
                    }
                    
                    }else{
                        let membro_with_inco = parts[1]
                        membro_with_inco = membro_with_inco.trim()
                        var divisor = parseInt(membro_with_inco[3])
                    }
                    coeficientes.change(incognita, valor/divisor)
                }
                break
                return 0
            }
            
        }catch (e){
            console.log(e)
            console.log(valor)
        }
    }

}

//for(var i = 0; i < equacoes.length ; i++){
//    equacoes[i] = equacoes[i].trim()
 //   equacoes_algebricas.push(eval(equacoes[i]))
//}



equacoes.forEach(equacao=>{
    resolver_eq(equacao)
})

console.log(coeficientes.exibir())
