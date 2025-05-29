document.addEventListener("DOMContentLoaded", () => {
    const mensagem = document.getElementById("mensagem");
    const tabela = document.getElementById("tabela-relatorio");
    const tbody = tabela.querySelector("tbody");

    const params = new URLSearchParams(window.location.search);
    let urlBase = "https://naysystem.com.br/relatorio_materiais.php?";
    let parametroUsado = "";

    if (params.get("projetoId")) {
        parametroUsado = "projetoId=" + params.get("projetoId");
    } else if (params.get("comodoId")) {
        parametroUsado = "comodoId=" + params.get("comodoId");
    } else if (params.get("comodoElementoId")) {
        parametroUsado = "comodoElementoId=" + params.get("comodoElementoId");
    } else if (params.get("elementoMaterialId")) {
        parametroUsado = "elementoMaterialId=" + params.get("elementoMaterialId");
    } else {
        mensagem.textContent = "Nenhum parâmetro válido informado na URL.";
        return;
    }

    const url = urlBase + parametroUsado;

    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error("Erro na requisição.");
            return res.json();
        })
        .then(data => {
            if (!data || data.length === 0) {
                mensagem.textContent = "Nenhum dado encontrado para o ID informado.";
                return;
            }

            tabela.style.display = "table";
            mensagem.textContent = "";

            data.forEach(item => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
          <td>${item.comodo}</td>
          <td>${item.elemento}</td>
          <td>${item.item}</td>
          <td>${item.unidade}</td>
          <td>${item.indice}</td>
          <td>${item.quantidade}</td>
          <td>R$ ${parseFloat(item.custoUnitario).toFixed(2)}</td>
          <td>${item.maoDeObra == 1 ? "Sim" : "Não"}</td>
          <td>R$ ${parseFloat(item.custoTotal).toFixed(2)}</td>
          <td>R$ ${parseFloat(item.perda).toFixed(2)}</td>
          <td>R$ ${parseFloat(item.custoFinal).toFixed(2)}</td>
        `;
                tbody.appendChild(tr);
            });
        })
        .catch(err => {
            console.error(err);
            mensagem.textContent = "Erro ao carregar os dados.";
        });
});
