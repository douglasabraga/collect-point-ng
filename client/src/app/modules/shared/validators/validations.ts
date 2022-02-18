import { AbstractControl } from "@angular/forms";

export class Validations {
    static ValidatorCnpj(control: AbstractControl) {
        let size, numbers, sum, digits, position, result
        const cnpj = control.value

        if (cnpj == '') return { 'validCnpj': true }
        if (cnpj.length != 14) return { 'validCnpj': true }
    
        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" || 
            cnpj == "11111111111111" || 
            cnpj == "22222222222222" || 
            cnpj == "33333333333333" || 
            cnpj == "44444444444444" || 
            cnpj == "55555555555555" || 
            cnpj == "66666666666666" || 
            cnpj == "77777777777777" || 
            cnpj == "88888888888888" || 
            cnpj == "99999999999999")
            return { 'validCnpj': true }
            
        // Valida DVs
        size = cnpj.length - 2
        numbers = cnpj.substring(0,size)
        digits = cnpj.substring(size)
        sum = 0
        position = size - 7

        for (let i = size; i >= 1; i--) {
            sum += numbers.charAt(size - i) * position--
            if (position < 2) position = 9
        }

        result = sum % 11 < 2 ? 0 : 11 - sum % 11

        if (result != digits.charAt(0)) return { 'validCnpj': true }
            
        size = size + 1
        numbers = cnpj.substring(0,size)
        sum = 0
        position = size - 7

        for (let i = size; i >= 1; i--) {
            sum += numbers.charAt(size - i) * position--
            if (position < 2) position = 9
        }

        result = sum % 11 < 2 ? 0 : 11 - sum % 11

        if (result != digits.charAt(1)) return { 'validCnpj': true }
            
        return null
    }
}