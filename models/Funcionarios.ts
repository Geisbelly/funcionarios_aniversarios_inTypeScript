// models/Funcionario.ts
export default class Funcionario {
    private nome: string;
    private dataNascimento: Date;
  
    constructor(nome: string, dataNascimento: Date) {
      this.nome = nome;
      this.dataNascimento = this.criarDataSemFusoHorario(dataNascimento.toISOString());
    }
  
    getNome(): string{
        return this.nome
    }

    getDataNascimento(): Date{
        return this.dataNascimento
    }

    getDetalhes(): [string,Date] {
      return [this.nome, this.dataNascimento];
    }

    getDataConvertida(): string{
        const data: Date = this.criarDataSemFusoHorario(this.dataNascimento.toISOString());
        const dia: string = String(data.getUTCDate()).padStart(2, '0');
        const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
        const ano = data.getUTCFullYear();

        return `${dia}/${mes}/${ano}`
    }

    criarDataSemFusoHorario(dataString: string): Date {
        const partes: Array<string> = dataString.split('-');
        const ano: number = parseInt(partes[0], 10);
        const mes: number = parseInt(partes[1], 10) - 1;
        const dia: number = parseInt(partes[2], 10);
        
        return new Date(ano, mes, dia);
    }

    calcularIdade(): number{
        const hoje = new Date();
        let idade = hoje.getFullYear() - this.dataNascimento.getFullYear();
        const mes = hoje.getMonth() - this.dataNascimento.getMonth();
        
        if (mes < 0 || (mes === 0 && hoje.getDate() < this.dataNascimento.getDate())) {
            if (idade >= 0 ) 
                return idade;
            else idade --;
        }
        return idade;
    }

    calcularDiasAniversario(): number {
        const hoje: Date = new Date();
        const proximoAniversario: Date = new Date(hoje.getFullYear(), this.dataNascimento.getMonth(), this.dataNascimento.getDate());
    
        if (hoje.getFullYear() === proximoAniversario.getFullYear() &&
            hoje.getMonth() === proximoAniversario.getMonth() &&
            hoje.getDate() === proximoAniversario.getDate()) {
            return 0;
        }
    
        if (hoje.getFullYear() === proximoAniversario.getFullYear() &&
            hoje.getMonth() === proximoAniversario.getMonth() &&
            hoje.getDate() === proximoAniversario.getDate()+1) {
            return 1;
        }
    
        if (hoje > proximoAniversario) {
            proximoAniversario.setFullYear(hoje.getFullYear() + 1);
        }
    
        const diferença: number = proximoAniversario.getTime() - hoje.getTime();
        const diasFaltando = Math.ceil(diferença / (1000 * 60 * 60 * 24)); 
    
        return diasFaltando;
    }
    

    getFuncionarioDados() {
        return {   'nome': this.nome,
                                'data_de_nascimento': this.dataNascimento, 
                                'idade': this.calcularIdade(),
                                'dias_aniversario': this.calcularDiasAniversario()
        }

    }

    getInformeDataAniversario(){
        return `${this.getDataConvertida()} - (${this.calcularIdade()} anos - faltam ${this.calcularDiasAniversario()} dias para o aniversário)`;
    }

  }
  