import Funcionario from "./Funcionarios";

export default class localStoreFuncionario {
    private funcionarios: Array<Funcionario>;

    constructor(...args: Funcionario[]) {
        this.funcionarios = args.length ? args : [
             new Funcionario('Gervásio Duarte',new Date('1970-01-12'))
            ,new Funcionario('Irene Chaves',new Date('1992-03-20'))
            ,new Funcionario('Maria Antônia',new Date('2004-01-10'))
        ];
        this.loadFromLocalStorage(); // Carrega os funcionários do localStorage
    }

    private loadFromLocalStorage() {
        if (typeof window !== 'undefined') {
            const storedFuncionarios = localStorage.getItem('funcionarios');
            if (storedFuncionarios) {
                const parsedFuncionarios = JSON.parse(storedFuncionarios);
                this.funcionarios = parsedFuncionarios.map((item: { nome: string, dataNascimento: string }) => 
                    new Funcionario(item.nome, new Date(item.dataNascimento))
                );
            }
        }
    }
    

    initializeLocalStorage() {
        this.updateLocalStorage();
    }

    getFuncionariosArray() {
        return this.funcionarios;
    }

    addFuncionarios(funcionario: Funcionario) {
        this.funcionarios.push(funcionario);
        this.updateLocalStorage();
    }

    removerFuncionario(funcionario: Funcionario) {
        this.funcionarios = this.funcionarios.filter(f => f !== funcionario);
        this.updateLocalStorage();
    }

    limparFuncionarios() {
        this.funcionarios = [];
        this.updateLocalStorage();
    }

    private updateLocalStorage() {
        if (typeof window !== 'undefined') {
            const funcionariosData = this.funcionarios.map(funcionario => ({
                nome: funcionario.getNome(),
                dataNascimento: funcionario.getDataNascimento().toISOString() // Use toISOString para armazenar a data como string
            }));
            localStorage.setItem('funcionarios', JSON.stringify(funcionariosData));
        }
    }
    
}
