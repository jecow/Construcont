function carregarFornecedores() {
    const tabela = document.getElementById('tabela-fornecedores');
    tabela.innerHTML = '';

    const fornecedores = JSON.parse(localStorage.getItem('fornecedores')) || [];

    fornecedores.forEach((fornecedor, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${fornecedor.nome}</td>
        <td>${fornecedor.email}</td>
        <td>${fornecedor.profissao}</td>
        <td>${fornecedor.cidade}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editarFornecedor(${index})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="excluirFornecedor(${index})">Excluir</button>
        </td>
      `;
        tabela.appendChild(tr);
    });
}

function excluirFornecedor(index) {
    const fornecedores = JSON.parse(localStorage.getItem('fornecedores')) || [];

    if (confirm('Deseja excluir este registro?')) {
        fornecedores.splice(index, 1);
        localStorage.setItem('fornecedores', JSON.stringify(fornecedores));
        carregarFornecedores();
    }
}