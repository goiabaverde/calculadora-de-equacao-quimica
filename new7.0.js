//const { divide } = require("mathjs")

class Node{
    constructor(data){
        this.data = data
        this.next = null
    }
}

class Conjunto{
    // Conjunto is a simple linked list that will store the atons of the reagent and product, existing a set for each one
    constructor(){
        this.head = null
        this.size = 0
    }
    
    // Check if a element exist on the Conjunto
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

    // Add to the end of the set a element
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

    // Math operetion of intersection
    intersection(other){
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
    
    // Math operation of symetricDiferrenc beetween tow sets
    symmetricDifference(other){
        var result = new Conjunto()
        if(this.head == null || other.head == null){
            return result
        }
        let inter = this.intersection(other)
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

    // Show the data storated on the set
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

    // Show in form of a array
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

// 
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

    resolver_eq(eq){
        eq = eq.trim()
        // Check how many incognitas has in the equation
        var incognita = []
        for(var i = 0; i < eq.length; i++ ){
            if(isCapitalLetter(eq[i])){
                if(this.get_index(eq[i].charCodeAt(0) - 65) == 0){
                    incognita.push(eq[i].charCodeAt(0) - 65)
                }
                if(incognita.length > 1){
                    // If in the equation has more than 1 incognita, the equation will not be resolved
                    return 1}
            }
        }
        if(incognita.length == 0){return false}

        // Declare the variables that will be used in the math process
        var A 
        var B  
        var C 
        var D
        var E
        var F
        incognita = incognita[0]
        // Add the values to the variables based on the variables that are not null
        let letras_n_nulas = this.letras_nao_nulas()
        if (letras_n_nulas.length == this.qtd){true}
        letras_n_nulas.forEach(letra=>{
        if(letra == 65){  A = this.get_index(letra - 65)}
        if(letra == 66){  B = this.get_index(letra - 65)}
        if(letra == 67){  C = this.get_index(letra - 65)}
        if(letra == 68){  D = this.get_index(letra - 65)}
        if(letra == 69){  E = this.get_index(letra - 65)}
        if(letra == 70){  F = this.get_index(letra - 65)}
    })
        console.log(A,C)
        let parts = eq.split('-')
        // Check where is the incognita
        for(var m=0; m < 2; m++){
            if(parts[m].includes(String.fromCharCode(65 + incognita))){
                var local_incognita =  m
                var local_sem_incognita = m == 1? 0 : 1

            }
        }
        // Check if the incognita is alone 
        console.log(parts[local_incognita].split('+'))
        if(parts[local_incognita].split('+').length > 1){
            // Check if has another term with the incognita
            var incognita_member = parts[local_incognita].split('+')
            for(var n = 0; n < incognita_member.length; n++){
                if(incognita_member[n].includes(String.fromCharCode(65 + incognita)) == false){
                    var term = incognita_member[n].trim()
                    if(term.includes(")")== false){term += ')'}
                    if(term.includes("(") == false){
                        let temp = "("
                        temp += term
                        term = temp
                    }

                    parts[local_incognita].split('+').splice(n,1)
                    parts[local_sem_incognita] += `-${term}`
                }
           
            }

        }
        // Check term that multiplys the incognita
        for(var m = 0; m < parts[local_incognita].length; m++){
            var divisor = ''
            if(isNum_1_9(parts[local_incognita][m])){
                divisor += `${parts[local_incognita][m]}`
            }
            if(divisor.length == 0){
                divisor = 1
            }else{
                divisor = parseInt(divisor)
            }
        } 
            try{
                var valor = eval(parts[local_sem_incognita])
                this.change(incognita, valor/divisor)
                
            }catch (e){
                console.log(e)
                console.log(valor)
            }   
    }

    get_the_lowests_integers(){
        for(var i = 0; i < this.coef.length; i++){
            if(this.coef[i] % 1 != 0){
                const decimal_number = this.coef[i] 
                const corrector = 1 / decimal_number
                this.coef = this.coef.map((x) => x * corrector)
                i = 0
            }
        }
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

function isNum_1_9(char){
    char = String(char)
    if(49 <= parseInt(char.charCodeAt(0)) && parseInt(char.charCodeAt(0)) <= 57){return true}
    else{return false}
}

function check_if_is_equal(str){
    let definitive_members = []
    let members = str.split('-')
    for(var m = 0; m < 2; m++){
        let new_member = ""
        let organized_member = []
        for(var i = 0; i < members[m].length; i++){            
            if(isCapitalLetter(members[m][i])){
                let atom = members[m][i]
                let added = false
                let number_that_multiplys = ""
                while(isNum_1_9(members[m][i+2])){
                    number_that_multiplys += members[m][i += 2]
                    i++
                }
                i += 2
                number_that_multiplys = parseInt(number_that_multiplys)
                for(var j = 0 ; j < organized_member.length; j++){
                    if(Object.keys(organized_member[j])[0] == members[m][i]){
                        organized_member[j].member[i] += number_that_multiplys
                        added = true
                        break
                    }
                }
                if(added != true){
                    let item = {}
                    item[atom] = number_that_multiplys
                    organized_member.push(item)
                }
            }
        }
        for(var k = 0; k < organized_member.length ; k++){
            console.log(organized_member[k])
            console.log(Object.keys(organized_member[k])[0])
            if(k == (organized_member.length - 1) && m == 0){
                new_member += `${Object.keys(organized_member[k])[0]}*${organized_member[k][Object.keys(organized_member[k])[0]]} -`
            }else if(k == (organized_member.length - 1) && m == 1){
                new_member += `${Object.keys(organized_member[k])[0]}*${organized_member[k][Object.keys(organized_member[k])[0]]}`
            }else{
                new_member += `${Object.keys(organized_member[k])[0]}*${organized_member[k][Object.keys(organized_member[k])[0]]} + `
            }
        }
        definitive_members.push(new_member)
    }
    str = ''
    for(var i = 0; i < 2; i++){
        if(i == 1){
            str += `(${definitive_members[i]})`
        }else{
            str += definitive_members[i]
        }
    }
    console.log(str)
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


var reagente = "C2H5OH + CHOOH"
var produto = "C3H5OOH  + H2O"

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

function add_to_atons_of_element(atons_list, atons_to_add) {
    // Get the list of the atons and check with there's already a aton like the one that is being added to the list
    // If there's already aton in the list like the new aton, then the result will added
    // If not a new element to the list will be pushed
    if(atons_list.length == 0){
        atons_to_add.forEach(atom=>{
            atons_list.push(atom)
        })
        //already_added = true
    }else{
        for(var i = 0; i < atons_to_add.length; i++){
            var breaked = false
            for(var j = 0; j < atons_list.length; j++){
                console.log(Object.keys(atons_list[j])[0], Object.keys(atons_to_add[i])[0])
                if(Object.keys(atons_list[j])[0] == Object.keys(atons_to_add[i])[0]){
                    atons_list[j][Object.keys(atons_to_add[i])[0]] += atons_to_add[i][Object.keys(atons_to_add[i])[0]]
                    var breaked = true
                    break    
                }
            }
            if(breaked == false){atons_list.push(atons_to_add[i])}
            
        }
    }
}
for(var j = 0; j < 2; j++){
    elementos[j].forEach(element=>{
        //var already_added = false
        if(error){return 1}
        var atomos_do_elemento = []
        element = element.trim()
        console.log(element.length)
        for(var i = 0; i < element.length; i++){
            console.log(element[i])
            console.log(element[i+1])
            console.log(element[i+2])
            try{
                if(element[i] == '('){
                    var begin  = i + 1
                    for(var k = begin; k <= element.length  ; k++){
                        if(element[k] == ')'){
                            var end = k
                            break
                        }
                    }

                    if(end == undefined){
                        // TROW ERROR AQUI abriu ( não fecho
                        return false}
                    
                    // Get the number that multiplys the elements inside the parentheses

                    if(isNum_2_9(element[end+1])){
                        let k = end+1
                        let number = ''
                        while(isNum_2_9(element[k])){
                            number += element[k]
                            k++
                        }                        
                        if(number.length != 0){
                            var number_parentheses = parseInt(number)
                        }else{var number_parentheses = 1}
                    }

                    // Get the elements inside of the parentheses
                    var elements_inside_parentheses = []
                    for(var p = begin; p < end ; p++){
                        if(abreviacoes_elementos.includes(element[p] + element[p+1])){
                            let item = {}
                            if(isCapitalLetter(element[p]) && isLowercaseLetter(element[p+1])){
                                if(isNum_2_9(element[p+2])){
                                    let k = p + 2
                                    let number = ''
                                    while(isNum_2_9(element[k])){
                                        number += element[k]
                                        k++
                                    }
                                    item[element[p] + element[p+1]] = parseInt(number)
                                    atomos[j].append(element[p] + element[p+1])
                                    // Back one position of the variable k
                                    p = k - 1
                                }else{
                                    item[element[p] + element[p+1]] = 1
                                    atomos[j].append(element[p] + element[p+1])
                                    // Make a sum to the p to jump the lowercase Letter and sabe a interation
                                    p++
                                }
                                
                                elements_inside_parentheses.push(item)
                                
                            }
                        }else{//Trow error, unknown element
                        }
                        if(abreviacoes_elementos.includes(element[p])){
                            let item = {}
                            if(isCapitalLetter(element[p])){
                                if(isNum_2_9(element[p+1])){
                                    let k = p + 1
                                    let number = ''
                                    while(isNum_2_9(element[k])){
                                        number += element[k]
                                        k++
                                    }
                                    item[element[p]] = parseInt(number)
                                    atomos[j].append(element[p])
                                    // Back one position of the variable k
                                    p = k - 1
                                }else{
                                    item[element[p]] = 1
                                    atomos[j].append(element[p])
                                }
                                elements_inside_parentheses.push(item)
                                console.log(elements_inside_parentheses)
                            }
                        }else{
                            //Trow error, unknown element
                        }
                    }
                    if(elements_inside_parentheses.length == 0){
                        // Trow error the parentsies is empty
                    }else{
                        elements_inside_parentheses.forEach(elem=>{
                            elem[Object.keys(elem)[0]] = elem[Object.keys(elem)[0]] * number_parentheses 
                            
                        })
                        add_to_atons_of_element(atomos_do_elemento, elements_inside_parentheses)
                        
                    }
                    i = end + 1
                }else if(isCapitalLetter(element[i]) && isLowercaseLetter(element[i+1])){
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
    //elementos_quantificados[j].push(atomos_do_elemento)
    try{
        elementos_quantificados[j].push(atomos_do_elemento)
    }catch (e){console.log(e)}
  
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




var coeficientes = new Coeficientes(reagentes.length, produtos.length)
console.log("ANTES")
console.log(coeficientes.exibir())
let checked = false
equacoes.forEach(eq=>{
    if(check_if_is_equal(eq).length != 0){
        let letters = check_if_is_equal(eq)
        letters.forEach(letter=>{
            coeficientes.change(letter - 65, 1)
        })
        checked = true
    }
})
console.log("DEPOITS")
console.log(coeficientes.exibir())
let equacoes_algebricas = []




//for(var i = 0; i < equacoes.length ; i++){
//    equacoes[i] = equacoes[i].trim()
 //   equacoes_algebricas.push(eval(equacoes[i]))
//}
if(checked == false){coeficientes.change(2, 1)}

for(var a = 0; a < equacoes.length ; a++){
    if(coeficientes.resolver_eq(equacoes[a]) == true){break}
}

console.log(coeficientes.exibir())
coeficientes.get_the_lowests_integers()
let balenceded_eq = ''
let index_of_coef = 0

let coef;
for(var i = 0; i < elementos.length; i++){
    for(var j = 0; j < elementos[i].length; j++){
        coef = coeficientes.exibir()[index_of_coef] == 1? 1 : coeficientes.exibir()[index_of_coef]
        
        if(j != elementos[i].length - 1){
            balenceded_eq += `${coef}${elementos[i][j].trim()} + `
        }else{
            if(i == 0){
                balenceded_eq += `${coef}${elementos[i][j].trim()} = `
            }else{
                balenceded_eq += `${coef}${elementos[i][j].trim()}`
            }
        }
        index_of_coef++
    }
}
equacoes.forEach(e=>{
    console.log(e)
})
console.log(balenceded_eq)
