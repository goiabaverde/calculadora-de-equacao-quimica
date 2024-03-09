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
        if(pointer.data == element){return true}
        return false
    }
    
    append(element){
        if(this.head == null){
            this.head = element
        }else{
            console.log(` resultado: ${this.includes(element)}`)
            if(this.includes(element)){
                console.log("O KRL")
                return 'Não adiciona'}
            let pointer = this.head
            while(pointer.next != null){
                pointer = pointer.next
            }
            pointer.next = element
        }
        this.size += 1
    }

    insersection(other){
        let result = new Conjunto()
        let pointer = this.head
        while(pointer.next != null){
            if(other.includes(pointer.data)){
                result.append(new Node(pointer.data))
            }
            pointer = pointer.next
        }
        if(other.includes(pointer.data)){
            result.append(new Node(pointer.data))
        }
        return result
    }
    
    symmetricDifference(other){
        var result = new Conjunto()
        let inter = this.insersection(other)
        let sets = [this, other]
        console.log(sets.lenght)
        for(var i = 0; i < sets.length; i++){
            let pointer = sets[i].head
            console.log(pointer.data)
            while(pointer.next != null){
                if(inter.includes(pointer.data) == false){
                    result.append(new Node(pointer.data))
                }
                pointer = pointer.next
                console.log(result.exibir())
            }
            if(inter.includes(pointer.data) == false){
                result.append(new Node(pointer.data))
            }
        }
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

}

var reagente = "NaOH + HCl"
var produto = "NaCl + H2O"

var abreviacoes_elementos = [
    "H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "K", "Ar", "Ca",
    "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Ni", "Co", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr", "Rb", "Sr", "Y", "Zr",
    "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "I", "Te", "Xe", "Cs", "Ba", "La", "Ce", "Pr", "Nd",
    "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg",
    "Tl", "Pb", "Bi", "Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr", "Rf", "Db", "Sg",
    "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts", "Og"
]

console.log(reagente.split('+'))
var reagentes = reagente.split('+')
var produtos = produto.split('+')
var elementos_reagentes = {}
var atomos_reagentes = new Conjunto()
var atomos_produtos = new Conjunto()
reagentes.forEach(reagent=>{
    console.log(reagent[0])
    for(var i = 0; i < reagent.length; i++){
        if(65 <= reagent[i].charCodeAt(0) <= 90 && 97 <= reagent[i+1].charCodeAt(0) <= 122){
                if(abreviacoes_elementos.includes(reagent[i] + reagent[i+1])){
                    if(elementos_reagentes[reagent[i] + reagent[i+1]] == undefined){
                        if(50 <= charCodeAt(reagent[i+2]) <= 57){
                            let k = i+2
                            let number = ''
                            while(50 <= charCodeAt(reagent[k] <= 57)){
                                number += reagent[k]
                                k++
                            }
                            i = k
                            elementos_reagentes[reagent[i] + reagent[i+1]] = parseInt(number)
                        }else{elementos_reagentes[reagent[i] + reagent[i+1]] = 1}
                    }else{
                        if(50 <= charCodeAt(reagent[i+2]) <= 57){
                            let k = i+2
                            let number = ''
                            while(50 <= charCodeAt(reagent[k] <= 57)){
                                number += reagent[k]
                                k++
                            }
                            i = k
                            elementos_reagentes[reagent[i] + reagent[i+1]] = parseInt(number)
                        }else{elementos_reagentes[reagent[i] + reagent[i+1]] = 1}
                        elementos_reagentes[reagent[i] + reagent[i+1]] += '2' <= reagent[i+2] <= '9' ? parseint(reagent[i+2]) * coef_estequiometrico : 1 * coef_estequiometrico;
                    }

                    i++
                }
        }else if(65 <= reagent[i].charCodeAt(0) <= 90){
            if(abreviacoes_elementos.includes(reagent[i])){
                elementos_reagentes[reagent[i]] = '2' <= reagent[i+1] <= '9' ? parseint(reagent[i+1]) * coef_estequiometrico : 1 * coef_estequiometrico;
            }else{
                elementos_reagentes[reagent[i]] += '2' <= reagent[i+1] <= '9' ? parseint(reagent[i+1]) * coef_estequiometrico : 1 * coef_estequiometrico;
            }
        }


    }
})

