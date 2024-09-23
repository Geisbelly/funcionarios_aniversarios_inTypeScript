"use client";
import { useEffect } from 'react';
import Funcionario from '../../models/Funcionarios';
import localStoreFuncionario from '../../models/LocalStoreFuncionario';
import '../../src/app/globals.css'

const Home: React.FC = () => {
  const loc = new localStoreFuncionario();
  const funcionarios = loc.getFuncionariosArray();

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  const adicionarFuncionario = () => {
    funcionarios.sort((a, b) => a.calcularDiasAniversario() - b.calcularDiasAniversario());
    const nomeinput = (document.getElementById('nome') as HTMLInputElement);
    const dataNascimentoinput = (document.getElementById('data_nascimento') as HTMLInputElement);

    const nome = nomeinput.value;
    const dataNascimento = dataNascimentoinput.value;

    if (nome && dataNascimento) {
      const novoFuncionario = new Funcionario(nome, new Date(dataNascimento));
      loc.addFuncionarios(novoFuncionario);
    }

    nomeinput.innerText = "";
    dataNascimentoinput.innerText = "";

    carregarFuncionarios();
  };

  const carregarFuncionarios = () => {
    funcionarios.sort((a, b) => a.calcularDiasAniversario() - b.calcularDiasAniversario());
    const Conts = document.getElementById('Funcionários'); 
    const container = document.getElementById('funcionarios-container');
    if (container) {
      container.innerHTML = ''; // Limpa todo o conteúdo dentro do container
    }


    let Fun = document.querySelector('#Funcionários h1');
    if (!Fun) {
        Fun = document.createElement('h1');
        Fun.textContent = 'Lista de Funcionarios';

        if(Conts) Conts.insertBefore(Fun, container);
        
    }

    let linhaDivisoria = document.querySelector('#Funcionários hr');
    if (!linhaDivisoria) {
        linhaDivisoria = document.createElement('hr');

        if(Conts) Conts.insertBefore(linhaDivisoria, container);
    }

    for (let i = 0; i < funcionarios.length; i++) {
        const funcionario = funcionarios[i];
        
        const titulo = document.createElement('h4');
        titulo.textContent = funcionario.getNome(); 

        const data = document.createElement('p');
        data.textContent = funcionario.getInformeDataAniversario();

        if (container){
          container.appendChild(titulo);
          container.appendChild(data);
        }

        if (i!= funcionarios.length-1){

        // Cria o elemento <hr>
        const hrElement = document.createElement('hr');

        // Define o id para o elemento
        hrElement.id = 'meu-hr';
        

        // Adiciona o elemento ao container
        if (container) container.appendChild(hrElement);
        }
    }

    // Seleciona o segundo <hr> dentro do contêiner
    const linhaDivisoria2 = document.getElementById('ultimo-hr');

    if (!linhaDivisoria2) {
        // Adiciona um <hr> extra para o último funcionário
        const linhaDivisoriaFinal = document.createElement('hr');
        linhaDivisoriaFinal.id = 'ultimo-hr';
        if(Conts)Conts.appendChild(linhaDivisoriaFinal);
    }
  };

  return (
    <>
    
    <div id="container-principal">
      <div id="Cadastrar-Funcionarios">
        <h1>Adicionar Funcionário</h1>
        <hr />
          <div className='inputs'>
            <div>
              <label htmlFor="nome">Nome:</label>
              <input id="nome" type="text" />
            </div>

            <div>
              <label htmlFor="data_nascimento">Data de Nascimento:</label>
              <input id="data_nascimento" type="date" />
            </div>

            <button onClick={adicionarFuncionario}>Adicionar</button>
          </div>
        <hr />
      </div>

      <div id="Funcionários">
        <div id="funcionarios-container">
        </div>
      </div>
    </div>
    
    <footer id="rodape">
      <p>&copy; 2024 Geisbelly. Todos os direitos reservados.</p>
    </footer>
    </>
  );
  
};

export default Home;
