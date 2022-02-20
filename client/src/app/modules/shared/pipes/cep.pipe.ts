import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cep' })
export class CepPipe implements PipeTransform {
    transform(value: string): string {
        if (!value) return ''
        return value.replace(/(\d{5})(\d{3})/g, "\$1\-\$2");
    }
}